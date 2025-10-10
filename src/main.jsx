import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App';
import './index.css';
import './i18n';
import "leaflet/dist/leaflet.css";


// ✅ Newsletter global CSS (agar footer ke liye alag CSS file ho)
import './styles/footer.css'; // ✅ Added for Newsletter

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Add error boundary for debugging
class ErrorBoundary extends React.Component {
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
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ErrorBoundary>
        {/* ✅ Wrap App with Newsletter Context if needed */}
         <NewsletterProvider> 
        <App />
         </NewsletterProvider> 
      </ErrorBoundary>
    </ClerkProvider>
  </React.StrictMode>
);

// Register Service Worker (disabled for debugging)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then(registration => {
//         console.log('Service Worker registered: ', registration);
//       })
//       .catch(error => {
//         console.log('Service Worker registration failed: ', error);
//       });
//   });
// }

