// Backend/src/routes/newsletter.js

const express = require('express');
const router = express.Router();

// Import controller
const { subscribeNewsletter } = require('../controllers/newsletterController');

// POST route to subscribe email
// Example endpoint: POST /api/newsletter/subscribe
router.post('/subscribe', subscribeNewsletter);

module.exports = router; 
