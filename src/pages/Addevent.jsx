// src/pages/AddEvent.jsx
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { db, auth } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, date, time, description } = formData;
    if (!title || !date || !time || !description) {
      swal("⚠️ Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "events"), {
        ...formData,
        userId: auth.currentUser.uid, // important!
        createdAt: Timestamp.now(),
      });

      swal("🎉 Event added successfully!");
      setFormData({ title: "", date: "", time: "", description: "" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding event:", error);
      swal("❌ Failed to add event. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage:
            "url('https://tse4.mm.bing.net/th/id/OIP.VETt5povJacIfL3d0DOkHQHaEK?pid=Api&P=0&h=180')",
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
            <Col md={8}>
              <Card sx={{ p: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
                  >
                    Add New Event
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Event Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      sx={{ mb: 3 }}
                    />
                    <Row>
                      <Col md={6}>
                        <TextField
                          fullWidth
                          type="date"
                          label="Date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          sx={{ mb: 3 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Col>
                      <Col md={6}>
                        <TextField
                          fullWidth
                          type="time"
                          label="Time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          sx={{ mb: 3 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Col>
                    </Row>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      sx={{ mb: 3 }}
                    />

                    <div style={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{
                          backgroundColor: "#ff9800",
                          "&:hover": { backgroundColor: "#f57c00" },
                          px: 4,
                        }}
                      >
                        {loading ? "Adding..." : "Add Event"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
