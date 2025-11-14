// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user"); // or your auth state

  return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
