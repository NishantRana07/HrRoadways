import { useState, useEffect } from "react";
import {
  Heart,
  Bus,
  CreditCard,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import { QRCode, fourthTranslationURL } from "../constants";
import { predefinedAmounts, recentDonors } from "../data/recentDonors";

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  useEffect(() => {
    fetch(fourthTranslationURL)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error("Error fetching translations:", error);
      });
  }, [isHindi, fourthTranslationURL]);

  return currentLanguage;
};

// Reusable Button Component
const Button = ({ onClick, active, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`py-3 px-4 rounded-lg border text-center transition-all duration-300 hover:scale-105 ${
      active
        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:shadow-md"
    }`}
  >
    {children}
  </button>
);

// Reusable Input Component
const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-300 hover:shadow-lg"
    required={required}
  />
);

// Payment Details Component
const PaymentDetails = ({ paymentMethod, t }) => {
  switch (paymentMethod) {
    case "card":
      return (
        <>
          <Input type="text" placeholder={t.cardNumber} required />
          <div className="grid grid-cols-2 gap-4">
            <Input type="text" placeholder={t.expiryDate} required />
            <Input type="text" placeholder={t.cvv} required />
          </div>
        </>
      );
    case "upi":
      return (
        <>
          <Input type="text" placeholder={t.upiId} required />
          <div className="text-center">
            <img src={QRCode} alt="UPI QR Code" className="mx-auto w-48 h-48" />
          </div>
        </>
      );
    case "netbanking":
      return (
        <>
          <Input type="text" placeholder={t.bankName} required />
          <Input type="text" placeholder={t.accountNumber} required />
        </>
      );
    default:
      return null;
  }
};

const DonatePage = ({ isHindi }) => {
  const t = useTranslation(isHindi);
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    panCard: "",
    message: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isMonthly, setIsMonthly] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount(value.toString());
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setAmount("custom");
  };

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".scroll-element").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add("animate-slide-up");
        } else {
          el.classList.remove("animate-slide-up");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Display a loading state until translations are fetched
  if (!t) {
    return <div>Loading translations...</div>;
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-900 text-white py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
              <Bus size={32} />
              {t.headerTitle}
            </h1>
            <p className="mt-2">{t.headerSubtitle}</p>
          </div>
        </header>
        <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-xl text-center animate-slide-up">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t.thankYou}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.thankYouMessage} {donorInfo.email}.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
          >
            {t.makeAnotherDonation}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>

      <header className="bg-blue-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Bus size={32} />
            {t.headerTitle}
          </h1>
          <p className="mt-2">{t.headerSubtitle}</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 scroll-element">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Heart className="text-red-500 animate-bounce" />
                {t.supportMission}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    {t.selectAmount}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {predefinedAmounts.map((value) => (
                      <Button
                        key={value}
                        onClick={() => handleAmountSelect(value)}
                        active={amount === value}
                      >
                        ₹{value}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      type="number"
                      placeholder={t.customAmount}
                      value={customAmount}
                      onChange={handleCustomAmount}
                      min="50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setIsMonthly(false)}
                    active={!isMonthly}
                  >
                    {t.oneTime}
                  </Button>
                  <Button onClick={() => setIsMonthly(true)} active={isMonthly}>
                    {t.monthly}
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    value={donorInfo.name}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, name: e.target.value })
                    }
                    placeholder={t.fullName}
                    required
                  />
                  <Input
                    type="email"
                    value={donorInfo.email}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, email: e.target.value })
                    }
                    placeholder={t.email}
                    required
                  />
                  <Input
                    type="tel"
                    value={donorInfo.phone}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, phone: e.target.value })
                    }
                    placeholder={t.phoneNumber}
                  />
                  <Input
                    value={donorInfo.panCard}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, panCard: e.target.value })
                    }
                    placeholder={t.panCard}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t.message}
                  </label>
                  <textarea
                    value={donorInfo.message}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, message: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 transition-all duration-200 hover:border-blue-300 hover:shadow-lg"
                    placeholder={t.shareMessage}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    {t.paymentMethod}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      onClick={() => setPaymentMethod("card")}
                      active={paymentMethod === "card"}
                    >
                      <CreditCard size={20} /> {t.card}
                    </Button>
                    <Button
                      onClick={() => setPaymentMethod("upi")}
                      active={paymentMethod === "upi"}
                    >
                      {t.upi}
                    </Button>
                    <Button
                      onClick={() => setPaymentMethod("netbanking")}
                      active={paymentMethod === "netbanking"}
                    >
                      {t.netBanking}
                    </Button>
                  </div>
                </div>
                <PaymentDetails paymentMethod={paymentMethod} t={t} />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Heart size={20} className="animate-bounce" />
                  {t.completeDonation}
                </button>
              </form>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 scroll-element">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t.yourImpact}
              </h3>
              <div className="space-y-4">
                <ImpactItem
                  icon={Bus}
                  title="100+ Buses"
                  description={t.maintainedMonthly}
                />
                <ImpactItem
                  icon={Users}
                  title="50,000+ Passengers"
                  description={t.servedDaily}
                />
                <ImpactItem
                  icon={Clock}
                  title="24/7 Service"
                  description={t.roundTheClock}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 scroll-element">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t.recentSupporters}
              </h3>
              <div className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <Supporter key={index} donor={donor} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 scroll-element">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t.taxBenefits}
              </h3>
              <p className="text-gray-600 text-sm">{t.taxBenefitsMessage}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Impact Item Component
const ImpactItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-center gap-3 group">
    <Icon className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// Supporter Component
const Supporter = ({ donor }) => (
  <div className="border-b last:border-0 pb-3 last:pb-0 transition-all duration-200 hover:bg-gray-50 px-2 rounded">
    <div className="flex justify-between items-start">
      <p className="font-medium">{donor.name}</p>
      <p className="text-blue-600">₹{donor.amount}</p>
    </div>
    <p className="text-sm text-gray-600 mt-1">{donor.message}</p>
  </div>
);

export default DonatePage;
