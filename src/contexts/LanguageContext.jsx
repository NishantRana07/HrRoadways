import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setCurrentLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage && savedLanguage !== currentLanguage) {
            changeLanguage(savedLanguage);
        }
    }, []);

    const value = {
        currentLanguage,
        changeLanguage,
        availableLanguages: [
            { code: 'en', name: 'English' },
            { code: 'hi', name: 'हिन्दी' },
            { code: 'bn', name: 'বাংলা' },
            { code: 'te', name: 'తెలుగు' },
            { code: 'mr', name: 'मराठी' },
            { code: 'ta', name: 'தமிழ்' },
            { code: 'gu', name: 'ગુજરાતી' },
            { code: 'kn', name: 'ಕನ್ನಡ' },
            { code: 'ml', name: 'മലയാളം' },
            { code: 'pa', name: 'ਪੰਜਾਬੀ' },
            { code: 'or', name: 'ଓଡ଼ିଆ' },
            { code: 'as', name: 'অসমীয়া' },
            { code: 'ur', name: 'اردو' }
        ]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
