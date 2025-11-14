import React from "react";
import { Container, Row, Col, } from "react-bootstrap";
import { Button, Card, Typography } from "@mui/material";
import { FaCalendarAlt, FaUsers, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from "../Components/Footer";


function Home() {
  return (
    <div>
        <Navbar/>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(90deg,#673ab7,#512da8)",
          color: "white",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Welcome to Event Planner
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
            Plan, organize, and manage your events effortlessly.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{
              backgroundColor: "white",
              color: "#512da8",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#ede7f6" },
            }}
          >
            Get Started
          </Button>
        </Container>
      </section>

      {/* Features Section */}
      <section style={{ padding: "60px 0", backgroundColor: "#f9f9f9" }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: 5, fontWeight: "bold", color: "#512da8" }}
          >
            Why Use Event Planner?
          </Typography>

          <Row className="g-4">
            <Col md={4}>
              <Card sx={{ p: 3, textAlign: "center", borderRadius: "16px" }}>
                <FaCalendarAlt size={40} color="#673ab7" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Manage Your Events
                </Typography>
                <Typography variant="body2">
                  Create, view, and track all your events in one place.
                </Typography>
              </Card>
            </Col>

            <Col md={4}>
              <Card sx={{ p: 3, textAlign: "center", borderRadius: "16px" }}>
                <FaUsers size={40} color="#673ab7" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Collaborate Easily
                </Typography>
                <Typography variant="body2">
                  Share event details and updates with your team.
                </Typography>
              </Card>
            </Col>

            <Col md={4}>
              <Card sx={{ p: 3, textAlign: "center", borderRadius: "16px" }}>
                <FaEdit size={40} color="#673ab7" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Edit Anytime
                </Typography>
                <Typography variant="body2">
                  Modify or cancel your events whenever you need.
                </Typography>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
    
  );
}

export default Home;

