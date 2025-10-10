import ScrollButton from './components/ScrollButton';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	Navigate,
} from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/nav';
import Footer from './components/footer';
import Header from './components/Header';
import EcoRoutes from "./components/EcoRoutes";
import BookingPage from './components/BookingPage'; // do not lazy load this
import ThemeWrapper from './components/ThemeWrapper';
// 🟢 Added — Newsletter Subscription Component Import
import NewsletterSubscription from './components/NewsletterSubscription'; 

const Hero = lazy(() => import('./components/hero'));
const Available = lazy(() => import('./components/Available'));
const AboutUs = lazy(() => import('./components/Aboutus'));
const Trip = lazy(() => import('./components/Trip'));
const BestRides = lazy(() => import('./components/BestRides'));
const InfoPage = lazy(() => import('./components/InfoPage'));
const RulesAndGuidelines = lazy(() => import('./components/Rules'));
const UnderConstruction = lazy(() => import('./components/UnderConstruction'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Blog = lazy(() => import('./components/Blog'));
const PaymentOptions = lazy(() => import('./components/Paymentoptions'));
const BusTracker = lazy(() => import('./components/Track'));
const RoyalHaryanaTourism = lazy(() =>
	import('./components/RoyalHaryanaTourism')
);
const ServicesPage = lazy(() => import('./components/Services'));
const TravelLocations = lazy(() => import('./components/TravelLocation'));
const HelplinePage = lazy(() => import('./components/HelpLinepage'));
const Reviews = lazy(() => import('./components/Review'));
const AffiliateProgram = lazy(() => import('./components/AffiliateProgram'));
const BusCard = lazy(() => import('./components/BusCard'));
const Tutorial = lazy(() => import('./components/Tutorial'));
const DonatePage = lazy(() => import('./components/DonatePage'));
const WeeklyTimetable = lazy(() => import('./components/Timetable'));
const TourGuidePage = lazy(() => import('./components/TourGuidePage'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const Login = lazy(() => import('./components/Login'));
// const Register = lazy(() => import('./components/Register')) // no Register component found
// const ForgotPassword = lazy(() => import('./components/ForgotPassword')) // no ForgotPassword component found
const MyBookings = lazy(() => import('./components/Userprofile'));
const NotFound = lazy(() => import('./components/NotFound'));
const ToastTest = lazy(() => import('./components/ToastTest'));
const FaqPage = lazy(() => import('./components/faq'));

function BookingPageWrapper() {
	const location = useLocation();
	const { selectedBus } = (location && location.state) || {};
	return <BookingPage selectedBus={selectedBus} />;
}

function App() {
	return (
		<ThemeWrapper>
			<div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white">


				<LanguageProvider>
					<Router>
						<Header />
						<Navigation />
						<Suspense
							fallback={
								<div style={{ padding: '2rem', textAlign: 'center' }}>
									Loading...
								</div>
							}
						>
							<ScrollToTop />
							<Routes>
								<Route path='/' element={<Hero />} />
								<Route path='/Available' element={<Available />} />
								<Route path='/about' element={<AboutUs />} />
								<Route path='/trip' element={<Trip />} />
								<Route path='/faq' element={<FaqPage />} />{/* Added FAQ route */}
								<Route path='/bestrides' element={<BestRides />} />
								<Route path='/policy' element={<InfoPage />} />
								<Route path='/rules' element={<RulesAndGuidelines />} />
								<Route
									path='/under-construction'
									element={<UnderConstruction />}
								/>
								<Route
									path='/contactUs'
									element={<Navigate to='/contact' replace />}
								/>
								<Route path='/contact' element={<ContactUs />} />
								<Route path='/blog' element={<Blog />} />
								<Route path='/payment' element={<PaymentOptions />} />
								<Route path='/track' element={<BusTracker />} />
								<Route
									path='/luxury'
									element={<RoyalHaryanaTourism />}
								/>
								<Route path='/donate' element={<DonatePage />} />
								<Route path='/services' element={<ServicesPage />} />
								<Route
									path='/travellocations'
									element={<TravelLocations />}
								/>
								<Route path='/helpline' element={<HelplinePage />} />
								<Route path='/schedule' element={<WeeklyTimetable />} />
								<Route path='/reviews' element={<Reviews />} />
								<Route
									path='/affiliate'
									element={<AffiliateProgram />}
								/>
								<Route path='/card' element={<BusCard />} />
								<Route path='/guide' element={<Tutorial />} />
								<Route path='/tour-guide' element={<TourGuidePage />} />
								<Route
									path='/booking'
									element={<BookingPageWrapper />}
								/>
								<Route path='*' element={<NotFound />} />
								<Route path='/login' element={<Login />} />
								{/* <Route path='/register' element={<Register />} /> */} {/* no Register component found */}
								{/* <Route path='/forgot-password' element={<ForgotPassword />} /> */} {/* no ForgotPassword component found */}
								<Route path='/mybookings' element={<MyBookings />} />
								<Route
									path='/yash'
									element={<h1>Yash&apos;s Page</h1>}
								/>
								<Route path='/toast-test' element={<ToastTest />} />
							</Routes>
						</Suspense>

						{/* 🟢 Added Newsletter Section (appears above Footer) */}
						<NewsletterSubscription />
						
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
			</div>
		</ThemeWrapper>
	);
}


export default App;


