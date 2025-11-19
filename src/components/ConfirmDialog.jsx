// src/components/ConfirmDialog.jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export default function ConfirmDialog({ open, title, content, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Batal</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Ya, hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
}
