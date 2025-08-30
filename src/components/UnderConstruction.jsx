// src/components/UnderConstruction.jsx
import React from 'react';
import '../styles/underConstruction.css';
const constructionImage = 'https://i.ibb.co/5VqhnDH/under-construction.webp';

const UnderConstruction = () => {
    return (
        <div className="under-construction dark:bg-gray-950 dark:text-white">
            <h1>Under Construction</h1>
            <div className="animation-container">
                <img 
                    src={constructionImage} 
                    alt="Under Construction" 
                    height="400" 
                    width="400" 
                />
            </div>
        </div>
    );
};

export default UnderConstruction;
