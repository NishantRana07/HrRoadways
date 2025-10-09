import React, { useState, useEffect, useRef } from "react";
import { Heart, Bus, CreditCard, CheckCircle, Clock, Users } from "lucide-react";
import Loading from "./Loading";
import useTranslation from "../hooks/useTranslation";

const QRCode = "https://i.postimg.cc/Y0Zv8SGc/HR-QR.png";

const Donate = ({ isHindi }) => {
  const { t, loading } = useTranslation(isHindi);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Validation Logic
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Full name is required.";
        else if (value.trim().length < 3)
          error = "Name must be at least 3 characters long.";
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email address.";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required.";
        else if (!/^[0-9]{10}$/.test(value))
          error = "Enter a valid 10-digit mobile number.";
        break;
      case "amount":
        if (!value.trim()) error = "Donation amount is required.";
        else if (isNaN(value) || Number(value) <= 0)
          error = "Enter a valid positive amount.";
        break;
      case "paymentMethod":
        if (!value.trim()) error = "Please select a payment method.";
        break;
      case "message":
        if (value.trim() && value.length < 10)
          error = "Message should be at least 10 characters.";
        break;
      default:
        break;
    }

    return error;
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ✅ Handle Submit
  const handleDonate = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasError = false;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      console.log("✅ Donation submitted:", formData);
      setDonated(true);

      setTimeout(() => {
        setDonated(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          amount: "",
          paymentMethod: "",
          message: "",
        });
      }, 3000);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="py-10 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800">{t("headerTitle")}</h2>
        <p className="text-gray-600 mt-2">{t("headerSubtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* QR and Info */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <img src={QRCode} alt="QR Code" className="w-64 h-auto mx-auto mb-4" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle />
              <span>{t("verifiedDonation")}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Clock />
              <span>{t("instantProcessing")}</span>
            </div>
            <div className="flex items-center gap-2 text-orange-600">
              <Users />
              <span>{t("communitySupport")}</span>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <form
          onSubmit={handleDonate}
          className="bg-white shadow-md rounded-2xl p-6 space-y-4 text-black dark:bg-gray-950 dark:text-white"
          noValidate
        >
          {/* Full Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("fullName")}
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("fullName")}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("email")}
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("email")}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("phoneNumber")}
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("phoneNumber")}
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("amount")}
            </label>
            <input
              name="amount"
              type="number"
              min="1"
              value={formData.amount}
              onChange={handleChange}
              placeholder="₹100"
              className={`w-full border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("paymentMethod")}
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className={`w-full border ${
                errors.paymentMethod ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">{t("selectMethod") || "Select Method"}</option>
              <option value="upi">{t("upi")}</option>
              <option value="card">{t("card")}</option>
              <option value="netbanking">{t("netBanking")}</option>
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("message")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("shareMessage")}
              className={`w-full border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <CreditCard className="inline mr-2" size={18} />
            {t("donateButton")}
          </button>

          {donated && (
            <div className="text-center text-green-600 font-medium mt-4">
              <p>{t("thankYou")}</p>
              <p>{t("thankYouMessage")} example@email.com</p>
            </div>
          )}
        </form>
      </div>

      {/* Impact + Support */}
      <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center">
        <div>
          <Bus className="mx-auto text-blue-600" size={32} />
          <p className="text-lg font-semibold mt-2">{t("maintainedMonthly")}</p>
        </div>
        <div>
          <Users className="mx-auto text-green-600" size={32} />
          <p className="text-lg font-semibold mt-2">{t("servedDaily")}</p>
        </div>
        <div>
          <Clock className="mx-auto text-orange-600" size={32} />
          <p className="text-lg font-semibold mt-2">{t("roundTheClock")}</p>
        </div>
      </div>

      {/* Tax Benefits */}
      <div className="mt-10 bg-yellow-100 p-4 rounded-xl text-center">
        <p className="font-medium text-yellow-800">{t("taxBenefitsMessage")}</p>
      </div>
    </section>
  );
};

export default Donate;
