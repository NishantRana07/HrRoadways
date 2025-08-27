import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ChatBubbleLeftIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import faqs from "../assets/faq.json";

// ----------------- Hooks -----------------
function useSpeechSynthesisSafe() {
  const voicesRef = useRef([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text, { lang = "en-IN" } = {}) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    setPaused(false);

    const sentences = text.match(/[^\.\!\?]+[\.\!\?]+/g) || [text];
    let idx = 0;

    const speakNext = () => {
      if (idx >= sentences.length) {
        setIsSpeaking(false);
        setPaused(false);
        return;
      }
      const u = new SpeechSynthesisUtterance(sentences[idx].trim());
      u.lang = lang;
      const voice =
        voicesRef.current.find((v) => v.lang === lang) || voicesRef.current[1];
      if (voice) u.voice = voice;
      u.onend = () => {
        idx++;
        speakNext();
      };
      window.speechSynthesis.speak(u);
    };

    speakNext();
  }, []);

  const cancel = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }, [paused]);

  return { speak, cancel, togglePause, isSpeaking, paused };
}

function useSpeechRecognitionSafe(onResult) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  const start = useCallback(() => {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const rec = new Rec();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-IN";

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = (e) => {
      console.error("Speech Recognition Error:", e);
      setListening(false);
    };
    rec.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current = rec;
    rec.start();
  }, [onResult]);

  return { start, listening };
}

// ----------------- Component -----------------
export default function Chatbot({
  name = "SamVad Assistant",
  enableTTS = true,
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(enableTTS);
  const [chats, setChats] = useState([]);

  const chatboxRef = useRef(null);
  const fuseRef = useRef(null);

  // init fuzzy search
  useEffect(() => {
    fuseRef.current = new Fuse(faqs.faqs, {
      keys: ["question", "answer", "tags"],
      threshold: 0.4,
    });
  }, []);

  const { speak, cancel, togglePause, paused } = useSpeechSynthesisSafe();
  const { start: startListening, listening } = useSpeechRecognitionSafe(
    (transcript) => {
      setMessage(transcript);
      handleSend(transcript);
    }
  );

  // auto scroll
  useEffect(() => {
    chatboxRef.current?.scrollTo({
      top: chatboxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chats.length]);

  const appendChat = (c) => setChats((prev) => [...prev, c]);

  const handleSend = async (text = message.trim()) => {
    if (!text) return;
    setLoading(true);
    appendChat({ sender: "user", text, timestamp: Date.now() });
    setMessage("");

    let replyText = "Sorry, I didn't understand. Could you rephrase?";
    try {
      const res = fuseRef.current.search(text);
      if (res?.length) replyText = res[0].item.answer;
    } catch (e) {
      console.error("Fuse search error", e);
    }

    // typing effect
    const typingId = `bot-${Date.now()}`;
    appendChat({
      sender: "bot",
      text: "",
      meta: { id: typingId, typing: true },
      timestamp: Date.now(),
    });
    await new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setChats((prev) => {
          const copy = [...prev];
          const idx = copy.findIndex((c) => c.meta?.id === typingId);
          if (idx !== -1)
            copy[idx] = { ...copy[idx], text: replyText.slice(0, i) };
          return copy;
        });
        if (i >= replyText.length) {
          clearInterval(interval);
          resolve();
        }
      }, 18);
    });

    setChats((prev) =>
      prev.map((c) => (c.meta?.id === typingId ? { ...c, meta: undefined } : c))
    );

    if (ttsEnabled) {
      cancel();
      speak(replyText, { lang: "en-IN" });
    }

    setLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
    if (chats.length === 0) {
      const welcome = `👋 Hello! I'm ${name}. How can I help you today?`;
      const intro = "Here are some common questions you can try:";
      const examples = faqs.faqs.slice(0, 5).map((f) => f.question);
      setChats([
        { sender: "bot", text: welcome, timestamp: Date.now() },
        { sender: "bot", text: intro, timestamp: Date.now() + 10 },
      ]);
      setSuggestions(examples);
      if (ttsEnabled) speak(welcome, { lang: "en-IN" });
    }
  };

  const [suggestions, setSuggestions] = useState([]);

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div>
      {/* Floating Button */}
      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-[9999] animate-bounce-slow"
          onClick={handleOpen}
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </motion.button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 w-[22rem] md:w-96 
             bg-gradient-to-br from-blue-600/90 via-blue-500/70 to-blue-400/60 
             backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200 
             flex flex-col max-h-[80vh] overflow-hidden z-[9999]"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 
                  bg-gradient-to-br from-blue-600/90 via-blue-500/70 to-blue-400/60 
                  backdrop-blur-xl text-white shadow-md"
            >
              <span className="font-semibold text-sm">{name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTtsEnabled((v) => !v)}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                  title="Toggle voice"
                >
                  <SpeakerWaveIcon
                    className={`h-5 w-5 ${
                      ttsEnabled ? "text-green-200" : "text-gray-300"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                  title="Close chat"
                >
                  ✖
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatboxRef}
              className="flex-1 overflow-y-auto p-3 space-y-3 bg-white"
            >
              {chats.map((c, i) => (
                <motion.div
                  key={c.timestamp || i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm shadow-sm relative group ${
                    c.sender === "user"
                      ? "bg-blue-600 text-white ml-auto rounded-br-none"
                      : "bg-gray-100 text-gray-800 mr-auto rounded-bl-none"
                  }`}
                >
                  <div>{c.text}</div>
                  <div className="text-[10px] text-gray-400 mt-1 text-right">
                    {formatTime(c.timestamp)}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="text-gray-500 text-xs animate-pulse">
                  {name} is typing...
                </div>
              )}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-3 border-t bg-green-50">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-sm bg-blue-600 text-white rounded-lg px-2 py-2 hover:bg-green-700 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center p-3 border-t gap-2 bg-white">
              <button
                onClick={() => (!listening ? startListening() : null)}
                className={`p-2 rounded-full transition ${
                  listening ? "bg-red-500" : "bg-bluee-600"
                }`}
                title="Voice input"
              >
                <MicrophoneIcon className="h-5 w-5 text-white" />
              </button>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-2 border rounded-full text-sm focus:outline-none"
                placeholder="Type your message..."
                disabled={loading}
              />
              <button
                onClick={togglePause}
                className="p-2 bg-gray-200 rounded-full"
                title="Pause/Resume voice"
              >
                <PauseIcon
                  className={`h-5 w-5 ${
                    paused ? "text-red-500" : "text-gray-600"
                  }`}
                />
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                className="px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-green-700 text-sm"
              >
                ➤
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce-slow {
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-5px);}
        }
        .animate-bounce-slow { animation:bounce-slow 2s infinite; }
      `}</style>
    </div>
  );
}
