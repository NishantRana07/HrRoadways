// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store"; // use correct path

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
