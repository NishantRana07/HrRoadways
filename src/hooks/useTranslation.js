import {useState, useEffect} from "react";
import localTranslationData from "../assets/translations.json";

const useTranslation = (isHindi = false) => {
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set language from local fallback JSON
    setTranslations(
      isHindi ? localTranslationData.hi : localTranslationData.en
    );
    setLoading(false);
  }, [isHindi]);

  // Function to get translation key
  const t = (key) => translations?.[key] || key;

  return {t, loading, error: null};
};

export default useTranslation;
