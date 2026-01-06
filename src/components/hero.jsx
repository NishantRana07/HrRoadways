// src/components/hero.jsx
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Users, MapPin, ArrowRightLeft, Loader2, AlertCircle } from 'lucide-react';
import { useBusContext } from '../contexts/BusContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const navigate = useNavigate();
  const { searchBuses, isLoading } = useBusContext();
  const { currentLanguage } = useLanguage();
  
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
    roundTrip: false
  });

  const [errors, setErrors] = useState({
    from: '',
    to: ''
  });
  
  const [isFormValid, setIsFormValid] = useState(false);

  // Real-time validation
  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'from' || name === 'to') {
      const trimmedValue = value.trim();
      
      if (!trimmedValue) {
        error = currentLanguage.hero?.fieldRequired || 'This field is required';
      } else if (trimmedValue.length < 2) {
        error = currentLanguage.hero?.minChars || 'Must be at least 2 characters';
      } else if (trimmedValue.length > 50) {
        error = currentLanguage.hero?.maxChars || 'Maximum 50 characters allowed';
      } else if (!/^[a-zA-Z\s\-.,]+$/.test(trimmedValue)) {
        error = currentLanguage.hero?.invalidChars || 'Only letters, spaces, hyphens, commas and periods allowed';
      }
      
      // Check if source and destination are same
      if (name === 'to' && trimmedValue.toLowerCase() === formData.from.trim().toLowerCase() && trimmedValue) {
        error = currentLanguage.hero?.sameLocation || 'Destination cannot be same as departure';
      }
      if (name === 'from' && trimmedValue.toLowerCase() === formData.to.trim().toLowerCase() && trimmedValue) {
        error = currentLanguage.hero?.sameLocation || 'Departure cannot be same as destination';
      }
    }
    
    return error;
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Validate the changed field
    if (name === 'from' || name === 'to') {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Validate entire form
  const validateForm = () => {
    const fromError = validateField('from', formData.from);
    const toError = validateField('to', formData.to);
    
    const newErrors = {
      from: fromError,
      to: toError
    };
    
    setErrors(newErrors);
    
    // Form is valid if no errors and both fields have content
    const isValid = !fromError && !toError && 
                    formData.from.trim() && 
                    formData.to.trim();
    setIsFormValid(isValid);
    
    return isValid;
  };

  // Update form validity when data changes
  useEffect(() => {
    validateForm();
  }, [formData.from, formData.to]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Final validation before submission
    if (!validateForm()) {
      // Focus on first error field
      if (errors.from) {
        document.getElementsByName('from')[0]?.focus();
      } else if (errors.to) {
        document.getElementsByName('to')[0]?.focus();
      }
      return;
    }

    // Ensure source and destination are not same (final check)
    if (formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()) {
      setErrors(prev => ({
        ...prev,
        to: currentLanguage.hero?.sameLocation || 'Destination cannot be same as departure'
      }));
      document.getElementsByName('to')[0]?.focus();
      return;
    }

    await searchBuses(formData);
    navigate('/Available');
  };

  const swapLocations = () => {
    const newFrom = formData.to;
    const newTo = formData.from;
    
    setFormData(prev => ({
      ...prev,
      from: newFrom,
      to: newTo
    }));

    // Swap errors too
    setErrors(prev => ({
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage.hero?.title || 'Travel Across Haryana'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {currentLanguage.hero?.subtitle || 'Book comfortable, affordable bus tickets with Haryana Roadways'}
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 mb-10">
            <form onSubmit={handleSearch} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                {/* From Location */}
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {currentLanguage.hero?.from || 'From'}
                      <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      placeholder={currentLanguage.hero?.fromPlaceholder || 'Enter departure city'}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.from 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all`}
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.from}
                      aria-describedby={errors.from ? 'from-error' : undefined}
                    />
                    {errors.from && (
                      <div className="absolute right-3 top-3 text-red-500">
                        <AlertCircle size={20} />
                      </div>
                    )}
                  </div>
                  {errors.from && (
                    <p id="from-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.from}
                    </p>
                  )}
                </div>

                {/* Swap Button (Centered) */}
                <div className="lg:col-span-1 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={swapLocations}
                    disabled={isLoading || !formData.from.trim() || !formData.to.trim()}
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
                    title={currentLanguage.hero?.swap || 'Swap locations'}
                  >
                    <ArrowRightLeft size={20} />
                  </button>
                </div>

                {/* To Location */}
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {currentLanguage.hero?.to || 'To'}
                      <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      placeholder={currentLanguage.hero?.toPlaceholder || 'Enter destination city'}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.to 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all`}
                      required
                      disabled={isLoading}
                      aria-invalid={!!errors.to}
                      aria-describedby={errors.to ? 'to-error' : undefined}
                    />
                    {errors.to && (
                      <div className="absolute right-3 top-3 text-red-500">
                        <AlertCircle size={20} />
                      </div>
                    )}
                  </div>
                  {errors.to && (
                    <p id="to-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.to}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {currentLanguage.hero?.date || 'Date'}
                    </div>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>

                {/* Passengers */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {currentLanguage.hero?.passengers || 'Passengers'}
                    </div>
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-1 flex items-end">
                  <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none flex items-center justify-center gap-2"
                    aria-disabled={!isFormValid}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>{currentLanguage.hero?.searching || 'Searching...'}</span>
                      </>
                    ) : (
                      <>
                        <Search size={20} />
                        <span>{currentLanguage.hero?.search || 'Search'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Validation Summary (optional) */}
              {(!isFormValid && (formData.from || formData.to)) && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {currentLanguage.hero?.validationHint || 'Please fix the errors above to search for buses'}
                  </p>
                </div>
              )}

              {/* Round Trip Checkbox */}
              <div className="mt-6 flex items-center">
                <input
                  type="checkbox"
                  id="roundTrip"
                  name="roundTrip"
                  checked={formData.roundTrip}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={isLoading}
                />
                <label htmlFor="roundTrip" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {currentLanguage.hero?.roundTrip || 'Round Trip'}
                </label>
              </div>
            </form>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600 dark:text-blue-400 text-2xl">🚌</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {currentLanguage.hero?.feature1Title || 'Comfortable Travel'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage.hero?.feature1Desc || 'AC & Non-AC buses with modern amenities'}
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-green-600 dark:text-green-400 text-2xl">💰</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {currentLanguage.hero?.feature2Title || 'Affordable Prices'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage.hero?.feature2Desc || 'Best prices guaranteed across all routes'}
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-purple-600 dark:text-purple-400 text-2xl">🔒</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {currentLanguage.hero?.feature3Title || 'Safe & Secure'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage.hero?.feature3Desc || '24/7 customer support and secure bookings'}
              </p>
            </div>
          </div>

          {/* Popular Routes */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              {currentLanguage.hero?.popularRoutes || 'Popular Routes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { from: 'Chandigarh', to: 'Delhi', price: '₹450' },
                { from: 'Ambala', to: 'Hisar', price: '₹350' },
                { from: 'Kurukshetra', to: 'Rohtak', price: '₹280' },
                { from: 'Gurugram', to: 'Karnal', price: '₹320' },
              ].map((route, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isLoading) {
                      setFormData({
                        ...formData,
                        from: route.from,
                        to: route.to
                      });
                    }
                  }}
                  disabled={isLoading}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-shadow text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {route.from} → {route.to}
                    </h3>
                    <span className="text-green-600 font-semibold">{route.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentLanguage.hero?.routeDesc || 'Daily buses available'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {currentLanguage.hero?.ctaTitle || 'Why Choose Haryana Roadways?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {currentLanguage.hero?.ctaDesc || 'With over 50 years of service, we provide the most reliable and comfortable bus services across Haryana and neighboring states.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/about')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {currentLanguage.hero?.learnMore || 'Learn More'}
              </button>
              <button
                onClick={() => navigate('/trip')}
                className="px-6 py-3 bg-transparent border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors font-medium"
              >
                {currentLanguage.hero?.viewTrips || 'View All Trips'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;