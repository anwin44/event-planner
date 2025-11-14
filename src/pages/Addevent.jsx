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
import Navbar from "../components/Navbar";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

// ✅ Import Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "../Components/Footer";

export default function AddEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Event title is required"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    description: Yup.string()
      .min(10, "Description should be at least 10 characters")
      .required("Description is required"),
    image: Yup.mixed().nullable(),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      time: "",
      description: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        await addDoc(collection(db, "events"), {
          title: values.title,
          date: values.date,
          time: values.time,
          description: values.description,
          createdAt: Timestamp.now(),
        });

        swal("🎉 Event added successfully!", "Your event was created.", "success");
        resetForm();
        navigate("/dashboard");
      } catch (error) {
        console.error("Error adding event: ", error);
        swal("❌ Failed to add event. Try again!", "Error occurred.", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Navbar />
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
          <Col md={8}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
                >
                  Add New Event
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  {/* Event Title */}
                  <TextField
                    fullWidth
                    label="Event Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={{ mb: 3 }}
                  />

                  {/* Date and Time */}
                  <Row>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
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
                        value={formik.values.time}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.time && Boolean(formik.errors.time)}
                        helperText={formik.touched.time && formik.errors.time}
                        sx={{ mb: 3 }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Col>
                  </Row>

                  {/* Description */}
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    sx={{ mb: 3 }}
                  />

                  {/* Image Upload (future feature) */}
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: "#673ab7",
                      "&:hover": { backgroundColor: "#5e35b1" },
                      mb: 3,
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      name="image"
                      hidden
                      accept="image/*"
                      onChange={(event) =>
                        formik.setFieldValue("image", event.currentTarget.files[0])
                      }
                    />
                  </Button>

                  {/* Submit Button */}
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
      <Footer/>
    </>
  );
}
