import React, { useEffect, useState } from 'react';
import { MapPin, Award } from 'lucide-react';
import '../styles/Aboutus.css';

// Import team member images
const teamMember1 = 'https://i.ibb.co/YTWD3c0Z/team-member1.png';
const teamMember2 = 'https://i.ibb.co/1WrGL1w/team-member2.png';
const teamMember3 = 'https://i.ibb.co/BHsj3qCM/team-member3.png';

function AboutUs({ isHindi }) {
  const [translations, setTranslations] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  // Replace with your hosted JSON blob URL
  const translationsUrl = 'https://jsonblob.com/api/jsonBlob/1336702663362011136';

  // Fetch the translations when the component mounts
  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setTranslations(data);
        // Initialize the current language based on isHindi prop
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => console.error('Error fetching translations:', error));
  }, [translationsUrl, isHindi]);

  // Update the language if the isHindi prop changes
  useEffect(() => {
    if (translations) {
      setCurrentLanguage(isHindi ? translations.hi : translations.en);
    }
  }, [isHindi, translations]);

  // Show a loading state if translations haven't loaded yet
  if (!currentLanguage) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="aboutus-container">
      <div className="content-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">{currentLanguage.title}</h1>
          <p className="hero-description">{currentLanguage.description}</p>
        </div>

        {/* Values Section */}
        <div className="values-section">
          {currentLanguage.values.map((value, index) => (
            <div key={index} className="value-card">
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Cultural Events Section */}
        <div className="cultural-events-section">
          <h2 className="section-title">{currentLanguage.culturalHighlights}</h2>
          <div className="events-grid">
            {currentLanguage.culturalEvents.map((event, index) => (
              <div
                key={index}
                className="event-card"
                onMouseEnter={() => setActiveEvent(index)}
                onMouseLeave={() => setActiveEvent(null)}
              >
                <div className="event-header">
                  <MapPin className="icon" />
                  <h3 className="event-name">{event.name}</h3>
                </div>
                <p className="event-date">{event.date}</p>
                <p className="event-location">{event.location}</p>
                {activeEvent === index && (
                  <div className="event-extra-info">
                    Click to learn more about this event
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="section-title">{currentLanguage.teamTitle}</h2>
          <div className="team-grid">
            {currentLanguage.team.map((member, index) => (
              <div key={index} className="team-member-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-image"
                />
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-expertise">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="achievements-section">
          <h2 className="section-title">{currentLanguage.achievements}</h2>
          <div className="achievements-grid">
            {currentLanguage.achievementsList.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <Award className="icon" />
                <p className="achievement-description">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;