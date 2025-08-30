import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Info, 
  FileText, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Download,
  Copy,
  Mail,
  Search
} from 'lucide-react';

const InfoPage = ({ isHindi }) => {
  const translations = {
    en: {
      header: {
        title: "Privacy Policy",
        lastUpdated: "Last Updated: January 2024"
      },
      sections: {
        overview: {
          title: "Overview",
          content: `
            Welcome to our comprehensive Privacy Policy. We are committed to protecting your personal information 
            and ensuring transparency in how we collect, use, and safeguard your data. This policy outlines our 
            practices across all our digital platforms and services.
          `
        },
        dataCollection: {
          title: "Data Collection",
          content: `
            We collect information to provide and improve our services. This includes:
            - Personal Identification Information
            - Usage and Device Data
            - Location Information
            - Communication Preferences
          `,
          details: [
            "Minimal data collection",
            "Explicit consent required",
            "Secure data handling",
            "Transparent data usage"
          ]
        },
        dataUsage: {
          title: "How We Use Your Data",
          content: `
            Your data helps us enhance user experience and provide personalized services:
            - Service Improvement
            - Personalization
            - Security Monitoring
            - Communication
          `
        },
        userRights: {
          title: "Your Rights",
          content: `
            We empower you with complete control over your personal information:
            - Right to Access
            - Right to Correction
            - Right to Deletion
            - Right to Object
          `,
          steps: [
            "Submit a request through our portal",
            "Verify your identity",
            "We process your request within 30 days"
          ]
        },
        dataSecurity: {
          title: "Data Security",
          content: `
            We implement advanced security measures to protect your information:
            - End-to-End Encryption
            - Regular Security Audits
            - Secure Data Centers
            - Multi-Factor Authentication
          `
        }
      },
      legalConsent: {
        title: "Legal Consent",
        content: "By using our services, you consent to the terms of this Privacy Policy."
      },
      actions: {
        downloadPolicy: "Download Full Policy",
        contactUs: "Contact Privacy Team"
      }
    },
    hi: {
      header: {
        title: "गोपनीयता नीति",
        lastUpdated: "अंतिम अपडेट: जनवरी 2024"
      },
      sections: {
        overview: {
          title: "अवलोकन",
          content: `
            हमारी व्यापक गोपनीयता नीति में आपका स्वागत है। हम आपकी व्यक्तिगत जानकारी की सुरक्षा करने और 
            इसे एकत्रित, उपयोग और सुरक्षित करने के तरीके में पारदर्शिता सुनिश्चित करने के लिए प्रतिबद्ध हैं। 
            यह नीति हमारे सभी डिजिटल प्लेटफार्मों और सेवाओं में हमारे अभ्यासों की रूपरेखा तैयार करती है।
          `
        },
        dataCollection: {
          title: "डेटा संग्रहण",
          content: `
            हम अपनी सेवाएं प्रदान करने और सुधारने के लिए जानकारी एकत्र करते हैं। इसमें शामिल हैं:
            - व्यक्तिगत पहचान जानकारी
            - उपयोग और उपकरण डेटा
            - स्थान जानकारी
            - संचार प्राथमिकताएं
          `,
          details: [
            "न्यूनतम डेटा संग्रहण",
            "स्पष्ट सहमति आवश्यक",
            "सुरक्षित डेटा प्रबंधन",
            "पारदर्शी डेटा उपयोग"
          ]
        },
        dataUsage: {
          title: "हम आपके डेटा का उपयोग कैसे करते हैं",
          content: `
            आपका डेटा हमें उपयोगकर्ता अनुभव को बढ़ाने और व्यक्तिगत सेवाएं प्रदान करने में मदद करता है:
            - सेवा सुधार
            - वैयक्तिकरण
            - सुरक्षा निगरानी
            - संचार
          `
        },
        userRights: {
          title: "आपके अधिकार",
          content: `
            हम आपको आपके व्यक्तिगत जानकारी पर पूरी तरह से नियंत्रण प्रदान करते हैं:
            - पहुंच का अधिकार
            - सुधार का अधिकार
            - हटाने का अधिकार
            - आपत्ति करने का अधिकार
          `,
          steps: [
            "हमारे पोर्टल के माध्यम से अनुरोध सबमिट करें",
            "अपनी पहचान सत्यापित करें",
            "हम आपके अनुरोध को 30 दिनों के भीतर संसाधित करेंगे"
          ]
        },
        dataSecurity: {
          title: "डेटा सुरक्षा",
          content: `
            हम आपकी जानकारी की सुरक्षा के लिए उन्नत सुरक्षा उपाय लागू करते हैं:
            - अंत-से-अंत एन्क्रिप्शन
            - नियमित सुरक्षा ऑडिट
            - सुरक्षित डेटा केंद्र
            - बहु-कारक प्रमाणीकरण
          `
        }
      },
      legalConsent: {
        title: "कानूनी सहमति",
        content: "हमारी सेवाओं का उपयोग करके, आप इस गोपनीयता नीति की शर्तों से सहमति देते हैं।"
      },
      actions: {
        downloadPolicy: "पूर्ण नीति डाउनलोड करें",
        contactUs: "गोपनीयता टीम से संपर्क करें"
      }
    }
  };

  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
  }, [isHindi]);

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const copyPolicy = () => {
    const policy = Object.values(currentLanguage.sections)
      .map(section => `${section.title}\n${section.content}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(policy);
    alert('Privacy Policy copied to clipboard!');
  };

  const downloadPolicy = () => {
    const policy = Object.values(currentLanguage.sections)
      .map(section => `${section.title}\n${section.content}`)
      .join('\n\n');
    
    const blob = new Blob([policy], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'privacy-policy.txt';
    link.click();
  };

  const filteredSections = Object.entries(currentLanguage.sections)
    .filter(([key, section]) => 
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-950 dark:text-white">
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
              onClick={() => setCurrentLanguage(currentLanguage === translations.en ? translations.hi : translations.en)}
              className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition"
            >
              {currentLanguage === translations.en ? 'हिं' : 'EN'}
            </button>
            <button 
              onClick={copyPolicy}
              className="flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition"
            >
              <Copy className="mr-2" /> {currentLanguage === translations.en ? 'Copy Policy' : 'नीति कॉपी करें'}
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
              placeholder={currentLanguage === translations.en ? "Search policy..." : "नीति खोजें..."}
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
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-blue-100 text-gray-700'
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
              <div 
                key={key} 
                className="mb-6 border-b pb-6 last:border-b-0"
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(key)}
                >
                  <h2 className="text-2xl font-bold text-blue-600">
                    {section.title}
                  </h2>
                  <button>
                    {expandedSections[key] ? <XCircle className="text-red-500" /> : <Info className="text-blue-500" />}
                  </button>
                </div>

                {(expandedSections[key] || activeSection === key) && (
                  <div className="mt-4 text-gray-700">
                    <p>{section.content}</p>
                    {section.details && (
                      <ul className="mt-4 space-y-2 pl-5 list-disc">
                        {section.details.map((detail, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="mr-2 text-green-500" size={16} />
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
              {currentLanguage === translations.en ? 'No sections match your search' : 'कोई अनुभाग आपकी खोज से मेल नहीं खाते'}
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
              <p className="text-gray-500">{currentLanguage === translations.en ? 'Download the complete policy document' : 'पूर्ण नीति दस्तावेज़ डाउनलोड करें'}</p>
            </div>
          </div>
          <button 
            onClick={downloadPolicy}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            {currentLanguage === translations.en ? 'Download' : 'डाउनलोड करें'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="text-green-600 mr-4" size={32} />
            <div>
              <h3 className="font-bold text-xl text-green-600">
                {currentLanguage.actions.contactUs}
              </h3>
              <p className="text-gray-500">{currentLanguage === translations.en ? 'Reach out to our privacy team' : 'हमारी गोपनीयता टीम से संपर्क करें'}</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = 'mailto:privacy@yourcompany.com'}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            {currentLanguage === translations.en ? 'Contact' : 'संपर्क करें'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;