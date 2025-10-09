// Translation Key Mapping Utility
// This helps developers find the right translation keys
import { Facebook, Instagram, Linkedin, Twitter  } from "lucide-react";

export const translationKeyMap = {
  // Navigation keys
  navigation: {
    home: "nav.home",
    about: "nav.about",
    services: "nav.services",
    contact: "nav.contact",
    trip: "nav.trip",   
    track: "nav.track",
    blog: "nav.blog",
    donate: "nav.donate",
    helpline: "nav.helpline",
    schedule: "nav.schedule",
    tourGuide: "nav.tourGuide",
    travellocations: "nav.travellocations",
    guide: "nav.guide",
    changeLanguage: "nav.changeLanguage",
  },

  // Hero section keys
  hero: {
    heading: "hero.heading",
    subheading: "hero.subheading",
    departure: "hero.departure",
    arrival: "hero.arrival",
    button: "hero.button",
    popular: "hero.popular",
    allBuses: "hero.allBuses",
    volvo: "hero.volvo",
    superExpress: "hero.superExpress",
    ordinary: "hero.ordinary",
    searchPlaceholder: "hero.searchPlaceholder",
  },

  // Footer keys
  footer: {
    companyInfo: "footer.companyInfo",
    description: "footer.description",
    quickLinks: "footer.quickLinks",
    contact: "footer.contact",
    followUs: "footer.followUs",
    copyright: "footer.copyright",
    company: "footer.company",
    getHelp: "footer.getHelp",
    rides: "footer.rides",
    privacy: "footer.privacy",
    luxury: "footer.luxury",
  },

   // 🌟✨ ADDED NEWSLETTER SECTION KEYS ✨🌟
    newsletterTitle: "footer.newsletterTitle", // "Subscribe to our Newsletter"
    newsletterSubtitle: "footer.newsletterSubtitle", // "Get latest updates and offers"
    newsletterPlaceholder: "footer.newsletterPlaceholder", // "Enter your email"
    newsletterSubscribe: "footer.newsletterSubscribe", // "Subscribe"
    newsletterNoThanks: "footer.newsletterNoThanks", // "No thanks"
    newsletterSuccess: "footer.newsletterSuccess", // "You have successfully subscribed!"
    newsletterError: "footer.newsletterError", // "Something went wrong. Please try again."
    newsletterTerms: "footer.newsletterTerms", // "By subscribing, you agree to our"
    newsletterPrivacyPolicy: "footer.newsletterPrivacyPolicy", // "Privacy Policy"
    newsletterTermsOfService: "footer.newsletterTermsOfService", // "Terms of Service"
  },

  // About section keys
  about: {
    title: "about.title",
    subtitle: "about.subtitle",
    description: "about.description",
    mission: "about.mission",
    missionText: "about.missionText",
    vision: "about.vision",
    visionText: "about.visionText",
    values: "about.values",
    safety: "about.safety",
    safetyDesc: "about.safetyDesc",
    reliability: "about.reliability",
    reliabilityDesc: "about.reliabilityDesc",
    comfort: "about.comfort",
    comfortDesc: "about.comfortDesc",
    sustainability: "about.sustainability",
    sustainabilityDesc: "about.sustainabilityDesc",
  },

  // Services keys
  services: {
    title: "services.title",
    subtitle: "services.subtitle",
    ticketBooking: "services.ticketBooking",
    ticketBookingDesc: "services.ticketBookingDesc",
    luxuryBuses: "services.luxuryBuses",
    luxuryBusesDesc: "services.luxuryBusesDesc",
    tracking: "services.tracking",
    trackingDesc: "services.trackingDesc",
    support: "services.support",
    supportDesc: "services.supportDesc",
    multipleRoutes: "services.multipleRoutes",
    multipleRoutesDesc: "services.multipleRoutesDesc",
    safeTraveling: "services.safeTraveling",
    safeTravelingDesc: "services.safeTravelingDesc",
  },

  // Contact keys
  contact: {
    title: "contact.title",
    subtitle: "contact.subtitle",
    customerSupport: "contact.customerSupport",
    bookingAssistance: "contact.bookingAssistance",
    emailSupport: "contact.emailSupport",
    officeTimings: "contact.officeTimings",
    weekdays: "contact.weekdays",
    saturday: "contact.saturday",
    sunday: "contact.sunday",
    closed: "contact.closed",
    officeLocations: "contact.officeLocations",
    chandigarh: "contact.chandigarh",
    delhi: "contact.delhi",
    gurgaon: "contact.gurgaon",
  },

  // Payment keys
  payment: {
    title: "payment.title",
    subtitle: "payment.subtitle",
    creditCard: "payment.creditCard",
    debitCard: "payment.debitCard",
    upi: "payment.upi",
    wallet: "payment.wallet",
    netBanking: "payment.netBanking",
    payNow: "payment.payNow",
    cardHolder: "payment.cardHolder",
    cardNumber: "payment.cardNumber",
    expiryDate: "payment.expiryDate",
    cvv: "payment.cvv",
    amount: "payment.amount",
    processing: "payment.processing",
  },

  // Reviews keys
  reviews: {
    title: "reviews.title",
    subtitle: "reviews.subtitle",
    writeReview: "reviews.writeReview",
    rating: "reviews.rating",
    yourReview: "reviews.yourReview",
    submit: "reviews.submit",
    helpful: "reviews.helpful",
    notHelpful: "reviews.notHelpful",
    reply: "reviews.reply",
    showReplies: "reviews.showReplies",
    hideReplies: "reviews.hideReplies",
  },

  // Blog keys
  blog: {
    title: "blog.title",
    subtitle: "blog.subtitle",
    readMore: "blog.readMore",
    publishedOn: "blog.publishedOn",
    author: "blog.author",
    category: "blog.category",
    tags: "blog.tags",
  },

  // Common keys
  common: {
    loading: "common.loading",
    error: "common.error",
    tryAgain: "common.tryAgain",
    submit: "common.submit",
    cancel: "common.cancel",
    save: "common.save",
    edit: "common.edit",
    delete: "common.delete",
    confirm: "common.confirm",
    close: "common.close",
    next: "common.next",
    previous: "common.previous",
    search: "common.search",
    filter: "common.filter",
    sort: "common.sort",
    apply: "common.apply",
    reset: "common.reset",
    clear: "common.clear",
    select: "common.select",
    choose: "common.choose",
    upload: "common.upload",
    download: "common.download",
    share: "common.share",
    print: "common.print",
    view: "common.view",
    more: "common.more",
    less: "common.less",
    show: "common.show",
    hide: "common.hide",
  },

  // Trip/Travel keys
  trip: {
    title: "trip.title",
    subtitle: "trip.subtitle",
    filters: "trip.filters",
    priceRange: "trip.priceRange",
    minRating: "trip.minRating",
    perNight: "trip.perNight",
    hotels: "trip.hotels",
    noHotels: "trip.noHotels",
    location: "trip.location",
    rating: "trip.rating",
    price: "trip.price",
    passengers: "trip.passengers",
    roundTrip: "trip.roundTrip",
  },

  // Travel locations keys
  travelLocations: {
    title: "travelLocations.title",
    subtitle: "travelLocations.subtitle",
    searchPlaceholder: "travelLocations.searchPlaceholder",
    description: "travelLocations.description",
    attractions: "travelLocations.attractions",
    bestTime: "travelLocations.bestTime",
    culturalEvents: "travelLocations.culturalEvents",
    localSpecialties: "travelLocations.localSpecialties",
    noLocationsFound: "travelLocations.noLocationsFound",
    categories: "travelLocations.categories",
    all: "travelLocations.all",
    historical: "travelLocations.historical",
    natural: "travelLocations.natural",
    cultural: "travelLocations.cultural",
    adventure: "travelLocations.adventure",
    religious: "travelLocations.religious",
  },
};

// Helper function to get translation key
export const getTranslationKey = (section, key) => {
  if (translationKeyMap[section] && translationKeyMap[section][key]) {
    return translationKeyMap[section][key];
  }
  console.warn(`Translation key not found: ${section}.${key}`);
  return `${section}.${key}`;
};

// Helper function for component migration
export const migrationHelper = {
  // Replace old currentLanguage patterns
  replaceCurrentLanguage: (text) => {
    return text
      .replace(/currentLanguage\.(\w+)/g, "t('$1')")
      .replace(/\{currentLanguage\.(\w+)\}/g, "{t('$1')}");
  },

  // Generate import statement
  getImportStatement: () => {
    return "import { useTranslation } from 'react-i18next';";
  },

  // Generate hook usage
  getHookUsage: () => {
    return "const { t } = useTranslation();";
  },

  // Check if component needs migration
  needsMigration: (componentCode) => {
    return (
      componentCode.includes("currentLanguage") ||
      componentCode.includes("isHindi") ||
      componentCode.includes("jsonblob.com") ||
      !componentCode.includes("useTranslation")
    );
  },
};

export default translationKeyMap;

// Social media links in footer section
export const socialMediaLinks = [
  {
    Icon: Facebook,
    color: "social-facebook",
    href: "https://www.facebook.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    label: "Visit our Facebook Profile",
  },
  {
    Icon: Twitter,
    color: "social-twitter",
    href: "https://x.com/TechwNishant",
    target: "_blank",
    rel: "noopener noreferrer",
    label: "Visit our X Profile",
  },
  {
    Icon: Instagram,
    color: "social-instagram",
    href: "https://www.instagram.com/nishantelite/",
    target: "_blank",
    rel: "noopener noreferrer",
    label: "Visit our Instagram Profile",
  },
  {
    Icon: Linkedin,
    color: "social-linkedin",
    href: "https://www.linkedin.com/in/nishantrana07/",
    target: "_blank",
    rel: "noopener noreferrer",
    label: "Visit our Linkedin Profile",
  },
];
