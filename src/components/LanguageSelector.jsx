import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import '../styles/LanguageSelector.css';

const LanguageSelector = ({ className = "", variant = "default" }) => {
    const { t } = useTranslation();
    const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (languageCode) => {
        changeLanguage(languageCode);
        setIsOpen(false);
    };

    const currentLangData = availableLanguages.find(lang => lang.code === currentLanguage);

    // Different variants for different contexts
    const getVariantStyles = () => {
        switch (variant) {
            case "navbar":
                return {
                    button: "flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm min-w-0",
                    // Dropdown opens downward, positioned absolutely below the button, with high z-index and scrollable
                    dropdown: "absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] max-h-80 overflow-y-auto backdrop-blur-lg language-dropdown",
                    item: "w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-b-0 language-item",
                    activeItem: "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-500"
                };
            case "mobile":
                return {
                    button: "flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors min-w-0",
                    dropdown: "mt-2 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto language-dropdown",
                    item: "w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0 language-item",
                    activeItem: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                };
            default:
                return {
                    button: "flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm min-w-0",
                    dropdown: "absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto language-dropdown",
                    item: "w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 language-item",
                    activeItem: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500"
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <div className={`relative language-selector ${variant === 'navbar' ? 'z-[9999]' : ''} ${variant === 'mobile' ? 'language-selector-mobile' : ''} ${className} dark:bg-gray-950 dark:text-white`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.button}
                aria-label={t('nav.changeLanguage')}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <Globe size={16} className="flex-shrink-0" />
                <span className="text-sm font-medium truncate">
                    {currentLangData?.name || 'English'}
                </span>
                <ChevronDown
                    size={16}
                    className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdown} role="listbox">
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                            {t('common.selectLanguage', 'Select Language')}
                        </div>
                        <div className="overflow-y-auto">
                            {availableLanguages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language.code)}
                                    className={`${styles.item} ${currentLanguage === language.code
                                        ? styles.activeItem
                                        : ''
                                        }`}
                                    role="option"
                                    aria-selected={currentLanguage === language.code}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{language.name}</span>
                                        {currentLanguage === language.code && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
