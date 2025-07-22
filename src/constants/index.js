export const weatherApi = import.meta.env.VITE_WEATHER_API_KEY;
export const HrRoadwaysKey = import.meta.env.VITE_HR_ROADWAYS_KEY;
export const translationalURL = import.meta.env.VITE_TRANSLATIONAL_URL;
export const translationsUrl = import.meta.env.VITE_ANOTHER_TRANSLATION_URL;
export const TranslationURL = import.meta.env.VITE_THIRD_TRANSLATION_URL;
export const fourthTranslationURL = import.meta.env.VITE_FOURTH_TRANSLATION_URL;
export const fifthTranslationURL = import.meta.env.VITE_FIFTH_TRANSLATION_URL;
export const sixthTranslationURL = import.meta.env.VITE_SIXTH_TRANSLATION_URL;
export const seventhTranslationURL = import.meta.env
  .VITE_SEVENTH_TRANSLATION_URL;
export const eightTranslationURL = import.meta.env.VITE_EIGHT_TRANSLATION_URL;
export const ninthTranslationURL = import.meta.env.VITE_NINTH_TRANSLATION_URL;
export const tenthTranslationURL = import.meta.env.VITE_TENTH_TRANSLATION_URL;
export const eleventhTranslationURL = import.meta.env
  .VITE_ELEVENTH_TRANSLATION_URL;
export const busStandURL = import.meta.env.VITE_BUS_STAND_URL;

export const priceReg = /[^\d]/g;
export const QRCode = "https://i.postimg.cc/Y0Zv8SGc/HR-QR.png";
export const Logo = "https://i.ibb.co/kg3RQQ1S/LogoHR.png";

// Import images
export const Gurgaon = "https://i.ibb.co/ynW25D0R/GURGAON.jpg";
export const Surajkund = "https://i.ibb.co/9knrRy7V/Surajkund.jpg";
export const Sultanpur_National_Park =
  "https://i.ibb.co/jv9sS8Ld/Sultanpur-National-Park.webp";
export const Kurukshetra = "https://i.ibb.co/35jgWkDV/Kurukshetra.jpg";
export const Pinjore_Gardens = "https://i.ibb.co/zVgjsCYC/Pinjore-Gardens.jpg";
export const Morni_Hills = "https://i.ibb.co/DgY6Ty74/Morni-Hills.webp";
export const Panchkula = "https://i.ibb.co/HTJnB2k6/Panchkula.jpg";
export const constructionImage =
  "https://i.ibb.co/5VqhnDH/under-construction.webp";

// Default translations (fallback) in English
export const defaultLanguage = {
  filters: "Filters",
  priceRange: "Price Range",
  minRating: "Minimum Rating",
  perNight: "per night",
  hotels: "Hotels",
  noHotels: "No hotels found",
  priceLabel: (price) => `₹${price}`,
};
