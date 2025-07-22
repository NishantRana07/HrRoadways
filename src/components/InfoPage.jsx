import { useState, useEffect } from "react";
import {
  Shield,
  Info,
  CheckCircle,
  XCircle,
  Download,
  Copy,
  Mail,
  Search,
} from "lucide-react";

import { infoPageTranslation } from "../data/translations";

const InfoPage = ({ isHindi }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    infoPageTranslation.en
  );
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    setCurrentLanguage(
      isHindi ? infoPageTranslation.hi : infoPageTranslation.en
    );
  }, [isHindi]);

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const copyPolicy = () => {
    const policy = Object.values(currentLanguage.sections)
      .map((section) => `${section.title}\n${section.content}`)
      .join("\n\n");

    navigator.clipboard.writeText(policy);
    alert("Privacy Policy copied to clipboard!");
  };

  const downloadPolicy = () => {
    const policy = Object.values(currentLanguage.sections)
      .map((section) => `${section.title}\n${section.content}`)
      .join("\n\n");

    const blob = new Blob([policy], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "privacy-policy.txt";
    link.click();
  };

  const filteredSections = Object.entries(currentLanguage.sections).filter(
    ([section]) =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="text-blue-600 mr-3" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-blue-600">
                {currentLanguage.header.title}
              </h1>
              <p className="text-gray-500">
                {currentLanguage.header.lastUpdated}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                setCurrentLanguage(
                  currentLanguage === infoPageTranslation.en
                    ? infoPageTranslation.hi
                    : infoPageTranslation.en
                )
              }
              className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition"
            >
              {currentLanguage === infoPageTranslation.en ? "हिं" : "EN"}
            </button>
            <button
              onClick={copyPolicy}
              className="flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition"
            >
              <Copy className="mr-2" />{" "}
              {currentLanguage === infoPageTranslation.en
                ? "Copy Policy"
                : "नीति कॉपी करें"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-md p-6 h-fit">
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder={
                currentLanguage === infoPageTranslation.en
                  ? "Search policy..."
                  : "नीति खोजें..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border rounded-lg"
            />
            <Search className="absolute left-2 top-3 text-gray-400" size={18} />
          </div>

          {Object.entries(currentLanguage.sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full text-left p-3 rounded-lg mb-2 flex items-center transition ${
                activeSection === key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md p-8">
          {filteredSections.length > 0 ? (
            filteredSections.map(([key, section]) => (
              <div key={key} className="mb-6 border-b pb-6 last:border-b-0">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(key)}
                >
                  <h2 className="text-2xl font-bold text-blue-600">
                    {section.title}
                  </h2>
                  <button>
                    {expandedSections[key] ? (
                      <XCircle className="text-red-500" />
                    ) : (
                      <Info className="text-blue-500" />
                    )}
                  </button>
                </div>

                {(expandedSections[key] || activeSection === key) && (
                  <div className="mt-4 text-gray-700">
                    <p>{section.content}</p>
                    {section.details && (
                      <ul className="mt-4 space-y-2 pl-5 list-disc">
                        {section.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle
                              className="mr-2 text-green-500"
                              size={16}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              {currentLanguage === infoPageTranslation.en
                ? "No sections match your search"
                : "कोई अनुभाग आपकी खोज से मेल नहीं खाते"}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Download className="text-blue-600 mr-4" size={32} />
            <div>
              <h3 className="font-bold text-xl text-blue-600">
                {currentLanguage.actions.downloadPolicy}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === infoPageTranslation.en
                  ? "Download the complete policy document"
                  : "पूर्ण नीति दस्तावेज़ डाउनलोड करें"}
              </p>
            </div>
          </div>
          <button
            onClick={downloadPolicy}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            {currentLanguage === infoPageTranslation.en
              ? "Download"
              : "डाउनलोड करें"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="text-green-600 mr-4" size={32} />
            <div>
              <h3 className="font-bold text-xl text-green-600">
                {currentLanguage.actions.contactUs}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === infoPageTranslation.en
                  ? "Reach out to our privacy team"
                  : "हमारी गोपनीयता टीम से संपर्क करें"}
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              (window.location.href = "mailto:privacy@yourcompany.com")
            }
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            {currentLanguage === infoPageTranslation.en
              ? "Contact"
              : "संपर्क करें"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
