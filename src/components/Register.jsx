import React, { useState } from "react";
import { useModalStore, useAuthStore } from "../store/store"; // Assuming these paths are correct
import { useTranslation } from "react-i18next";

function Register() {
  const { modalType, openModal, closeModal } = useModalStore();
  const { login } = useAuthStore();
  const { t } = useTranslation();

  const [name, setName] = useState(""); // Corrected typo setNamea to setName
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (modalType !== "register") return null;

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate user creation and login
    login({
      name,
      email,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl mx-auto flex overflow-hidden">
        {/* Left Section: Refer & Earn Image */}
        <div className="w-1/2 bg-red-50 relative flex items-center justify-center p-8 rounded-l-2xl">
          <img
            src="http://googleusercontent.com/file_content/0" // Use the image URL you provided
            alt="Refer & Earn"
            className="w-full h-auto object-contain" // Ensure image fits well
          />
        </div>

        {/* Right Section: Registration Form */}
        <div className="w-1/2 p-8 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            &times;
          </button>
          <div className="flex justify-center mb-6">
            {/* RedBus-like logo/text placeholder */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D32F2F"/>
              <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="#D32F2F"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-6 text-neutral-900 text-center uppercase tracking-wide">
            {t("register.title") || "REGISTER"} {/* Use "REGISTER" as default if translation not found */}
          </h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder={t("register.namePlaceholder") || "Enter your name"}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-neutral-400 placeholder:font-normal text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder={t("register.emailPlaceholder") || "Enter your email"}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-neutral-400 placeholder:font-normal text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder={t("register.passwordPlaceholder") || "Enter your password"}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-neutral-400 placeholder:font-normal text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition duration-300 font-semibold text-lg"
            >
              {t("register.button") || "REGISTER"}
            </button>
          </form>

          {/* Google Sign-in Button (for UI only) */}
          <div className="mt-4">
            <button className="w-full flex items-center justify-center border border-gray-300 bg-white text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition duration-200">
              <img
                src="https://www.gstatic.com/images/icons/material/system/2x/btn_google_light_normal_ios_96dp.png" // Google icon
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>
          </div>

          <p className="flex justify-center items-center text-neutral-900 gap-2 mt-4 text-sm">
            {t("register.prompt") || "Already have an account?"}{" "}
            <span
              className="text-red-600 cursor-pointer hover:underline font-medium"
              onClick={() => openModal("login")}
            >
              {t("register.loginLink") || "Login here"}
            </span>
          </p>

          <p className="text-center text-xs text-gray-500 mt-6">
            By signing up, I agree to the{" "}
            <a href="#" className="text-red-600 hover:underline">
              Terms & Conditions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;