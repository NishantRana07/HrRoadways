import { AlertTriangle, CloudRain, Truck, Wind } from "lucide-react";

export const generateTrafficUpdates = () => {
  const possibleUpdates = [
    {
      icon: AlertTriangle,
      title: "Delhi-Chandigarh Highway",
      status: "High Traffic",
      severity: "warning",
      details: "Congestion near Karnal toll plaza",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "bg-gradient-to-r from-orange-100/20 to-red-100/20",
    },
    {
      icon: CloudRain,

      title: "Hisar Route",
      status: "Weather Alert",
      severity: "info",
      details: "Heavy rainfall expected",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "bg-gradient-to-r from-blue-100/20 to-indigo-100/20",
    },
    {
      icon: Truck,
      title: "Gurugram Bypass",
      status: "Construction",
      severity: "warning",
      details: "Alternate route recommended",
      gradient: "from-yellow-500 to-amber-500",
      bgGradient: "bg-gradient-to-r from-yellow-100/20 to-amber-100/20",
    },
    {
      icon: Wind,

      title: "Ambala Corridor",
      status: "Clear Passage",
      severity: "success",
      details: "Smooth traffic flow",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "bg-gradient-to-r from-green-100/20 to-emerald-100/20",
    },
  ];

  return possibleUpdates
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 2) + 2);
};
