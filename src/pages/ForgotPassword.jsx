import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Check your inbox.");
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "100px auto",
        textAlign: "center",
        padding: 4,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: 3,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#673ab7" }}>
        Forgot Password
      </Typography>

      <TextField
        label="Enter your registered email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleReset}
        sx={{
          backgroundColor: "#673ab7",
          "&:hover": { backgroundColor: "#5e35b1" },
        }}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </Button>

      {message && (
        <Typography sx={{ mt: 2 }} color={message.startsWith("✅") ? "green" : "red"}>
          {message}
        </Typography>
      )}

      <Typography sx={{ mt: 3 }}>
        Remember your password?{" "}
        <Link to="/login" style={{ color: "#673ab7", textDecoration: "none" }}>
          Go back to Login
        </Link>
      </Typography>
    </Box>
  );
}

export default ForgotPassword;
