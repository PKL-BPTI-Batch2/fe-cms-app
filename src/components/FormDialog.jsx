import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

/**
 * FormDialog:
 * Komponen wrapper umum untuk dialog form.
 * 
 * Props:
 * - open: boolean → buka/tutup dialog
 * - onClose: function → handler saat tutup
 * - onSave: function → handler tombol simpan
 * - title: string → judul dialog
 * - saveLabel: string (optional) → teks tombol simpan, default "Simpan"
 * - children: isi form (field2)
 */
export default function FormDialog({ open, onClose, onSave, title, saveLabel = "Simpan", children }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          {saveLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
