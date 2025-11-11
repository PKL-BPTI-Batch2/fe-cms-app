import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";

export default function MediaItem({ file, onPreview, onDelete }) {
  if (!file) return null;

  const sizeMB = file.size ? (file.size / 1024 / 1024).toFixed(2) : "0.00";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
        borderRadius: 2,
        border: "1px solid #eee",
        "&:hover": { backgroundColor: "#f9f9f9" },
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight="500">
          {file.filename || "Unnamed File"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sizeMB} MB • {file.type || "unknown"}
        </Typography>
      </Box>

      <Box>
        <IconButton onClick={() => onPreview(file)}>
          <Visibility />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(file.id || file._id)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
}
