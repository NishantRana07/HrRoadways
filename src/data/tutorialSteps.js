import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  CreditCard,
  Info,
  MapPin,
  Repeat,
  ShieldCheck,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

export const tutorialSteps = [
  {
    title: "How to Book a Bus",
    description:
      "Follow these simple steps to book your bus ticket with Haryana Roadways.",
    steps: [
      {
        icon: MapPin,
        title: "Step 1: Select Route",
        description: "Choose your departure and arrival locations.",
        // Replace the videoId with your actual YouTube video id.
        // This video URL will be used on the last step.
        videoUrl:
          "https://www.youtube.com/embed/u31qwQUeGuM?si=dZ4IiHERaZAsx7tz",
      },
      {
        icon: Calendar,
        title: "Step 2: Select Date",
        description: "Pick your travel date from the calendar.",
      },
      {
        icon: Users,

        title: "Step 3: Select Passengers",
        description: "Enter the number of passengers traveling.",
      },
      {
        icon: Repeat,
        title: "Step 4: Round Trip",
        description: "Choose if you want a round trip or a one-way trip.",
        // The videoUrl is still passed here if needed,
        // but it will only be rendered on this last step.
        videoUrl:
          "https://www.youtube.com/embed/u31qwQUeGuM?si=dZ4IiHERaZAsx7tz",
      },
    ],
  },
  {
    title: "How to Pay for a Ticket",
    description:
      "Learn how to pay for your ticket using various payment methods.",
    steps: [
      {
        icon: CreditCard,
        title: "Step 1: Select Payment Method",
        description:
          "Choose your preferred payment method (Credit Card, Debit Card, UPI, Wallet).",
      },
      {
        icon: ShieldCheck,
        title: "Step 2: Enter Payment Details",
        description: "Fill in your payment details securely.",
      },
      {
        icon: CheckCircle,
        title: "Step 3: Confirm Payment",
        description: "Review and confirm your payment.",
      },
    ],
  },
  {
    title: "Passenger Rules in India",
    description:
      "General guidelines for passengers traveling by bus across India.",
    steps: [
      {
        icon: Info,
        title: "Valid ID",
        description:
          "Carry valid identification and a printed or digital ticket.",
      },
      {
        icon: AlertTriangle,
        title: "Restricted Items",
        description:
          "Hazardous materials or banned substances are not permitted on board.",
      },
    ],
  },
  {
    title: "Guidelines for Female Passengers",
    description:
      "Points to ensure a safe and comfortable journey for female passengers.",
    steps: [
      {
        icon: UserCheck,
        title: "Preferred Seating",
        description:
          "Some buses may offer reserved seats for females; check signage when boarding.",
      },
      {
        icon: ShieldCheck,
        title: "Security Assistance",
        description:
          "Contact bus staff or a helpline if you face any discomfort.",
      },
    ],
  },
  {
    title: "Stop Rules",
    description:
      "Understand the rules and procedures for bus stops during your journey.",
    steps: [
      {
        icon: MapPin,

        title: "Designated Stops",
        description:
          "Buses stop only at authorized or scheduled stops along the route.",
      },
      {
        icon: AlertTriangle,
        title: "Emergency Stops",
        description:
          "Request an emergency stop only for genuine medical or safety issues.",
      },
    ],
  },
  {
    title: "Booking Cancellation & Refund",
    description:
      "Learn about cancellation policies, refund timelines, and modifications.",
    steps: [
      {
        icon: XCircle,
        title: "Cancellation Window",
        description:
          "Check official rules on cancellation deadlines for partial or full refunds.",
      },
      {
        icon: Calendar,
        title: "Refund Process",
        description:
          "Refunds typically take a few working days based on the payment method.",
      },
    ],
  },
];
