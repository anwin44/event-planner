// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Listen for authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Logged in
      } else {
        setUser(null); // Not logged in
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user"); // remove auth flag for PrivateRoute
      setUser(null);
      navigate("/", { replace: true }); // replace history
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#673ab7" }}>
      <Toolbar>
        {/* Brand / Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Event Planner 🎉
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              {/* 👋 Show user's email only if logged in */}
              <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
                Welcome, <strong>{user.email}</strong> 👋
              </Typography>

              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>

              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ border: "1px solid white" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{ border: "1px solid white" }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
