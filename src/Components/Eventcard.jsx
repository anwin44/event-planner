// src/components/EventCard.jsx
import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip } from "@mui/material";

function Eventcard({ id, title, date, time, desc, onEdit, onDelete, isReminder }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📅 {date}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          🕒 {time}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {desc}
        </Typography>

        {/* Reminder Badge */}
        {isReminder && (
          <Chip
            label="⏰ Reminder: Tomorrow"
            color="warning"
            size="small"
            sx={{ mt: 1 }}
          />
        )}

        {/* Buttons */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => onEdit(id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Eventcard;
