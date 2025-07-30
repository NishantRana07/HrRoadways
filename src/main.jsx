import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n'

const root = createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>
)

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}

