// Backend/src/controllers/newsletterController.js

import Newsletter from "../models/newsletterModel.js";

/**
 * Add a new email to newsletter list
 * POST /api/newsletter/subscribe
 */
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Check if email already exists
    const existingEmail = await Newsletter.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "This email is already subscribed." });
    }

    // Save new email
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    return res
      .status(201)
      .json({ message: "Successfully subscribed to newsletter." });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

/**
 * Get all newsletter subscribers
 * GET /api/newsletter
 */
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({});
    return res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
