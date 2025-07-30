import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/nav";
import Hero from "./components/hero";
import Available from "./components/Available";
import AboutUs from "./components/Aboutus";
import Trip from "./components/Trip";
import Footer from "./components/footer";
import Reviews from "./components/Review";
import Blog from "./components/Blog";
import DonatePage from "./components/DonatePage";
import TravelLocations from "./components/TravelLocation";
import HelplinePage from "./components/HelpLinepage";
import BusTracker from "./components/Track";
import InfoPage from "./components/InfoPage";
import UnderConstruction from "./components/UnderConstruction";
import ContactUs from "./components/ContactUs";
import AffiliateProgram from "./components/AffiliateProgram";
import BusCard from "./components/BusCard";
import PaymentOptions from "./components/Paymentoptions";
import RoyalHaryanaTourism from "./components/RoyalHaryanaTourism";
import ServicesPage from "./components/Services";
import BestRides from "./components/BestRides";
import Tutorial from "./components/Tutorial";
import WeeklyTimetable from "./components/Timetable";
import RulesAndGuidelines from "./components/Rules";
import TourGuidePage from "./components/TourGuidePage";
import NotFound from "./components/NotFound";
import BookingPage from "./components/BookingPage";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import MyBookings from "./components/Userprofile";

function BookingPageWrapper() {
  const location = useLocation();
  const { selectedBus } = (location && location.state) || {};
  return <BookingPage selectedBus={selectedBus} />;
}

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Navigation />

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Available" element={<Available />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/bestrides" element={<BestRides />} />
          <Route path="/policy" element={<InfoPage />} />
          <Route path="/rules" element={<RulesAndGuidelines />} />
          <Route path="/under-construction" element={<UnderConstruction />} />
          <Route
            path="/contactUs"
            element={<Navigate to="/contact" replace />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/payment" element={<PaymentOptions />} />
          <Route path="/track" element={<BusTracker />} />
          <Route path="/luxury" element={<RoyalHaryanaTourism />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/travellocations" element={<TravelLocations />} />
          <Route path="/helpline" element={<HelplinePage />} />
          <Route path="/schedule" element={<WeeklyTimetable />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/affiliate" element={<AffiliateProgram />} />
          <Route path="/card" element={<BusCard />} />
          <Route path="/guide" element={<Tutorial />} />
          <Route path="/tour-guide" element={<TourGuidePage />} />
          <Route path="/booking" element={<BookingPageWrapper />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Register />} />
          <Route path="/register" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/yash" element={<h1>Yash's Page</h1>} />
        </Routes>

        <Footer />

        {showBackToTop && (
          <button
            onClick={handleScrollToTop}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="back-to-top-btn"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: hovered ? "#1E90FF" : "#007BFF",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "50px",
              fontSize: "18px",
              cursor: "pointer",
              zIndex: "1000",
              border: "none",
              boxShadow: hovered ? "0px 4px 6px rgba(0, 0, 0, 0.2)" : "none",
              transition:
                "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
            }}
          >
            <i className="fa fa-arrow-up fa-lg"></i>
          </button>
        )}
      </Router>
    </LanguageProvider>
  );
}

export default App;
