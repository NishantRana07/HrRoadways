import React, {useState, useEffect,useRef} from "react";
import {Heart, Bus, CreditCard, CheckCircle, Clock, Users} from "lucide-react";
import Loading from "./Loading";
import useTranslation from "../hooks/useTranslation";

const QRCode = "https://i.postimg.cc/Y0Zv8SGc/HR-QR.png"; // Replace with actual QR if needed

const ErrorSection =()=>{
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-lg">
      <p className="font-semibold">Invalild Mobile Number.</p>
    </div>
  );
}

const Donate = ({isHindi}) => {
  const {t, loading} = useTranslation(isHindi);
  const [donated, setDonated] = useState(false);
  const [error, setError] = useState(false);
  const mobileNumber = useRef(null)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDonate = (e) => {
    e.preventDefault();
    if (!mobileNumber.current.value || mobileNumber.current.value.trim().length < 10) {
      setError(true);
      return;
    }
    setError(false);
    setDonated(true);
    setTimeout(() => {
      setDonated(false);
      window.location.reload();
    }, 3000);
  };

  if (loading) return <Loading />;

  return (
    <section className="py-10 px-4 max-w-5xl mx-auto ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800">{t("headerTitle")}</h2>
        <p className="text-gray-600 mt-2">{t("headerSubtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start ">
        {/* QR and info */}
        <div className="bg-white shadow-md rounded-2xl p-6 ">
          <img
            src={QRCode}
            alt="QR Code"
            className="w-64 h-auto mx-auto mb-4"
          />
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

        {/* Form */}
        <form
          onSubmit={handleDonate}
          className="bg-white shadow-md rounded-2xl p-6 space-y-4 text-black dark:bg-gray-950 dark:text-white"
        >
          <div>
            <label className="block font-semibold text-gray-700 mb-1 ">
              {t("fullName")}
            </label>
            <input
              type="text"
              placeholder={t("fullName")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("email")}
            </label>
            <input
              type="email"
              placeholder={t("email")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("phoneNumber")}
            </label>
            <input
              type="tel"
              placeholder={t("phoneNumber")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              ref={mobileNumber}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("amount")}
            </label>
            <input
              type="number"
              placeholder="₹100"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("paymentMethod")}
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="upi">{t("upi")}</option>
              <option value="card">{t("card")}</option>
              <option value="netbanking">{t("netBanking")}</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {t("message")}
            </label>
            <textarea
              placeholder={t("shareMessage")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <CreditCard className="inline mr-2" size={18} />
            {t("donateButton")}
          </button>
          {error && <ErrorSection />}
          {donated && (
            <div className="text-center text-green-600 font-medium">
              <p>{t("thankYou")}</p>
              <p>{t("thankYouMessage")} example@email.com</p>
              <button
                className="mt-2 underline text-blue-700"
                onClick={() => window.location.reload()}
              >
                {t("makeAnotherDonation")}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Impact + Support */}
      <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center ">
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

      {/* Tax benefits */}
      <div className="mt-10 bg-yellow-100 p-4 rounded-xl text-center">
        <p className="font-medium text-yellow-800">{t("taxBenefitsMessage")}</p>
      </div>
    </section>
  );
};

export default Donate;
