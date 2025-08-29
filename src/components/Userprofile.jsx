import React, { useState, useEffect } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaBus, FaMapMarkerAlt, FaClock, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

const mockBookings = [
  {
    id: 1,
    title: "Trip to Manali",
    date: "2025-08-10",
    status: "Confirmed",
    bus: "Volvo 9700",
    seat: "12B",
    startTime: "8:00 AM",
    endTime: "8:00 PM",
    source: "Delhi",
    destination: "Manali",
  },
  {
    id: 2,
    title: "Goa Beach Holiday",
    date: "2025-09-02",
    status: "Confirmed",
    bus: "Mercedes Benz",
    seat: "5A",
    startTime: "9:00 AM",
    endTime: "8:00 PM",
    source: "Mumbai",
    destination: "Goa",
  },
];

const travelHistoryData = [
  { month: "Jan", trips: 3 },
  { month: "Feb", trips: 4 },
  { month: "Mar", trips: 6 },
  { month: "Apr", trips: 2 },
  { month: "May", trips: 5 },
  { month: "Jun", trips: 3 },
];

const avatarImages = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
];

function getRandomAvatar() {
  return avatarImages[Math.floor(Math.random() * avatarImages.length)];
}

function ProfileCard({ user, totalTrips, upcomingTrips, loyaltyPoints, favoriteRoutes }) {
  const avatarUrl = user?.profileImageUrl || getRandomAvatar();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center p-8 mb-8 space-x-8 text-white shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl"
    >
      <img
        src={avatarUrl}
        alt="avatar"
        className="object-cover border-4 border-white rounded-full shadow-xl w-28 h-28"
      />
      <div>
        <h2 className="text-4xl font-extrabold">{user?.firstName || "Traveler"}</h2>
        <p className="mt-2">
          Loyalty Points: <span className="font-semibold">{loyaltyPoints}</span>
        </p>
        <p>Total Trips: {totalTrips}</p>
        <p>Upcoming Trips: {upcomingTrips}</p>
        <p>Favorite Routes: {favoriteRoutes}</p>
        <button className="px-6 py-2 mt-4 font-bold text-indigo-700 transition bg-white shadow rounded-xl hover:bg-gray-100">
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
}

function BookingItem({ booking }) {
  const downloadTicket = () => {
    const ticketContent = `
Ticket for: ${booking.title}
Date: ${booking.date}
Bus: ${booking.bus}
Seat: ${booking.seat}
Route: ${booking.source} -> ${booking.destination}
Status: ${booking.status}
Start Time: ${booking.startTime}
End Time: ${booking.endTime}
    `;
    const blob = new Blob([ticketContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Ticket_${booking.title.replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("Ticket downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 mb-6 bg-white border border-gray-200 shadow-md rounded-2xl"
    >
      <h3 className="mb-1 text-xl font-semibold">{booking.title}</h3>
      <p>
        <FaClock className="inline mr-2 text-indigo-600" /> Date: {booking.date}
      </p>
      <p>
        <FaBus className="inline mr-2 text-indigo-600" /> Bus: {booking.bus} | Seat: {booking.seat}
      </p>
      <p>
        <FaMapMarkerAlt className="inline mr-2 text-indigo-600" /> Route: {booking.source} - {booking.destination}
      </p>
      <p
        className={`mt-2 font-bold ${
          booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"
        }`}
      >
        Status: <FaStar className="inline mr-1" /> {booking.status}
      </p>
      <button
        onClick={downloadTicket}
        className="flex items-center px-4 py-2 mt-3 space-x-2 text-white transition bg-indigo-600 rounded-lg shadow hover:bg-indigo-700"
      >
        <FaDownload /> <span>Download Ticket</span>
      </button>
    </motion.div>
  );
}

export default function MyBookings() {
  const { user, isSignedIn, isLoaded } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const urlParams = new URLSearchParams(location.search);
      const loginSuccess = urlParams.get("login");
      const signupSuccess = urlParams.get("signup");

      const localLogin = localStorage.getItem("login_success");
      const localSignup = localStorage.getItem("signup_success");

      const lastWelcome = sessionStorage.getItem("last_welcome");
      const now = Date.now();
      const shouldShowWelcome = !lastWelcome || now - parseInt(lastWelcome) > 5000;

      if ((loginSuccess === "success" || localLogin) && shouldShowWelcome) {
        toast.success("Login successful! Welcome back!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { background: "#2563eb", color: "#fff" },
        });
        localStorage.removeItem("login_success");
        sessionStorage.setItem("last_welcome", now.toString());
        if (loginSuccess) {
          navigate("/mybookings", { replace: true });
        }
      }

      if ((signupSuccess === "success" || localSignup) && shouldShowWelcome) {
        toast.success("🎉 Registration successful! Welcome aboard!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { background: "#2563eb", color: "#fff" },
        });
        localStorage.removeItem("signup_success");
        sessionStorage.setItem("last_welcome", now.toString());
        if (signupSuccess) {
          navigate("/mybookings", { replace: true });
        }
      }
    }
  }, [isLoaded, isSignedIn, location.search, navigate]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-b-8 rounded-full animate-spin border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
    );

  if (!isSignedIn)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-red-500">
        Please log in to view your bookings.
      </div>
    );

  const loyaltyPoints = 1280; // Replace with real dynamic value
  const favoriteRoutes = 7; // Replace with real dynamic value
  const totalTrips = mockBookings.length + 10; // For example, add 10 completed trips to upcoming
  const upcomingTrips = mockBookings.length;

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-12`}>
      {/* Dark mode toggle inside page flow */}
      <div className="flex justify-end mb-12">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 text-white transition bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <ProfileCard
        user={user}
        totalTrips={totalTrips}
        upcomingTrips={upcomingTrips}
        loyaltyPoints={loyaltyPoints}
        favoriteRoutes={favoriteRoutes}
      />

      <div className="max-w-4xl mx-auto">
        <h2 className="mb-8 text-3xl font-bold">Upcoming Bookings</h2>
        {mockBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}

        <h2 className="mt-16 mb-6 text-3xl font-bold">Travel History</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={travelHistoryData}>
            <Line type="monotone" dataKey="trips" stroke="#6366F1" strokeWidth={3} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        <SignOutButton afterSignOutUrl="/">
          <button
            onClick={() =>
              toast.info("👋 You have been logged out successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: "#2563eb", color: "#fff" },
              })
            }
            className="w-full py-3 mt-10 text-xl font-semibold text-white transition-colors shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Log Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
