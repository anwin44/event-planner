import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#673ab7",
        color: "white",
        py: 4,
        mt: 5,
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {/* Column 1 */}
        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            Event Planner
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Plan your events with ease. Simple • Fast • Smart.
          </Typography>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            Quick Links
          </Typography>
          <Typography sx={{ mt: 1 }}>Home</Typography>
          <Typography>Dashboard</Typography>
          <Typography>Add Event</Typography>
        </Grid>

        {/* Column 3 */}
        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            Follow Us
          </Typography>

          <Box sx={{ mt: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <FaFacebook size={22} />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <FaInstagram size={22} />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <FaTwitter size={22} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Typography textAlign="center" sx={{ mt: 3 }}>
        © 2025 Event Planner. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
