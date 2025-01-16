import React from 'react';

function AboutUs({ isHindi }) {
    const translations = {
        en: {
            title: "About Us",
            description: "Welcome to our website! We are a dedicated team focused on providing excellent services to our customers. Our mission is to deliver top-quality products and services that exceed expectations.",
            missionTitle: "Our Mission",
            missionDescription: "Our mission is to create innovative solutions that empower our customers. We aim to make a positive impact on the world by offering high-quality services, building trust, and fostering lasting relationships with our clients.",
            teamTitle: "Meet Our Team",
            team: [
                { name: "John Doe", role: "CEO & Founder" },
                { name: "Jane Smith", role: "Chief Marketing Officer" },
                { name: "Robert Brown", role: "Lead Developer" },
            ],
        },
        hi: {
            title: "हमारे बारे में",
            description: "हमारी वेबसाइट पर आपका स्वागत है! हम अपने ग्राहकों को उत्कृष्ट सेवाएं प्रदान करने पर केंद्रित एक समर्पित टीम हैं। हमारा मिशन शीर्ष गुणवत्ता वाले उत्पाद और सेवाएं प्रदान करना है जो अपेक्षाओं से अधिक हों।",
            missionTitle: "हमारा मिशन",
            missionDescription: "हमारा मिशन हमारे ग्राहकों को सशक्त बनाने के लिए नवीन समाधान बनाना है। हम उच्च गुणवत्ता वाली सेवाएं प्रदान करके, विश्वास बनाकर और अपने ग्राहकों के साथ स्थायी संबंध बनाकर दुनिया पर सकारात्मक प्रभाव डालने का लक्ष्य रखते हैं।",
            teamTitle: "हमारी टीम से मिलें",
            team: [
                { name: "जॉन डो", role: "सीईओ और संस्थापक" },
                { name: "जेन स्मिथ", role: "मुख्य विपणन अधिकारी" },
                { name: "रॉबर्ट ब्राउन", role: "लीड डेवलपर" },
            ],
        },
    };

    const currentLanguage = isHindi ? translations.hi : translations.en;

    const pageStyle = {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        color: 'white',
        backgroundColor: '#1d2d44',
        minHeight: '100vh',
        marginTop: '50px',
    };

    const containerStyle = {
        maxWidth: '1200px',
        marginTop: '70px',
        margin: '0 auto',
        backgroundColor: '#1d2d44',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.6)',
    };

    const titleStyle = {
        padding: '20px',
        fontSize: '2.5rem',
        textAlign: 'center',
        color: '#EEEEEE',
    };

    const descriptionStyle = {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        marginTop: '20px',
        textAlign: 'center',
        color: 'white',
    };

    const sectionTitleStyle = {
        fontSize: '2rem',
        marginTop: '30px',
        color: '#EEEEEE',
    };

    const missionDescriptionStyle = {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: 'white',
        marginTop: '10px',
    };

    const teamMembersStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px',
    };

    const teamMemberStyle = {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
        transition: 'transform 0.3s ease-in-out',
    };

    const teamImageStyle = {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
    };

    const teamNameStyle = {
        fontSize: '1.5rem',
        color: '#333',
        marginTop: '10px',
    };

    const teamRoleStyle = {
        fontSize: '1rem',
        color: '#777',
        marginTop: '5px',
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={titleStyle}>{currentLanguage.title}</h1>
                <p style={descriptionStyle}>{currentLanguage.description}</p>
                <h2 style={sectionTitleStyle}>{currentLanguage.missionTitle}</h2>
                <p style={missionDescriptionStyle}>{currentLanguage.missionDescription}</p>
                <h2 style={sectionTitleStyle}>{currentLanguage.teamTitle}</h2>
                <div style={teamMembersStyle}>
                    {currentLanguage.team.map((member, index) => (
                        <div key={index} style={teamMemberStyle}>
                            <img
                                src={`team-member${index + 1}.jpg`}  // Replace with your actual image paths
                                alt={`Team Member ${index + 1}`}
                                style={teamImageStyle}
                            />
                            <h3 style={teamNameStyle}>{member.name}</h3>
                            <p style={teamRoleStyle}>{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AboutUs;