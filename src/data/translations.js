import { Compass, Leaf, Shield, Star } from "lucide-react";

export const translations = {
  en: {
    header: {
      title: "HR Roadways Project Proposal",
      subtitle: "Modernizing Government Bus Services",
    },
    maintainers: {
      title: "Project Leadership",
      maintainer: "Project Maintainer",
      topContributor: "Top Contributor",
    },
    techStack: {
      title: "Technology Stack",
      sections: [
        { name: "React", description: "Frontend Framework" },
        { name: "Nodejs", description: "Backend Runtime" },
        { name: "JavaScript", description: "Programming Language" },
        { name: "CSS", description: "Styling" },
        { name: "GitHub", description: "Version Control & Collaboration" },
        { name: "Tailwind", description: "Utility-first CSS Framework" },
        { name: "Vite", description: "Next Generation Frontend Tooling" },
        { name: "Vercel", description: "Deployment Platform" },
        { name: "Figma", description: "Design and Prototyping" },
      ],
    },
    contributors: {
      title: "AcWoC Contributors",
      viewProfile: "View Profile",
      pullRequests: "Pull Requests",
    },
    links: {
      github: "View on GitHub",
      acwoc: "AcWoC 25",
      androidClub: "Android Club",
    },
  },
  hi: {
    // ... (Hindi translations remain the same, just remove currentTime and currentUser)
  },
};

export const translation = {
  en: {
    company: "Company",
    aboutUs: "About us",
    services: "Our Services",
    privacy: "Policy",
    affiliate: "Affiliate Program",
    getHelp: "Help",
    reviews: "Reviews", // Changed from faq to reviews
    contactUs: "Contact Us",
    busStatus: "Bus Status",
    paymentOptions: "Payment Options",
    rides: "Rides",
    trips: "Trips",
    luxury: "Luxury Destination",
    visitCities: "Visit Cities",
    bestRides: "Best Rides",
    followUs: "Follow Us",
  },
  hi: {
    company: "कंपनी",
    aboutUs: "हमारे बारे में",
    services: "हमारी सेवाएँ",
    privacy: "नीति",
    affiliate: "सहबद्ध कार्यक्रम",
    getHelp: "सहायता प्राप्त करें",
    reviews: "समीक्षाएं", // Changed from faq to reviews
    contactUs: "संपर्क करें",
    busStatus: "बस स्थिति",
    paymentOptions: "भुगतान विकल्प",
    rides: "सवारी",
    trips: "यात्राएँ",
    luxury: "लग्जरी गंतव्य",
    visitCities: "शहरों की यात्रा करें",
    bestRides: "सर्वश्रेष्ठ सवारी",
    followUs: "हमें फॉलो करें",
  },
};

export const helpLineTranslation = {
  en: {
    title: "24/7 Helpline",
    description: "Always here to assist you anytime, anywhere!",
    searchPlaceholder: "Search for help...",
    callUs: "Call Us",
    emailSupport: "Email Support",
    liveChat: "Live Chat",
    contactHours: "Contact Hours",
    phoneSupport: "Phone Support",
    emailResponseTime: "Email Response Time",
    categories: [
      { id: "all", name: "All Topics" },
      { id: "booking", name: "Booking" },
      { id: "payment", name: "Payment" },
      { id: "cancellation", name: "Cancellation" },
    ],
    faqs: [
      {
        id: 1,
        category: "booking",
        question: "How can I book a ticket?",
        answer:
          "You can book a ticket through our website or mobile app. Select your route, choose your seat, and proceed to payment.",
      },
      {
        id: 2,
        category: "cancellation",
        question: "How can I cancel my booking?",
        answer:
          'To cancel your booking, go to the "My Bookings" section, select the booking, and click "Cancel". Cancellation fees may apply based on timing.',
      },
      {
        id: 3,
        category: "payment",
        question: "What payment methods are accepted?",
        answer:
          "We accept credit cards, debit cards, and digital wallets including PayPal, Google Pay, and Apple Pay.",
      },
      {
        id: 4,
        category: "booking",
        question: "Can I modify my booking?",
        answer:
          'Yes, you can modify your booking up to 6 hours before departure through the "Modify Booking" option or by contacting our support team.',
      },
    ],
    quickContact: "Need more help? We're here for you!",
    copyright: "© 2025 Haryana Roadways Service. All rights reserved.",
  },
  hi: {
    title: "24/7 हेल्पलाइन",
    description: "हमेशा यहाँ आपकी सहायता के लिए, कभी भी, कहीं भी!",
    searchPlaceholder: "मदद के लिए खोजें...",
    callUs: "हमें कॉल करें",
    emailSupport: "ईमेल समर्थन",
    liveChat: "लाइव चैट",
    contactHours: "संपर्क समय",
    phoneSupport: "फोन समर्थन",
    emailResponseTime: "ईमेल प्रतिक्रिया समय",
    categories: [
      { id: "all", name: "सभी विषय" },
      { id: "booking", name: "बुकिंग" },
      { id: "payment", name: "भुगतान" },
      { id: "cancellation", name: "रद्द करना" },
    ],
    faqs: [
      {
        id: 1,
        category: "booking",
        question: "मैं टिकट कैसे बुक कर सकता हूँ?",
        answer:
          "आप हमारी वेबसाइट या मोबाइल ऐप के माध्यम से टिकट बुक कर सकते हैं। अपने मार्ग का चयन करें, अपनी सीट चुनें और भुगतान के लिए आगे बढ़ें।",
      },
      {
        id: 2,
        category: "cancellation",
        question: "मैं अपनी बुकिंग कैसे रद्द कर सकता हूँ?",
        answer:
          'अपनी बुकिंग रद्द करने के लिए, "मेरी बुकिंग" अनुभाग में जाएं, बुकिंग का चयन करें और "रद्द करें" पर क्लिक करें। समय के आधार पर रद्दीकरण शुल्क लागू हो सकता है।',
      },
      {
        id: 3,
        category: "payment",
        question: "कौन से भुगतान विधियाँ स्वीकार की जाती हैं?",
        answer:
          "हम क्रेडिट कार्ड, डेबिट कार्ड और डिजिटल वॉलेट्स को स्वीकार करते हैं जिनमें पेपाल, गूगल पे और एप्पल पे शामिल हैं।",
      },
      {
        id: 4,
        category: "booking",
        question: "क्या मैं अपनी बुकिंग में संशोधन कर सकता हूँ?",
        answer:
          'हाँ, आप प्रस्थान से 6 घंटे पहले तक "बुकिंग संशोधित करें" विकल्प के माध्यम से या हमारी समर्थन टीम से संपर्क करके अपनी बुकिंग में संशोधन कर सकते हैं।',
      },
    ],
    quickContact: "अधिक सहायता चाहिए? हम आपके लिए यहाँ हैं!",
    copyright: "© 2025 हरियाणा रोडवेज सेवा। सर्वाधिकार सुरक्षित।",
  },
};

export const infoPageTranslation = {
  en: {
    header: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: January 2024",
    },
    sections: {
      overview: {
        title: "Overview",
        content: `
            Welcome to our comprehensive Privacy Policy. We are committed to protecting your personal information 
            and ensuring transparency in how we collect, use, and safeguard your data. This policy outlines our 
            practices across all our digital platforms and services.
          `,
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
          "Transparent data usage",
        ],
      },
      dataUsage: {
        title: "How We Use Your Data",
        content: `
            Your data helps us enhance user experience and provide personalized services:
            - Service Improvement
            - Personalization
            - Security Monitoring
            - Communication
          `,
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
          "We process your request within 30 days",
        ],
      },
      dataSecurity: {
        title: "Data Security",
        content: `
            We implement advanced security measures to protect your information:
            - End-to-End Encryption
            - Regular Security Audits
            - Secure Data Centers
            - Multi-Factor Authentication
          `,
      },
    },
    legalConsent: {
      title: "Legal Consent",
      content:
        "By using our services, you consent to the terms of this Privacy Policy.",
    },
    actions: {
      downloadPolicy: "Download Full Policy",
      contactUs: "Contact Privacy Team",
    },
  },
  hi: {
    header: {
      title: "गोपनीयता नीति",
      lastUpdated: "अंतिम अपडेट: जनवरी 2024",
    },
    sections: {
      overview: {
        title: "अवलोकन",
        content: `
            हमारी व्यापक गोपनीयता नीति में आपका स्वागत है। हम आपकी व्यक्तिगत जानकारी की सुरक्षा करने और 
            इसे एकत्रित, उपयोग और सुरक्षित करने के तरीके में पारदर्शिता सुनिश्चित करने के लिए प्रतिबद्ध हैं। 
            यह नीति हमारे सभी डिजिटल प्लेटफार्मों और सेवाओं में हमारे अभ्यासों की रूपरेखा तैयार करती है।
          `,
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
          "पारदर्शी डेटा उपयोग",
        ],
      },
      dataUsage: {
        title: "हम आपके डेटा का उपयोग कैसे करते हैं",
        content: `
            आपका डेटा हमें उपयोगकर्ता अनुभव को बढ़ाने और व्यक्तिगत सेवाएं प्रदान करने में मदद करता है:
            - सेवा सुधार
            - वैयक्तिकरण
            - सुरक्षा निगरानी
            - संचार
          `,
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
          "हम आपके अनुरोध को 30 दिनों के भीतर संसाधित करेंगे",
        ],
      },
      dataSecurity: {
        title: "डेटा सुरक्षा",
        content: `
            हम आपकी जानकारी की सुरक्षा के लिए उन्नत सुरक्षा उपाय लागू करते हैं:
            - अंत-से-अंत एन्क्रिप्शन
            - नियमित सुरक्षा ऑडिट
            - सुरक्षित डेटा केंद्र
            - बहु-कारक प्रमाणीकरण
          `,
      },
    },
    legalConsent: {
      title: "कानूनी सहमति",
      content:
        "हमारी सेवाओं का उपयोग करके, आप इस गोपनीयता नीति की शर्तों से सहमति देते हैं।",
    },
    actions: {
      downloadPolicy: "पूर्ण नीति डाउनलोड करें",
      contactUs: "गोपनीयता टीम से संपर्क करें",
    },
  },
};

export const navTranslations = {
  en: {
    home: "Home",
    contact: "Contact",
    donate: "Donate",
    about: "About Us",
    trip: "Plan Journey",
    services: "Services",
    track: "Track Bus",
    schedule: "Time Table",
    tourGuide: "Tour Guide", // Add new translation
    helpline: "24x7 Helpline",
    blog: "Blog",
    quickLinks: "Quick Links",
    travellocations: "Travel",
    guide: "Guide and Rules",
  },
  hi: {
    home: "मुख्य पृष्ठ",
    contact: "संपर्क करें",
    donate: "दान करें",
    about: "हमारे बारे में",
    trip: "यात्रा योजना",
    services: "सेवाएं",
    track: "बस ट्रैक करें",
    schedule: "समय सारणी",
    tourGuide: "मार्गदर्शिका", // Add new translation
    helpline: "24x7 हेल्पलाइन",
    blog: "ब्लॉग",
    quickLinks: "त्वरित लिंक",
    travellocations: "यात्रा",
    guide: "मार्गदर्शिका और नियम",
  },
};

export const haryanaDestination = {
  en: {
    title: "Royal Haryana Odyssey",
    subtitle: "Uncover the Majestic Heritage of Haryana",
    searchPlaceholder: "Explore Royal Destinations",
    searchButton: "Discover Royal Experiences",
    features: [
      {
        icon: Shield,
        title: "Royal Safety",
        desc: "Comprehensive travel protection",
      },
      {
        icon: Star,
        title: "Curated Experiences",
        desc: "Handpicked royal destinations",
      },
      { icon: Compass, title: "Local Expertise", desc: "Expert local guides" },
      {
        icon: Leaf,
        title: "Sustainable Tourism",
        desc: "Eco-friendly royal experiences",
      },
    ],
  },
  hi: {
    title: "रॉयल हरियाणा ओडिसी",
    subtitle: "हरियाणा की भव्य विरासत का अनावरण करें",
    searchPlaceholder: "रॉयल स्थलों का अन्वेषण करें",
    searchButton: "रॉयल अनुभवों की खोज करें",
    features: [
      { icon: Shield, title: "रॉयल सुरक्षा", desc: "समग्र यात्रा संरक्षण" },
      {
        icon: Star,
        title: "संपादित अनुभव",
        desc: "हाथ से चुने गए रॉयल गंतव्य",
      },
      {
        icon: Compass,
        title: "स्थानीय विशेषज्ञता",
        desc: "विशेषज्ञ स्थानीय गाइड",
      },
      { icon: Leaf, title: "सतत पर्यटन", desc: "इको-फ्रेंडली रॉयल अनुभव" },
    ],
  },
};
