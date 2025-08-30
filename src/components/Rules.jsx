import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Shield,
  Clock,
  Ticket,
  Users,
  ShieldAlert,
  Luggage,
  Ban,
  Search,
  AlertTriangle,
  CheckCircle,
  Info,
  Coins,
  User,
  MapIcon
} from 'lucide-react';
import { MdTravelExplore } from 'react-icons/md';

const RulesAndGuidelines = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRules, setExpandedRules] = useState({});
  const [animateIn, setAnimateIn] = useState(false);
  const [filteredRules, setFilteredRules] = useState([]);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Rules', icon: BookOpen, color: 'from-blue-600 to-indigo-600' },
    { id: 'booking', name: 'Booking', icon: Ticket, color: 'from-green-600 to-emerald-600' },
    { id: 'travel', name: 'Travel', icon: Users, color: 'from-purple-600 to-pink-600' },
    { id: 'safety', name: 'Safety', icon: ShieldAlert, color: 'from-red-600 to-rose-600' },
    { id: 'luggage', name: 'Luggage', icon: Luggage, color: 'from-amber-600 to-yellow-600' },
    { id: 'prohibited', name: 'Prohibited', icon: Ban, color: 'from-gray-600 to-slate-600' }
  ];

  const rules = [
    {
      id: 1,
      category: 'booking',
      title: 'Ticket Booking and Cancellation',
      severity: 'high',
      icon: Clock,
      content: [
        'Tickets must be booked at least 30 minutes before departure',
        'Cancellation charges apply based on timing:',
        '- 24+ hours: 10% of fare',
        '- 12-24 hours: 25% of fare',
        '- 6-12 hours: 50% of fare',
        '- Less than 6 hours: No refund',
        'Senior citizens (60+) get 10% discount with valid ID'
      ],
      important: true,
      actionRequired: true
    },
    {
      id: 2,
      category: 'safety',
      title: 'COVID-19 Safety Protocols',
      severity: 'high',
      icon: ShieldAlert,
      content: [
        'Masks are mandatory throughout the journey',
        'Temperature screening at boarding points',
        'Sanitization of hands before boarding',
        'Maintaining social distancing while boarding/deboarding',
        'Buses sanitized after each trip',
        'Passengers with symptoms will not be allowed to travel',
        'Download Aarogya Setu app recommended'
      ],
      important: true,
      actionRequired: true
    },
    {
      id: 3,
      category: 'luggage',
      title: 'Baggage Rules',
      severity: 'medium',
      icon: Luggage,
      content: [
        'Free baggage allowance: 15kg per passenger',
        'Extra baggage charges: ₹20 per kg',
        'Maximum dimensions: 30x20x10 inches',
        'Valuable items must be declared',
        'Fragile items carried at passenger risk',
        'No responsibility for untagged luggage',
        'Luggage must be claimed within 24 hours'
      ],
      important: true,
      actionRequired: false
    },
    {
      id: 4,
      category: 'prohibited',
      title: 'Prohibited Items',
      severity: 'high',
      icon: Ban,
      content: [
        'Flammable materials and explosives',
        'Weapons and sharp objects',
        'Illegal substances and drugs',
        'Live animals (except service animals)',
        'Perishable items',
        'Hazardous chemicals',
        'Oversized packages exceeding size limits'
      ],
      important: true,
      actionRequired: true
    },
    {
      id: 5,
      category: 'special',
      title: 'Special Assistance',
      severity: 'medium',
      icon: Luggage,
      content: [
        'Wheelchair assistance available at major stations',
        'Priority seating for elderly and disabled',
        'Special assistance for pregnant women',
        'Guide dogs allowed for visually impaired',
        'Request assistance 24 hours in advance',
        'Medical emergency contact points at stations',
        'Special needs must be declared during booking'
      ],
      important: true,
      actionRequired: false
    },
    {
      id: 6,
      category: 'payments',
      title: 'Payment Guidelines',
      severity: 'medium',
      icon: Coins,
      content: [
        'Online payments through authorized platforms only',
        'Cash payments accepted at counters',
        'UPI payments accepted',
        'No foreign currency accepted',
        'Monthly pass payments by 5th of each month',
        'Receipt mandatory for all transactions',
        'Refunds processed within 7 working days'
      ],
      important: true,
      actionRequired: false
    },
    {
      id: 7,
      category: 'conduct',
      title: 'Passenger Code of Conduct',
      severity: 'medium',
      icon: User,
      content: [
        'No smoking inside buses',
        'No consumption of alcohol',
        'Maintain cleanliness',
        'Follow staff instructions',
        'No playing loud music',
        'No harassment of co-passengers',
        'Respect reserved seating arrangements'
      ],
      important: true,
      actionRequired: false
    },
    {
      id: 8,
      category: 'routes',
      title: 'Route Operations',
      severity: 'medium',
      icon: MapIcon,
      content: [
        'Check route updates before travel',
        'Buses stop only at designated stops',
        'Route diversions announced 24 hours prior',
        'No mid-route boarding in express services',
        'Night service routes have limited stops',
        'Route maps available at all stations',
        'GPS tracking enabled on all buses'
      ],
      important: true,
      actionRequired: false
    },
    {
      id: 9,
      category: 'travel',
      title: 'Travel Documentation',
      severity: 'high',
      icon: MdTravelExplore,
      content: [
        'Valid ID proof mandatory for all passengers',
        'Physical or digital ticket must be carried',
        'Student concession cards must be current',
        'Senior citizen cards for discount',
        'Monthly pass holders must carry passes',
        'Insurance documents for valuable baggage',
        'Medical certificates for specific conditions'
      ],
      important: true,
      actionRequired: true
    },
    {
      id: 10,
      category: 'safety',
      title: 'Emergency Procedures',
      severity: 'high',
      icon: AlertTriangle,
      content: [
        'Emergency exits marked in all buses',
        'First aid kits available with conductor',
        'Emergency contact numbers displayed',
        'Follow evacuation procedures when announced',
        'Report suspicious items to staff',
        'Emergency stops only at designated points',
        'Safety instructions in multiple languages'
      ],
      important: true,
      actionRequired: true
    },
  ];
  const filterRules = () => {
    return rules.filter(rule => {
      const matchesSearch = rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.content.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = activeCategory === 'all' || rule.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  };

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const toggleExpand = (ruleId) => {
    setExpandedRules(prevState => ({
      ...prevState,
      [ruleId]: !prevState[ruleId]
    }));
  };
  useEffect(() => {
    const filtered = filterRules();
    setFilteredRules(filtered);
  }, [searchTerm, activeCategory]);
  useEffect(() => {
    setAnimateIn(true);
    setFilteredRules(rules);
  }, []);
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: <AlertTriangle className="text-red-500" size={24} />,
          gradient: 'from-red-500 to-rose-500'
        };
      case 'medium':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: <AlertCircle className="text-amber-500" size={24} />,
          gradient: 'from-amber-500 to-yellow-500'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: <Info className="text-blue-500" size={24} />,
          gradient: 'from-blue-500 to-indigo-500'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${animateIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-wide">
            Rules & Guidelines
          </h1>

          {/* sleek divider instead of thick underline */}
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-expandWidth"></div>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-blue-200 leading-relaxed px-4">
            Essential information for a smooth journey with Haryana Roadways
          </p>
        </div>


        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 group-hover:text-blue-500 transition-colors" size={24} />
              <input
                type="text"
                placeholder="Search rules..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-blue-200 backdrop-blur-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105
                    ${activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-white/10 text-white hover:bg-white/20'}`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: animateIn ? 'slideIn 0.5s ease forwards' : 'none'
                  }}
                >
                  <Icon size={24} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredRules.map((rule, index) => {
            const severityStyles = getSeverityStyles(rule.severity);
            return (
              <div
                key={rule.id}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] border border-white/20
                  ${expandedRules[rule.id] ? 'ring-2 ring-blue-500' : ''}
                  ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleExpand(rule.id)}
                  className="w-full text-left p-6 focus:outline-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {severityStyles.icon}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {rule.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${severityStyles.gradient} text-white`}>
                            {categories.find(cat => cat.id === rule.category)?.name || rule.category}
                          </span>
                          {rule.actionRequired && (
                            <span className="px-3 py-1 rounded-full text-sm bg-red-500 text-white">
                              Action Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`text-white transform transition-transform ${expandedRules[rule.id] ? 'rotate-180' : ''}`}
                      size={24}
                    />
                  </div>
                </button>

                {expandedRules[rule.id] && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-4 border-l-4 border-blue-500 space-y-3">
                      {rule.content.map((item, index) => (
                        <p key={index} className="text-blue-100">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-2xl">
            <HelpCircle size={64} className="mx-auto text-blue-300 mb-4" />
            <p className="text-xl text-blue-200">
              No rules found matching your search criteria
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-expandWidth {
          animation: expandWidth 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RulesAndGuidelines;