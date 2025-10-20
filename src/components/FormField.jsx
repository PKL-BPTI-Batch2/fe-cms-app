import React from "react";
import { TextField } from "@mui/material";

/**
 * FormField:
 * Wrapper umum untuk TextField MUI.
 * Kalau butuh select, children diisi <MenuItem> secara manual.
 */
export default function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  rows = 1,
  disabled = false,
  select = false,
  children // menuItem manual
}) {
  return (
    <TextField
      id={id}
      fullWidth
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      select={select}
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
    >
      {children}
    </TextField>
  );
}
