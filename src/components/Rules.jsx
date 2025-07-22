import { useState, useEffect } from "react";
import {
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Search,
  AlertTriangle,
  Info,
} from "lucide-react";

import { rules, categories } from "../data/RulesAndCategroy";
const RulesAndGuidelines = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRules, setExpandedRules] = useState({});
  const [animateIn, setAnimateIn] = useState(false);
  const [filteredRules, setFilteredRules] = useState([]);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const filterRules = () => {
    return rules.filter((rule) => {
      const matchesSearch =
        rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.content.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        activeCategory === "all" || rule.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  };

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const toggleExpand = (ruleId) => {
    setExpandedRules((prevState) => ({
      ...prevState,
      [ruleId]: !prevState[ruleId],
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
      case "high":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: <AlertTriangle className="text-red-500" size={24} />,
          gradient: "from-red-500 to-rose-500",
        };
      case "medium":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: <AlertCircle className="text-amber-500" size={24} />,
          gradient: "from-amber-500 to-yellow-500",
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: <Info className="text-blue-500" size={24} />,
          gradient: "from-blue-500 to-indigo-500",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            animateIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-6xl font-bold text-white mb-4 relative">
            <span className="relative">
              Rules & Guidelines
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 animate-expandWidth"></div>
            </span>
          </h1>
          <p className="text-xl text-blue-200">
            Essential information for a smooth journey with Haryana Roadways
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 group-hover:text-blue-500 transition-colors"
                size={24}
              />
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
                    ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: animateIn
                      ? "slideIn 0.5s ease forwards"
                      : "none",
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
                  ${expandedRules[rule.id] ? "ring-2 ring-blue-500" : ""}
                  ${
                    animateIn
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
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
                          <span
                            className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${severityStyles.gradient} text-white`}
                          >
                            {categories.find((cat) => cat.id === rule.category)
                              ?.name || rule.category}
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
                      className={`text-white transform transition-transform ${
                        expandedRules[rule.id] ? "rotate-180" : ""
                      }`}
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

      <style jsx>{`
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
