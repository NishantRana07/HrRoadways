import React, { useState, useEffect } from 'react';
import { CreditCard, CreditCardIcon, Wallet, ShieldCheck, QrCode, CheckCircle } from 'lucide-react';
import Loading from './Loading';

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const translationsUrl =
    "https://jsonblob.com/api/jsonBlob/1398993915750834176";

  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
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

  // Diagnostic logging
  useEffect(() => {
    console.log('Payment Component Mounted');
    console.log('Selected Payment Method:', selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  const currentLanguage = useTranslation(isHindi);

  const paymentMethods = [
    { 
      id: 'credit', 
      icon: CreditCard, 
      title: currentLanguage?.creditCard, 
      description: currentLanguage?.creditCardDesc 
    },
    { 
      id: 'debit', 
      icon: CreditCardIcon, 
      title: currentLanguage?.debitCard, 
      description: currentLanguage?.debitCardDesc 
    },
    { 
      id: 'upi', 
      icon: QrCode, 
      title: currentLanguage?.upi, 
      description: currentLanguage?.upiDesc 
    },
    { 
      id: 'wallet', 
      icon: Wallet, 
      title: currentLanguage?.wallet, 
      description: currentLanguage?.walletDesc 
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
    switch(selectedPaymentMethod?.id) {
      case 'credit':
      case 'debit':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md payment-form">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
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
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{currentLanguage.expiryDate}</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                    placeholder="MM/YY"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">{currentLanguage.cvv}</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    placeholder="123"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md payment-form">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {currentLanguage.upiPayment}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{currentLanguage.upiId}</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <QrCode className="mr-2 text-blue-500" size={20} />
                {currentLanguage.scanQrCode}
              </div>
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md payment-form">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {currentLanguage.digitalWallets}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
                <div 
                  key={wallet} 
                  className="p-4 text-center transition border rounded-lg cursor-pointer wallet-option hover:bg-gray-50"
                >
                  {wallet}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentLanguage) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-100 payment-container dark:bg-gray-950 dark:text-white">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white shadow-lg rounded-xl">
        <div className="md:flex">
          {/* Payment methods sidebar */}
          <div className="p-6 border-r md:w-1/3 bg-gray-50">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              {currentLanguage.paymentMethods}
            </h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method)}
                  className={`payment-method-item flex items-center p-4 rounded-lg cursor-pointer transition ${
                    selectedPaymentMethod?.id === method.id 
                      ? 'bg-blue-100 border-blue-500 border' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <method.icon className={`mr-4 ${
                    selectedPaymentMethod?.id === method.id 
                      ? 'text-blue-600' 
                      : 'text-gray-600'
                  }`} size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment form area */}
          <div className="p-8 md:w-2/3">
            {selectedPaymentMethod ? (
              renderPaymentForm()
            ) : (
              <div className="py-12 text-center text-gray-500">
                <ShieldCheck className="mx-auto mb-4 text-blue-500" size={48} />
                <p>{currentLanguage.selectPaymentMethod}</p>
              </div>
            )}

            {selectedPaymentMethod && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-xl font-bold text-gray-800">
                  {currentLanguage.totalPayable}: ₹2,500
                </div>
                <button 
                  className="flex items-center px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <CheckCircle className="mr-2" size={20} />
                  {currentLanguage.confirmPayment}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security footer */}
        <div className="flex items-center justify-center p-4 text-blue-800 bg-blue-50">
          <ShieldCheck className="mr-2" size={20} />
          <span>{currentLanguage.safeSecure}</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentOptions;