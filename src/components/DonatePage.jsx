import React, { useState } from 'react';
import { Heart, Bus, CreditCard, Calendar, Mail, CheckCircle, Clock, Users } from 'lucide-react';

const DonatePage = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    panCard: '',
    message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isMonthly, setIsMonthly] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const predefinedAmounts = [100, 500, 1000, 5000];
  const [recentDonors] = useState([
    { name: "Rahul S.", amount: 1000, message: "Keep up the great work!" },
    { name: "Priya M.", amount: 500, message: "Happy to support" },
    { name: "Amit K.", amount: 2000, message: "For better transportation" }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-900 text-white py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
              <Bus size={32} />
              Haryana Roadways
            </h1>
            <p className="mt-2">Your Journey, Our Pride</p>
          </div>
        </header>

        <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Donation!</h2>
          <p className="text-gray-600 mb-6">
            Your generous contribution will help us improve our services and infrastructure.
            A confirmation email has been sent to {donorInfo.email}.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Bus size={32} />
            Haryana Roadways
          </h1>
          <p className="mt-2">Your Journey, Our Pride</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Heart className="text-red-500" />
                Support Our Mission
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Select Donation Amount (INR)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {predefinedAmounts.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleAmountSelect(value)}
                        className={`py-3 px-4 rounded-lg border text-center transition-colors ${
                          amount === value
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        ₹{value}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsMonthly(false)}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                      !isMonthly
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMonthly(true)}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                      isMonthly
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      PAN Card (for tax benefits)
                    </label>
                    <input
                      type="text"
                      value={donorInfo.panCard}
                      onChange={(e) => setDonorInfo({...donorInfo, panCard: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    placeholder="Share why you're supporting us..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
                        paymentMethod === 'card'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      <CreditCard size={20} />
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-3 px-4 rounded-lg border transition-colors ${
                        paymentMethod === 'upi'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`py-3 px-4 rounded-lg border transition-colors ${
                        paymentMethod === 'netbanking'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      Net Banking
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={20} />
                  Complete Donation
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bus className="text-blue-600" />
                  <div>
                    <p className="font-semibold">100+ Buses</p>
                    <p className="text-sm text-gray-600">Maintained monthly</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600" />
                  <div>
                    <p className="font-semibold">50,000+ Passengers</p>
                    <p className="text-sm text-gray-600">Served daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600" />
                  <div>
                    <p className="font-semibold">24/7 Service</p>
                    <p className="text-sm text-gray-600">Round the clock operations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Supporters</h3>
              <div className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{donor.name}</p>
                      <p className="text-blue-600">₹{donor.amount}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{donor.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tax Benefits</h3>
              <p className="text-gray-600 text-sm">
                All donations are eligible for tax deduction under Section 80G of the Income Tax Act.
                You will receive a tax receipt via email.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonatePage;