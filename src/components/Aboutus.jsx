import React, { useEffect, useState } from 'react';
import { MapPin, Award, Star, Heart } from 'lucide-react';

function AboutUs({ isHindi }) {
    const translations = {
        en: {
            title: "About Us",
            description: "Welcome to Haryana Tourism! We are passionate about showcasing the rich cultural heritage and natural beauty of Haryana. Our team is dedicated to promoting authentic Haryanvi experiences and traditional values.",
            missionTitle: "Our Mission",
            missionDescription: "Our mission is to preserve and promote the vibrant culture of Haryana while providing exceptional tourism experiences. We strive to showcase our state's rich heritage, from ancient battlegrounds to modern cities.",
            valuesTitle: "Our Cultural Values",
            values: [
                { title: "Hospitality", description: "Embodying the spirit of 'Atithi Devo Bhava'" },
                { title: "Heritage", description: "Preserving our rich Haryanvi traditions" },
                { title: "Community", description: "Supporting local artisans and culture" },
                { title: "Excellence", description: "Delivering authentic experiences" }
            ],
            culturalHighlights: "Cultural Highlights",
            culturalEvents: [
                { name: "Geeta Jayanti", date: "December", location: "Kurukshetra" },
                { name: "Surajkund Mela", date: "February", location: "Faridabad" },
                { name: "Haryana Day", date: "November 1st", location: "Statewide" }
            ],
            teamTitle: "Meet Our Team",
            team: [
                { name: "Nishant Rana", role: "CEO & Founder", expertise: "Cultural Heritage Expert" },
                { name: "Amaan Syed", role: "Lead Developer", expertise: "Digital Innovation" },
                { name: "Sanjeevani", role: "Chief Marketing Officer", expertise: "Tourism Development" }
            ],
            achievements: "Our Achievements",
            achievementsList: [
                "Best Tourism Initiative Award 2024",
                "Cultural Preservation Excellence",
                "Digital Innovation in Tourism"
            ]
        },
        hi: {
            title: "हमारे बारे में",
            description: "हरियाणा पर्यटन में आपका स्वागत है! हम हरियाणा की समृद्ध सांस्कृतिक विरासत और प्राकृतिक सौंदर्य को प्रदर्शित करने के लिए उत्साहित हैं। हमारी टीम प्रामाणिक हरियाणवी अनुभवों और पारंपरिक मूल्यों को बढ़ावा देने के लिए समर्पित है।",
            missionTitle: "हमारा मिशन",
            missionDescription: "हमारा मिशन असाधारण पर्यटन अनुभव प्रदान करते हुए हरियाणा की जीवंत संस्कृति को संरक्षित और बढ़ावा देना है। हम प्राचीन युद्धभूमि से लेकर आधुनिक शहरों तक अपने राज्य की समृद्ध विरासत को प्रदर्शित करने का प्रयास करते हैं।",
            valuesTitle: "हमारे सांस्कृतिक मूल्य",
            values: [
                { title: "आतिथ्य", description: "'अतिथि देवो भव' की भावना को साकार करना" },
                { title: "विरासत", description: "हमारी समृद्ध हरियाणवी परंपराओं का संरक्षण" },
                { title: "समुदाय", description: "स्थानीय कलाकारों और संस्कृति का समर्थन" },
                { title: "उत्कृष्टता", description: "प्रामाणिक अनुभव प्रदान करना" }
            ],
            culturalHighlights: "सांस्कृतिक विशेषताएं",
            culturalEvents: [
                { name: "गीता जयंती", date: "दिसंबर", location: "कुरुक्षेत्र" },
                { name: "सूरजकुंड मेला", date: "फरवरी", location: "फरीदाबाद" },
                { name: "हरियाणा दिवस", date: "1 नवंबर", location: "पूरे राज्य में" }
            ],
            teamTitle: "हमारी टीम से मिलें",
            team: [
                { name: "निशांत राणा", role: "CEO और संस्थापक", expertise: "सांस्कृतिक विरासत विशेषज्ञ" },
                { name: "अमान सैयद", role: "लीड डेवलपर", expertise: "डिजिटल नवाचार" },
                { name: "संजीवनी", role: "मुख्य विपणन अधिकारी", expertise: "पर्यटन विकास" }
            ],
            achievements: "हमारी उपलब्धियां",
            achievementsList: [
                "सर्वश्रेष्ठ पर्यटन पहल पुरस्कार 2024",
                "सांस्कृतिक संरक्षण उत्कृष्टता",
                "पर्यटन में डिजिटल नवाचार"
            ]
        }
    };

        const [currentLanguage, setCurrentLanguage] = useState(translations.en);
        const [activeEvent, setActiveEvent] = useState(null);

        useEffect(() => {
            setCurrentLanguage(isHindi ? translations.hi : translations.en);
        }, [isHindi]);

        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900 text-white py-20">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-6">{currentLanguage.title}</h1>
                        <p className="text-xl leading-relaxed">{currentLanguage.description}</p>
                    </div>

                    {/* Values Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {currentLanguage.values.map((value, index) => (
                            <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:transform hover:scale-105 transition-transform">
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-gray-200">{value.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Cultural Events Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-center">{currentLanguage.culturalHighlights}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentLanguage.culturalEvents.map((event, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 p-6 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                                    onMouseEnter={() => setActiveEvent(index)}
                                    onMouseLeave={() => setActiveEvent(null)}
                                >
                                    <div className="flex items-center mb-4">
                                        <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                                        <h3 className="text-xl font-bold">{event.name}</h3>
                                    </div>
                                    <p className="text-gray-300 mb-2">{event.date}</p>
                                    <p className="text-gray-300">{event.location}</p>
                                    {activeEvent === index && (
                                        <div className="mt-4 text-sm text-gray-300 animate-fadeIn">
                                            Click to learn more about this event
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-center">{currentLanguage.teamTitle}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {currentLanguage.team.map((member, index) => (
                                <div key={index} className="bg-white/5 p-6 rounded-lg text-center hover:transform hover:scale-105 transition-transform">
                                    <img
                                        src={`/src/assets/team-member${index + 1}.png`}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                    />
                                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-yellow-400 mb-2">{member.role}</p>
                                    <p className="text-gray-300 text-sm">{member.expertise}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className="bg-white/5 p-8 rounded-lg">
                        <h2 className="text-3xl font-bold mb-8 text-center">{currentLanguage.achievements}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentLanguage.achievementsList.map((achievement, index) => (
                                <div key={index} className="flex items-center">
                                    <Award className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                                    <p className="text-gray-200">{achievement}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default AboutUs;