import React, { useState, useEffect } from 'react';
import { CreditCard, CreditCardIcon, Wallet, ShieldCheck, QrCode, CheckCircle } from 'lucide-react';

const translations = {
  en: {
    paymentMethods: "Payment Methods",
    paymentMethodsDesc: "Select a payment method to proceed",
    creditCard: "Credit Card",
    creditCardDesc: "Pay securely with your credit card",
    debitCard: "Debit Card",
    debitCardDesc: "Use your bank debit card",
    upi: "UPI",
    upiDesc: "Quick and instant payment",
    wallet: "Digital Wallet",
    walletDesc: "Pay using mobile wallets",
    cardNumber: "Card Number",
    cardName: "Name on Card",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    upiId: "UPI ID",
    scanQrCode: "Scan QR code with your UPI app",
    digitalWallets: "Digital Wallets",
    totalPayable: "Total Payable",
    confirmPayment: "Confirm Payment",
    safeSecure: "100% Safe & Secure Payment",
    cardDetails: "Card Details",
    upiPayment: "UPI Payment",
    selectPaymentMethod: "Select a payment method to proceed"
  },
  hi: {
    paymentMethods: "भुगतान विधियाँ",
    paymentMethodsDesc: "आगे बढ़ने के लिए भुगतान विधि चुनें",
    creditCard: "क्रेडिट कार्ड",
    creditCardDesc: "अपने क्रेडिट कार्ड से सुरक्षित रूप से भुगतान करें",
    debitCard: "डेबिट कार्ड",
    debitCardDesc: "अपने बैंक डेबिट कार्ड का उपयोग करें",
    upi: "यूपीआई",
    upiDesc: "त्वरित और तत्काल भुगतान",
    wallet: "डिजिटल वॉलेट",
    walletDesc: "मोबाइल वॉलेट का उपयोग करके भुगतान करें",
    cardNumber: "कार्ड नंबर",
    cardName: "कार्ड पर नाम",
    expiryDate: "समाप्ति तिथि",
    cvv: "सीवीवी",
    upiId: "यूपीआई आईडी",
    scanQrCode: "अपने यूपीआई ऐप से क्यूआर कोड स्कैन करें",
    digitalWallets: "डिजिटल वॉलेट्स",
    totalPayable: "कुल देय",
    confirmPayment: "भुगतान की पुष्टि करें",
    safeSecure: "100% सुरक्षित और सुरक्षित भुगतान",
    cardDetails: "कार्ड विवरण",
    upiPayment: "यूपीआई भुगतान",
    selectPaymentMethod: "आगे बढ़ने के लिए भुगतान विधि चुनें"
  }
};

const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const translationsUrl = 'https://jsonblob.com/api/jsonBlob/1338200675141738496';

  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
        setCurrentLanguage(isHindi ? translations.hi : translations.en); // Fallback
      });
  }, [isHindi]);

  return currentLanguage;
};



const PaymentOptions = ({ isHindi }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    console.log('Payment Component Mounted');
    console.log('Selected Payment Method:', selectedPaymentMethod);
  }, [selectedPaymentMethod]);

const currentLanguage = useTranslation(isHindi) || translations[isHindi ? 'hi' : 'en'];

const paymentMethods = [
  { 
    id: 'credit', 
    icon: CreditCard, 
    title: currentLanguage?.creditCard || "Credit Card", 
    description: currentLanguage?.creditCardDesc || "Pay securely with your credit card" 
  },
  { 
    id: 'debit', 
    icon: CreditCardIcon, 
    title: currentLanguage?.debitCard || "Debit Card", 
    description: currentLanguage?.debitCardDesc || "Use your bank debit card" 
  },
  { 
    id: 'upi', 
    icon: QrCode, 
    title: currentLanguage?.upi || "UPI", 
    description: currentLanguage?.upiDesc || "Quick and instant payment" 
  },
  { 
    id: 'wallet', 
    icon: Wallet, 
    title: currentLanguage?.wallet || "Digital Wallet", 
    description: currentLanguage?.walletDesc || "Pay using mobile wallets" 
  }
];

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderPaymentForm = () => {
    return (
      <div className="payment-form bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out animate-fadeIn">
        {selectedPaymentMethod?.id === 'credit' || selectedPaymentMethod?.id === 'debit' ? (
          <>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {currentLanguage.cardDetails}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{currentLanguage.cardNumber}</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  placeholder="1234 5678 9012 3456"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{currentLanguage.cardName}</label>
                <input
                  type="text"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardDetailsChange}
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{currentLanguage.expiryDate}</label>
                  <input type="text" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardDetailsChange} placeholder="MM/YY" className="input-field"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{currentLanguage.cvv}</label>
                  <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardDetailsChange} placeholder="123" className="input-field"/>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  };

  if (!currentLanguage) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="payment-container bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-6 border-r">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {currentLanguage.paymentMethods}
            </h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method)}
                  className={`payment-method-item flex items-center p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 shadow-md ${
                    selectedPaymentMethod?.id === method.id ? 'bg-blue-100 border-blue-500 border' : 'hover:bg-gray-100'
                  }`}
                >
                  <method.icon className={mr-4 ${selectedPaymentMethod?.id === method.id ? 'text-blue-600' : 'text-gray-600'}} size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            {selectedPaymentMethod ? (
              renderPaymentForm()
            ) : (
              <div className="text-center py-12 text-gray-500">
                <ShieldCheck className="mx-auto mb-4 text-blue-500" size={48} />
                <p>{currentLanguage.selectPaymentMethod}</p>
              </div>
            )}

            {selectedPaymentMethod && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">
                  {currentLanguage.totalPayable}: ₹2,500
                </div>
                <button 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl flex items-center"
                >
                  <CheckCircle className="mr-2" size={20} />
                  {currentLanguage.confirmPayment}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 flex items-center justify-center text-blue-800 animate-float">
          <ShieldCheck className="mr-2" size={20} />
          <span>{currentLanguage.safeSecure}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
