// src/services/newsletterService.js

/**
 * Subscribe a user to the newsletter
 * @param {string} email - user's email
 * @returns {Promise<Object>} response object with success or error
 */
export async function subscribeNewsletter(email) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    // Optional: basic email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Backend API endpoint
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Subscription failed");
    }

    return { success: true, message: data.message || "Subscribed successfully!" };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
