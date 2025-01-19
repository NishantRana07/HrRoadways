import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/nav';
import Hero from './components/hero';
import Available from './components/Available';
import AboutUs from './components/Aboutus';
import Trip from './components/Trip';
import Footer from './components/footer';
import Blog from './components/Blog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Contact() {
    return <h1>Contact Page</h1>;
}

function Donate() {
    return <h1>Donate Page</h1>;
}

function App() {
    const [isHindi, setIsHindi] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleToggleLanguage = () => setIsHindi(!isHindi);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 100); // Show button after scrolling 100px
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Router>
            {/* Navigation Bar */}
            <Navigation isHindi={isHindi} onToggleLanguage={handleToggleLanguage} />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Hero isHindi={isHindi} />} />
                <Route path="/Available" element={<Available isHindi={isHindi} />} />
                <Route path="/about" element={<AboutUs isHindi={isHindi} />} />
                <Route path="/trip" element={<Trip isHindi={isHindi} />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />
            </Routes>

            {/* Footer */}
            <Footer isHindi={isHindi} />

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                onClick={handleScrollToTop}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: hovered ? "#1E90FF" : "#007BFF", // Lighter blue on hover
                    color: "#fff",
                    padding: "10px 15px",
                    borderRadius: "50px",
                    fontSize: "18px",
                    cursor: "pointer",
                    zIndex: "1000",
                    border: "none",
                    boxShadow: hovered ? "0px 4px 6px rgba(0, 0, 0, 0.2)" : "none",
                    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                }}
                aria-label="Scroll to top"
            >
                <FontAwesomeIcon icon={faArrowUp} size='xl'/>
            </button>
            )}
        </Router>
    );
}

export default App;