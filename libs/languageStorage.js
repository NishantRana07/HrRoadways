export const getStoredLanguage = () => {
  const storedLanguage = localStorage.getItem("language");

  // If no language is stored, return 'en' as default
  if (!storedLanguage) {
    return "en";
  }

  return storedLanguage;
};

export const setStoredLanguage = (language) => {
  localStorage.setItem("language", language);
};
