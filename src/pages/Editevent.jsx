import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Navbar from '../components/Navbar'
import swal from "sweetalert";
import Footer from "../Components/Footer";


// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  description: Yup.string().required("Description is required"),
});

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEventData(docSnap.data());
        } else {
          alert("Event not found!");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!eventData) return null;

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
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 4, borderRadius: 3, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        ✏️ Edit Event
      </Typography>

      <Formik
        initialValues={{
          title: eventData.title || "",
          date: eventData.date || "",
          time: eventData.time || "",
          description: eventData.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const docRef = doc(db, "events", id);
            await updateDoc(docRef, {
              ...values,
              updatedAt: serverTimestamp(),
            });
            swal("🎉 Event updated successfully!", "Your event was updated.", "success")
            navigate("/dashboard");
          } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update event");
            swal("Failed to update event", "Your event was not updated.", "error")
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, handleChange, values, isSubmitting }) => (
          <Form>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date && errors.date}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Time"
              type="time"
              name="time"
              value={values.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={touched.time && Boolean(errors.time)}
              helperText={touched.time && errors.time}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ backgroundColor: "#673ab7", "&:hover": { backgroundColor: "#5e35b1" }, px: 4 }}
            >
              {isSubmitting ? "Updating..." : "Update Event"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
    </Box>
    <Footer/>
    </>
  );
}

export default EditEvent;
