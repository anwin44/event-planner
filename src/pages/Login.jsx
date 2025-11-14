import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import Navbar from '../Components/Navbar'
import Footer from "../Components/Footer";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
    
    <Navbar/>
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.VETt5povJacIfL3d0DOkHQHaEK?pid=Api&P=0&h=180')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
    <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
                Login
              </Typography>

              {error && (
                <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                  {error}
                </Typography>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  required
                />

                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#673ab7",
                      "&:hover": { backgroundColor: "#5e35b1" },
                      px: 4,
                    }}
                  >
                    Login
                  </Button>
                  <p style={{ marginTop: "10px", textAlign: "center" }}>
                  <Link to="/forgot-password" style={{ color: "#673ab7", textDecoration: "none" }}>
                  Forgot Password?
                  </Link>
                  </p>

                </div>
              </form>

              <Typography sx={{ mt: 2, textAlign: "center" }}>
                Don't have an account? <Link to="/register">Register</Link>
              </Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
    </Box>
    <Footer/>
    </>
  );
}
