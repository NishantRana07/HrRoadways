import React, { useState } from 'react';
import '../assets/hero.css';
import Bus from '../assets/Bus.png';

function Hero({ isHindi }) {
    const translations = {
        en: {
            heading: "Haryana Roadways Always Best",
            subheading: "Search All Haryana Buses",
            departure: "Departure Bus Stand",
            arrival: "Arrival Bus Stand",
            button: "Search Now",
            quote: "Plan Your Journey with Haryana Roadways",
        },
        hi: {
            heading: "हरियाणा रोडवेज हमेशा सर्वश्रेष्ठ",
            subheading: "सभी हरियाणा बसें खोजें",
            departure: "प्रस्थान बस स्टैंड",
            arrival: "आगमन बस स्टैंड",
            button: "अब खोजें",
            quote: "हरियाणा रोडवेज के साथ अपनी यात्रा की योजना बनाएं",
        },
    };

    const currentLanguage = isHindi ? translations.hi : translations.en;

    const [formData, setFormData] = useState({ src: '', dest: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        alert(currentLanguage.button);
    };

    return (
        <div className="hero">
            <div className="body">
                <div className="left">
                    <center>
                        <p className="hea">{currentLanguage.heading}</p>
                    </center>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <center>
                                <p>{currentLanguage.subheading}</p>
                            </center>
                            <div className="input-group">
                                <input
                                    required
                                    type="text"
                                    name="src"
                                    autoComplete="off"
                                    className="input"
                                    value={formData.src}
                                    onChange={handleChange}
                                />
                                <label className="user-label">{currentLanguage.departure}</label>
                            </div>
                            <br />
                            <div className="input-group">
                                <input
                                    required
                                    type="text"
                                    name="dest"
                                    autoComplete="off"
                                    className="input"
                                    value={formData.dest}
                                    onChange={handleChange}
                                />
                                <label className="user-label">{currentLanguage.arrival}</label>
                            </div>
                            <br />
                            <button type="submit" className="CartBtn">
                                {currentLanguage.button}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="right">
                    <p>{currentLanguage.quote}</p>
                    <div className="image">
                        <img src={Bus} alt="Bus" loading="lazy" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
