import React, { useState, useEffect, useRef } from "react";
import {
  ChatBubbleLeftIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";
import faqs from "../assets/faq.json"; // JSON with ticket, timing, contact info

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const chatboxRef = useRef(null);

  // Auto-scroll when new chats arrive
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo({
        top: chatboxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats.length]);

  const cleanText = (text) => text.replace(/\*\*(.*?)\*\*/g, "$1");

  // Text-to-Speech
  const speakText = (text) => {
    if (!ttsEnabled) return;

    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    let index = 0;

    const speakNext = () => {
      if (index >= sentences.length) {
        setIsSpeaking(false);
        setHighlightIndex(-1);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText(sentences[index]));
      utterance.lang = "en-IN";
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices.find((v) => v.lang === "en-IN") || voices[0];

      utterance.onend = () => {
        index++;
        speakNext();
      };

      window.speechSynthesis.speak(utterance);
    };

    setIsSpeaking(true);
    speakNext();
  };

  const toggleSpeech = () => {
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  // Speech-to-Text
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) =>
      console.error("Speech Recognition Error:", event);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      sendMessage(transcript);
    };

    recognition.start();
  };

  // Handle sending messages
  const sendMessage = (text = message.trim()) => {
    if (!text) return;
    setChats((prev) => [...prev, { sender: "user", text }]);
    setMessage("");
    setLoading(true);

    // Match FAQs from JSON
    const matched = faqs.faqs.find((f) =>
      text.toLowerCase().includes(f.question.toLowerCase())
    );
    const replyText = matched
      ? matched.answer
      : "Sorry, I didn't understand. Please try another question.";

    setTimeout(() => {
      setChats((prev) => [...prev, { sender: "bot", text: replyText }]);
      speakText(replyText);
      setLoading(false);
    }, 500);
  };

  // Open chatbot with greeting + FAQs
  const handleOpen = () => {
    setOpen(true);
    if (chats.length === 0) {
      const welcomeMsg =
        "👋 Hello! I'm SamVad, your assistant. How can I help you today?";
      const faqIntro = "Here are some frequently asked questions:";
      setChats([
        { sender: "bot", text: welcomeMsg },
        { sender: "bot", text: faqIntro },
        ...faqs.faqs.slice(0, 3).map((f) => ({
          sender: "bot",
          text: `• ${f.question}`,
        })),
      ]);
      speakText(welcomeMsg);
    }
  };

  return (
    <div>
      {/* Floating Chat Button (with subtle bounce animation when closed) */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-[9999] animate-bounce-slow"
          onClick={handleOpen}
        >
          <ChatBubbleLeftIcon className="h-7 w-7" />
        </button>
      )}

      {/* Chatbot Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 bg-white shadow-2xl rounded-2xl border p-3 flex flex-col transition-all max-h-[80vh] overflow-hidden z-[9999]">
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b">
            <h3 className="text-lg font-semibold text-gray-800">SamVad</h3>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatboxRef}
            className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar"
          >
            {chats.map((chat, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-full break-words ${
                  chat.sender === "user"
                    ? "bg-blue-500 text-white self-end text-right"
                    : "bg-gray-300 text-black self-start text-left"
                }`}
              >
                {chat.text}
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 animate-pulse">
                SamVad is thinking...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center p-2 border-t space-x-2">
            <button
              onClick={startListening}
              className={`p-2 rounded-full ${
                listening ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <MicrophoneIcon className="h-5 w-5 text-white" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 border rounded-md focus:outline-none"
              placeholder="Type a question..."
              disabled={loading}
            />
            <button
              onClick={toggleSpeech}
              className="p-2 bg-gray-300 rounded-full"
            >
              <PauseIcon
                className={`h-5 w-5 ${
                  paused ? "text-red-500" : "text-gray-500"
                }`}
              />
            </button>
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className="p-2 bg-gray-300 rounded-full"
            >
              <SpeakerWaveIcon
                className={`h-5 w-5 ${
                  ttsEnabled ? "text-green-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Custom bounce animation */}
      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
