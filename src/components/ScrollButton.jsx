
import React, { useEffect, useState } from 'react';

function ScrollButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    };

    return (
        showButton && (
            <button
            onClick={handleScroll}
            style={{
                position: 'fixed',
                bottom: '22px',
                right: '22px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                padding: '12px 15px',
                fontSize: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 2)',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
            }}

            aria-label="Go to top"
            >
             ↑

            </button>
        )
    );
 }

 export default ScrollButton;