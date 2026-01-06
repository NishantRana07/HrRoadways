import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "leaflet/dist/leaflet.css";
import './index.css';
import './i18n';
import './styles/footer.css';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Import components directly
import Hero from './components/hero';
import Available from './components/Available';
import AboutUs from './components/Aboutus';
import Trip from './components/Trip';
import BestRides from './components/BestRides';
import InfoPage from './components/InfoPage';
import Rules from './components/Rules';
import UnderConstruction from './components/UnderConstruction';
import ContactUs from './components/ContactUs';
import Blog from './components/Blog';
import PaymentOptions from './components/Paymentoptions';
import Track from './components/Track';
import RoyalHaryanaTourism from './components/RoyalHaryanaTourism';
import Services from './components/Services';
import TravelLocation from './components/TravelLocation';
import HelpLinePage from './components/HelpLinepage';
import Review from './components/Review';
import AffiliateProgram from './components/AffiliateProgram';
import BusCard from './components/BusCard';
import Tutorial from './components/Tutorial';
import DonatePage from './components/DonatePage';
import Timetable from './components/Timetable';
import TourGuidePage from './components/TourGuidePage';
import Login from './components/Login';
import Userprofile from './components/Userprofile';
import NotFound from './components/NotFound';
import ToastTest from './components/ToastTest';
import FaqPage from './components/faq';
import TravelPackagesPage from './components/TravelPackagesPage';
import SmartRoute from './components/SmartRoute';
import BookingPage from './components/BookingPage';

// Import layout components
import Header from './components/Header';
import Navigation from './components/nav';
import Footer from './components/footer';
import ScrollButton from './components/ScrollButton';
import ScrollToTop from './components/ScrollToTop';
import ThemeWrapper from './components/ThemeWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';
import { BusProvider } from './contexts/BusContext';

// Error Boundary for debugging
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Check console for details</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log('App rendering...');
  
  return (
    <ThemeWrapper>
      <BusProvider>
        <LanguageProvider>
          <Router>
            <Header />
            <Navigation />
            
            <ScrollToTop />
            <Routes>
              <Route path='/' element={
                <ErrorBoundary>
                  <Hero />
                </ErrorBoundary>
              } />
              <Route path="/travel-packages" element={<TravelPackagesPage />} />
              <Route path='/Available' element={<Available />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/trip' element={<Trip />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/bestrides' element={<BestRides />} />
              <Route path='/policy' element={<InfoPage />} />
              <Route path='/rules' element={<Rules />} />
              <Route path='/under-construction' element={<UnderConstruction />} />
              <Route path='/contactUs' element={<Navigate to='/contact' replace />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/payment' element={<PaymentOptions />} />
              <Route path='/track' element={<Track />} />
              <Route path='/luxury' element={<RoyalHaryanaTourism />} />
              <Route path='/donate' element={<DonatePage />} />
              <Route path='/services' element={<Services />} />
              <Route path='/travellocations' element={<TravelLocation />} />
              <Route path='/helpline' element={<HelpLinePage />} />
              <Route path='/schedule' element={<Timetable />} />
              <Route path='/reviews' element={<Review />} />
              <Route path='/affiliate' element={<AffiliateProgram />} />
              <Route path='/card' element={<BusCard />} />
              <Route path='/guide' element={<Tutorial />} />
              <Route path='/tour-guide' element={<TourGuidePage />} />
              <Route path='/booking' element={<BookingPage />} />
              <Route path='/smart-route' element={<SmartRoute />} />
              <Route path='/login' element={<Login />} />
              <Route path='/mybookings' element={<Userprofile />} />
              <Route path='/yash' element={<h1>Yash's Page</h1>} />
              <Route path='/toast-test' element={<ToastTest />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            
            <Footer />
            <ScrollButton />
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Router>
        </LanguageProvider>
      </BusProvider>
    </ThemeWrapper>
  );
}

// Main render
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </ClerkProvider>
  </React.StrictMode>
);

console.log('App started successfully');