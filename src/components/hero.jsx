import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle, Info, ArrowRight, Bus, Phone, Star, Shield } from 'lucide-react';

const CustomAlert = ({ type, children }) => (
  <div className={`p-4 rounded-lg flex items-center gap-3 ${
    type === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
  }`}>
    {type === 'warning' ? 
      <AlertCircle className="w-5 h-5" /> : 
      <Info className="w-5 h-5" />}
    <p className="text-sm">{children}</p>
  </div>
);

const CustomCard = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-blue-200 ${className}`}>
    {children}
  </div>
);

const popularRoutes = [
  { src: 'Chandigarh', dest: 'Delhi', time: '2h 30m', fare: '₹450', frequency: 'Every 30 mins' },
  { src: 'Gurugram', dest: 'Panipat', time: '1h 45m', fare: '₹250', frequency: 'Every 45 mins' },
  { src: 'Faridabad', dest: 'Hisar', time: '3h', fare: '₹500', frequency: 'Every hour' },
  { src: 'Rohtak', dest: 'Ambala', time: '2h 15m', fare: '₹350', frequency: 'Every hour' }
];

const busStands = [
  'Chandigarh', 'Delhi', 'Gurugram', 'Panipat', 'Hisar',
  'Rohtak', 'Ambala', 'Faridabad', 'Karnal', 'Kurukshetra'
];

const features = [
  { icon: Shield, title: 'Safe Travel', desc: 'GPS tracked buses' },
  { icon: Clock, title: 'Punctual', desc: '98% on-time arrival' },
  { icon: Star, title: 'Top Rated', desc: '4.5/5 user rating' },
  { icon: Phone, title: '24/7 Support', desc: 'Always here to help' }
];

const Hero = ({ isHindi = false }) => {
  const [selectedBusType, setSelectedBusType] = useState('all');
  const [formData, setFormData] = useState({
    src: '',
    dest: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1
  });
  const [filteredStands, setFilteredStands] = useState([]);
  const [showSrcSuggestions, setShowSrcSuggestions] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const translations = {
    en: {
      heading: "Haryana Roadways - Your Own Bus Service",
      subheading: "Your Journey, Our Pride | आपकी यात्रा, हमारा गौरव",
      departure: "From",
      arrival: "To",
      button: "Search Buses",
      popular: "Popular Routes",
      allBuses: "All Buses",
      volvo: "Volvo AC",
      superExpress: "Super Express",
      ordinary: "Ordinary",
      searchPlaceholder: "Search bus stands..."
    },
    hi: {
      heading: "हरियाणा रोडवेज - आपकी अपनी बस सेवा",
      subheading: "आपकी यात्रा, हमारा गौरव",
      departure: "कहाँ से",
      arrival: "कहाँ तक",
      button: "बसें खोजें",
      popular: "लोकप्रिय मार्ग",
      allBuses: "सभी बसें",
      volvo: "वोल्वो एसी",
      superExpress: "सुपर एक्सप्रेस",
      ordinary: "साधारण",
      searchPlaceholder: "बस स्टैंड खोजें..."
    }
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

  useEffect(() => {
    setAlerts([
      { type: 'info', message: 'Extra buses available on Delhi-Chandigarh route' },
      { type: 'warning', message: 'Weather alert: Fog expected in northern Haryana' }
    ]);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'src') {
      const filtered = busStands.filter(stand => 
        stand.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStands(filtered);
      setShowSrcSuggestions(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/70" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">{currentLanguage.heading}</h1>
          <p className="text-2xl text-blue-100">{currentLanguage.subheading}</p>
        </div>
      </div>

      <div className="bg-blue-900 text-white py-4 border-t border-blue-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <feature.icon className="w-8 h-8 text-blue-300" />
                <div>
                  <div className="font-semibold">{feature.title}</div>
                  <div className="text-sm text-blue-200">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <CustomCard className="md:col-span-2 p-6">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-blue-900">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {currentLanguage.departure}
                  </label>
                  <input
                    type="text"
                    name="src"
                    value={formData.src}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-200"
                    placeholder={currentLanguage.searchPlaceholder}
                  />
                  {showSrcSuggestions && (
                    <div className="absolute z-20 w-full bg-white border-2 border-blue-200 rounded-lg mt-1 shadow-lg">
                      {filteredStands.map((stand) => (
                        <div
                          key={stand}
                          className="p-3 hover:bg-blue-50 cursor-pointer"
                          onClick={() => {
                            setFormData({ ...formData, src: stand });
                            setShowSrcSuggestions(false);
                          }}
                        >
                          {stand}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-blue-900">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {currentLanguage.arrival}
                  </label>
                  <input
                    type="text"
                    name="dest"
                    value={formData.dest}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-200"
                    placeholder={currentLanguage.searchPlaceholder}
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-blue-900">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-2 text-blue-900">
                    <Users className="inline w-4 h-4 mr-1" />
                    Passengers
                  </label>
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-200"
                    min="1"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex gap-4 flex-wrap">
                  {['all', 'volvo', 'superExpress', 'ordinary'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedBusType(type)}
                      className={`flex-1 p-3 rounded-lg border-2 transition ${
                        selectedBusType === type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-blue-200 hover:border-blue-300'
                      }`}
                    >
                      <Bus className="w-5 h-5 mx-auto mb-2" />
                      {currentLanguage[type]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="md:col-span-2 w-full bg-blue-800 text-white py-4 rounded-lg hover:bg-blue-900 transition font-semibold text-lg shadow-lg"
              >
                {currentLanguage.button}
              </button>
            </form>
          </CustomCard>

          <div className="space-y-6">
            <CustomCard className="p-4">
              <h3 className="font-semibold mb-4 text-blue-900 text-lg border-b border-blue-100 pb-2">
                {currentLanguage.popular}
              </h3>
              <div className="space-y-3">
                {popularRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition border border-blue-100 hover:border-blue-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{route.src}</span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{route.dest}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{route.time}</span>
                      <span>{route.fare}</span>
                      <span>{route.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CustomCard>

            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <CustomAlert key={index} type={alert.type}>
                  {alert.message}
                </CustomAlert>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;