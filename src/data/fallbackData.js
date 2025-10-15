// src/data/fallbackData.js

// Fallback data for when API is unavailable
export const fallbackBusStands = [
  'Delhi', 'Chandigarh', 'Gurgaon', 'Faridabad', 'Panipat', 'Karnal', 
  'Ambala', 'Hisar', 'Rohtak', 'Sonipat', 'Yamunanagar', 'Kurukshetra',
  'Sirsa', 'Bhiwani', 'Jind', 'Kaithal', 'Rewari', 'Mahendragarh',
  'Palwal', 'Nuh', 'Panchkula', 'Yamuna Nagar'
];

export const fallbackBusData = [
  {
    Bus_Type: 'AC Deluxe',
    from: 'Delhi',
    to: 'Chandigarh',
    Via: 'Panipat, Karnal, Kurukshetra',
    Departure_Time: '06:00 AM',
    Price: '₹450',
    Total_Distance: '250 KM'
  },
  {
    Bus_Type: 'Ordinary',
    from: 'Delhi',
    to: 'Hisar',
    Via: 'Rohtak, Bhiwani',
    Departure_Time: '07:30 AM',
    Price: '₹280',
    Total_Distance: '180 KM'
  },
  {
    Bus_Type: 'Express',
    from: 'Gurgaon',
    to: 'Chandigarh',
    Via: 'Sonipat, Panipat, Karnal',
    Departure_Time: '08:00 AM',
    Price: '₹380',
    Total_Distance: '220 KM'
  }
];

// Local fallback data if API fetch fails (travel locations)
export const fallbackTravelLocations = {
  en: {
    title: "Explore Haryana",
    subtitle: "Discover the vibrant culture and scenic beauty of Haryana.",
    searchPlaceholder: "Search by name or description...",
    bestTime: "Best Time to Visit",
    culturalEvents: "Cultural Events",
    localSpecialties: "Local Specialties",
    noLocationsFound: "No locations found matching your criteria.",
    categories: [
      { id: "all", label: "All" },
      { id: "historical", label: "Historical" },
      { id: "nature", label: "Nature" },
      { id: "religious", label: "Religious" },
      { id: "urban", label: "Urban" },
      { id: "industrial", label: "Industrial" },
      { id: "adventure", label: "Adventure" }
    ],
    locations: [
      {
        id: "gurgaon",
        name: "Gurgaon",
        description: "A major financial and industrial hub, known for its rapid urbanization and modern infrastructure.",
        bestTime: "October to March",
        culturalEvents: ["Cyber Hub Festivals"],
        localCuisine: ["Haryanvi Thali", "Street Food"],
        activities: ["Shopping", "Nightlife", "Corporate Events"],
        category: "urban",
        image: "https://i.ibb.co/ynW25D0R/GURGAON.jpg"
      },
      {
        id: "surajkund",
        name: "Surajkund",
        description: "Famous for its ancient reservoir and the annual International Crafts Mela, showcasing traditional crafts.",
        bestTime: "February (for Mela)",
        culturalEvents: ["Surajkund International Crafts Mela"],
        localCuisine: ["Traditional Haryanvi Sweets"],
        activities: ["Crafts Fair", "Boating", "Picnics"],
        category: "historical",
        image: "https://i.ibb.co/9knrRy7V/Surajkund.jpg"
      },
      {
        id: "sultanpur-np",
        name: "Sultanpur National Park",
        description: "A popular bird sanctuary, home to a variety of migratory and resident birds, ideal for birdwatching.",
        bestTime: "December to February",
        culturalEvents: [],
        localCuisine: [],
        activities: ["Bird Watching", "Photography", "Nature Walks"],
        category: "nature",
        image: "https://i.ibb.co/jv9sS8Ld/Sultanpur-National-Park.webp"
      },
      {
        id: "kurukshetra",
        name: "Kurukshetra",
        description: "A historic city, revered as the battlefield of the Mahabharata and a significant pilgrimage site.",
        bestTime: "October to March",
        culturalEvents: ["Kurukshetra Mahotsav"],
        localCuisine: ["Paneer dishes"],
        activities: ["Visiting Temples", "Historical Tours", "Boating in Brahma Sarovar"],
        category: "religious",
        image: "https://i.ibb.co/35jgWkDV/Kurukshetra.jpg"
      },
      {
        id: "pinjore-gardens",
        name: "Pinjore Gardens",
        description: "A beautiful 17th-century Mughal garden, also known as Yadavindra Gardens, featuring fountains and palaces.",
        bestTime: "Spring and Autumn",
        culturalEvents: ["Mango Festival (July)"],
        localCuisine: ["Local Snacks"],
        activities: ["Picnics", "Sightseeing", "Photography"],
        category: "historical",
        image: "https://i.ibb.co/zVgjsCYC/Pinjore-Gardens.jpg"
      },
      {
        id: "morni-hills",
        name: "Morni Hills",
        description: "The only hill station in Haryana, offering picturesque views, trekking trails, and adventure activities.",
        bestTime: "October to April",
        culturalEvents: [],
        localCuisine: ["Hill station delicacies"],
        activities: ["Trekking", "Boating", "Camping", "Nature exploration"],
        category: "nature",
        image: "https://i.ibb.co/DgY6Ty74/Morni-Hills.webp"
      },
      {
        id: "panchkula",
        name: "Panchkula",
        description: "A planned city known for its modern infrastructure, green spaces, and as a gateway to Himachal Pradesh.",
        bestTime: "October to March",
        culturalEvents: [],
        localCuisine: ["North Indian cuisine"],
        activities: ["Shopping", "Dining", "Exploring nearby areas"],
        category: "urban",
        image: "https://i.ibb.co/HTJnB2k6/Panchkula.jpg"
      },
      {
        id: "panipat",
        name: "Panipat",
        description: "Known as the 'City of Weavers' and famous for its historical battles and handloom industry.",
        bestTime: "October to March",
        culturalEvents: ["Panipat Handloom Fair"],
        localCuisine: ["Panipat Ki Mithai"],
        activities: ["Visiting historical battlefields", "Shopping for handloom products"],
        category: "historical",
        image: "https://i.ibb.co/4RnhhGjr/Panipat-Fort-Cover-Photo-840x425.jpg"
      },
      {
        id: "yamunanagar",
        name: "Yamunanagar",
        description: "An industrial city on the banks of Yamuna River, known for its paper, sugar, and metal industries.",
        bestTime: "October to March",
        culturalEvents: [],
        localCuisine: ["Sweets and Savories"],
        activities: ["Visit Kalesar National Park", "Religious sites"],
        category: "industrial",
        image: "https://i.ibb.co/JhPyNVt/Yamuna-nagar.jpg"
      }
    ]
  },

  hi: {
    title: "हरियाणा की सैर करें",
    subtitle: "हरियाणा की जीवंत संस्कृति और सुंदरता को जानिए।",
    searchPlaceholder: "नाम या विवरण से खोजें...",
    bestTime: "घूमने का सबसे अच्छा समय",
    culturalEvents: "सांस्कृतिक आयोजन",
    localSpecialties: "स्थानीय विशेषताएँ",
    noLocationsFound: "आपकी खोज से मेल खाती कोई जगह नहीं मिली।",
    categories: [
      { id: "all", label: "सभी" },
      { id: "historical", label: "ऐतिहासिक" },
      { id: "nature", label: "प्राकृतिक" },
      { id: "religious", label: "धार्मिक" },
      { id: "urban", label: "शहरी" },
      { id: "industrial", label: "औद्योगिक" },
      { id: "adventure", label: "रोमांचक" }
    ],
    locations: [
      {
        id: "gurgaon",
        name: "गुरुग्राम",
        description: "एक प्रमुख औद्योगिक और वित्तीय केंद्र, आधुनिक ढांचे और तेज़ी से विकास के लिए प्रसिद्ध।",
        bestTime: "अक्टूबर से मार्च",
        culturalEvents: ["साइबर हब त्यौहार"],
        localCuisine: ["हरियाणवी थाली", "स्ट्रीट फूड"],
        activities: ["खरीदारी", "नाइटलाइफ़", "कॉर्पोरेट इवेंट्स"],
        category: "urban",
        image: "https://i.ibb.co/ynW25D0R/GURGAON.jpg"
      },
      {
        id: "surajkund",
        name: "सूरजकुंड",
        description: "अपने प्राचीन जलाशय और अंतर्राष्ट्रीय शिल्प मेले के लिए प्रसिद्ध।",
        bestTime: "फरवरी (मेले के लिए)",
        culturalEvents: ["सूरजकुंड अंतर्राष्ट्रीय शिल्प मेला"],
        localCuisine: ["पारंपरिक हरियाणवी मिठाइयाँ"],
        activities: ["हस्तशिल्प मेला", "बोटिंग", "पिकनिक"],
        category: "historical",
        image: "https://i.ibb.co/9knrRy7V/Surajkund.jpg"
      },
      {
        id: "sultanpur-np",
        name: "सुलतानपुर राष्ट्रीय उद्यान",
        description: "एक लोकप्रिय पक्षी अभयारण्य, जहां प्रवासी और स्थायी पक्षी रहते हैं, पक्षी दर्शन के लिए आदर्श।",
        bestTime: "दिसंबर से फरवरी",
        culturalEvents: [],
        localCuisine: [],
        activities: ["पक्षी दर्शन", "फोटोग्राफी", "प्राकृतिक सैर"],
        category: "nature",
        image: "https://i.ibb.co/jv9sS8Ld/Sultanpur-National-Park.webp"
      },
      {
        id: "kurukshetra",
        name: "कुरुक्षेत्र",
        description: "एक ऐतिहासिक शहर, महाभारत की लड़ाई के मैदान के रूप में प्रसिद्ध और महत्वपूर्ण तीर्थ स्थल।",
        bestTime: "अक्टूबर से मार्च",
        culturalEvents: ["कुरुक्षेत्र महोत्सव"],
        localCuisine: ["पनीर व्यंजन"],
        activities: ["मंदिर दर्शन", "ऐतिहासिक भ्रमण", "ब्रह्म सरोवर में नौका विहार"],
        category: "religious",
        image: "https://i.ibb.co/35jgWkDV/Kurukshetra.jpg"
      },
      {
        id: "pinjore-gardens",
        name: "पिंजौर गार्डन",
        description: "एक खूबसूरत 17वीं सदी का मुगल बगीचा, जिसे यादविंद्र गार्डन के नाम से भी जाना जाता है, जिसमें फव्वारे और महल हैं।",
        bestTime: "वसंत और शरद ऋतु",
        culturalEvents: ["आम महोत्सव (जुलाई)"],
        localCuisine: ["स्थानीय नाश्ते"],
        activities: ["पिकनिक", "दर्शन", "फोटोग्राफी"],
        category: "historical",
        image: "https://i.ibb.co/zVgjsCYC/Pinjore-Gardens.jpg"
      },
      {
        id: "morni-hills",
        name: "मॉर्नी हिल्स",
        description: "हरियाणा का एकमात्र हिल स्टेशन, जहाँ खूबसूरत दृश्य, ट्रेकिंग ट्रेल्स और रोमांचक गतिविधियाँ हैं।",
        bestTime: "अक्टूबर से अप्रैल",
        culturalEvents: [],
        localCuisine: ["हिल स्टेशन व्यंजन"],
        activities: ["ट्रेकिंग", "बोटिंग", "कैंपिंग", "प्रकृति अन्वेषण"],
        category: "nature",
        image: "https://i.ibb.co/DgY6Ty74/Morni-Hills.webp"
      },
      {
        id: "panchkula",
        name: "पंचकुला",
        description: "एक योजनाबद्ध शहर, जो अपने आधुनिक ढांचे, हरित क्षेत्र और हिमाचल प्रदेश के प्रवेश द्वार के रूप में जाना जाता है।",
        bestTime: "अक्टूबर से मार्च",
        culturalEvents: [],
        localCuisine: ["उत्तर भारतीय व्यंजन"],
        activities: ["खरीदारी", "भोजन", "पास के क्षेत्रों की खोज"],
        category: "urban",
        image: "https://i.ibb.co/HTJnB2k6/Panchkula.jpg"
      },
      {
        id: "panipat",
        name: "पानीपत",
        description: "‘वीवरों का शहर’ और ऐतिहासिक युद्धों और हैंडलूम उद्योग के लिए प्रसिद्ध।",
        bestTime: "अक्टूबर से मार्च",
        culturalEvents: ["पानीपत हैंडलूम मेला"],
        localCuisine: ["पानीपत की मिठाई"],
        activities: ["ऐतिहासिक युद्धभूमियों का भ्रमण", "हैंडलूम उत्पादों की खरीदारी"],
        category: "historical",
        image: "https://i.ibb.co/4RnhhGjr/Panipat-Fort-Cover-Photo-840x425.jpg"
      },
      {
        id: "yamunanagar",
        name: "यमुनानगर",
        description: "यमुना नदी के किनारे एक औद्योगिक शहर, पेपर, चीनी और धातु उद्योगों के लिए प्रसिद्ध।",
        bestTime: "अक्टूबर से मार्च",
        culturalEvents: [],
        localCuisine: ["मिठाइयाँ और नमकीन"],
        activities: ["कालेश्वर राष्ट्रीय उद्यान का भ्रमण", "धार्मिक स्थल"],
        category: "industrial",
        image: "https://i.ibb.co/JhPyNVt/Yamuna-nagar.jpg"
      }
    ]
  }
};
