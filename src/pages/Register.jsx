import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import Navbar from '../Components/Navbar'
import Footer from "../Components/Footer";


export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError(err.message);
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
                Register
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

                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
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
                    Register
                  </Button>
                </div>
              </form>

              <Typography sx={{ mt: 2, textAlign: "center" }}>
                Already have an account? <Link to="/login">Login</Link>
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

