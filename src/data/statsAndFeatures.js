import {
  Clock,
  MapPin,
  Shield,
  Bus,
  ThumbsUp,
  HeartPulse,
  Coffee,
} from "lucide-react";

export const statistics = [
  { label: "On-Time Performance", value: "98.5%", icon: Clock },
  { label: "Customer Satisfaction", value: "4.8/5", icon: ThumbsUp },
  { label: "Safety Rating", value: "5 Star", icon: Shield },
  { label: "Routes Covered", value: "500+", icon: MapPin },
];

export const features = [
  {
    title: "Premium Fleet",
    description:
      "Experience luxury travel with our modern fleet of Volvo and Mercedes-Benz buses.",
    icon: Bus,
    details: [
      "Regular maintenance checks",
      "Modern safety features",
      "Comfortable seating",
      "Climate control",
    ],
  },
  {
    title: "Maintenance Excellence",
    description:
      "Our buses undergo rigorous maintenance routines to ensure safety and comfort.",
    icon: Bus,
    details: [
      "24/7 technical support",
      "Preventive maintenance",
      "Quality spare parts",
      "Expert technicians",
    ],
  },
  {
    title: "Safety First",
    description:
      "Your safety is our top priority with advanced security features and trained staff.",
    icon: HeartPulse,
    details: [
      "Speed governors",
      "GPS tracking",
      "CCTV surveillance",
      "Emergency response",
    ],
  },
  {
    title: "Passenger Comfort",
    description:
      "Enjoy premium amenities designed for your comfort throughout the journey.",
    icon: Coffee,
    details: [
      "Reclining seats",
      "Entertainment system",
      "Refreshment service",
      "Clean restrooms",
    ],
  },
];
