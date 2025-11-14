// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import Eventcard from "../Components/Eventcard";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch events
  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  // Edit event (navigate to edit page)
 const handleEdit = (id) => {
  navigate(`/edit-event/${id}`);
};


  // Filter + Search
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const eventDate = new Date(event.date);
    const today = new Date();
    let matchesFilter = true;

    if (filter === "upcoming") matchesFilter = eventDate >= today;
    else if (filter === "past") matchesFilter = eventDate < today;

    return matchesSearch && matchesFilter;
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
      <Container className="my-5">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            My Events 🎉
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/add-event"
            sx={{
              backgroundColor: "#673ab7",
              "&:hover": { backgroundColor: "#5e35b1" },
            }}
          >
            + Add Event
          </Button>
        </Box>

        {/* Search + Filter */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <TextField
            fullWidth
            label="Search events..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Filter by</InputLabel>
            <Select
              value={filter}
              label="Filter by"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All Events</MenuItem>
              <MenuItem value="upcoming">Upcoming Events</MenuItem>
              <MenuItem value="past">Past Events</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Events */}
        <Row>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const eventDate = new Date(event.date + " " + event.time);
              const now = new Date();
              const tomorrow = new Date();
              tomorrow.setDate(now.getDate() + 1);

              const isReminder =
                eventDate.getDate() === tomorrow.getDate() &&
                eventDate.getMonth() === tomorrow.getMonth() &&
                eventDate.getFullYear() === tomorrow.getFullYear();

              return (
                <Col key={event.id} md={4} sm={6} xs={12} className="mb-4">
                  <Eventcard
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    desc={event.description}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isReminder={isReminder} // Pass the reminder flag
                  />
                </Col>
              );
            })
          ) : (
            <Typography align="center" sx={{ mt: 5, color: "gray" }}>
              No events found.
            </Typography>
          )}
        </Row>
      </Container>
      </Box>
      <Footer/>
    </>
  );
}

export default Dashboard;
