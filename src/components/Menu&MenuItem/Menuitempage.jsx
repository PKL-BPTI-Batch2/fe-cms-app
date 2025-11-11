import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "../../services/CrudMenu&MenuItem/CrudMenuItem.jsx";

export default function MenuItemsPage() {
  const { id: menuId } = useParams(); // Ambil id dari URL params
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", url: "", order_int: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (menuId) {
      loadItems();
    }
  }, [menuId]);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMenuItems(menuId);
      setItems(data || []);
    } catch (error) {
      console.error("Error loading menu items:", error);
      setError(error.response?.data?.error || "Gagal memuat data menu items. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        title: item.title || "", 
        url: item.url || "",
        order_int: item.order_int || 0
      });
    } else {
      setEditingItem(null);
      setFormData({ title: "", url: "", order_int: 0 });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setFormData({ title: "", url: "", order_int: 0 });
    setError(null);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError("Judul item tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const newData = { 
        title: formData.title.trim(), 
        url: formData.url.trim() || null,
        menu_id: parseInt(menuId), // Pastikan menu_id dikirim
        order_int: parseInt(formData.order_int) || 0,
      };

      // Jangan kirim page_id dan parent_id jika tidak ada
      // Biarkan backend handle default value

      if (editingItem) {
        await updateMenuItem(editingItem.id, newData);
        setSuccess("Item berhasil diupdate");
      } else {
        await addMenuItem(newData);
        setSuccess("Item berhasil ditambahkan");
      }

      loadItems();
      handleClose();
      
      // Clear success message setelah 3 detik
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error menyimpan item:", error);
      setError(error.response?.data?.error || "Gagal menyimpan item. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu ingin menghapus item ini?")) {
      try {
        setLoading(true);
        setError(null);
        await deleteMenuItem(id);
        setSuccess("Item berhasil dihapus");
        loadItems();
        
        // Clear success message setelah 3 detik
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error("Error menghapus item:", error);
        setError(error.response?.data?.error || "Gagal menghapus item. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box p={3}>
      <Box
        mb={3}
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => navigate("/menus")} disabled={loading}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Menu Items (Menu ID: {menuId})
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => handleOpen()} disabled={loading}>
          + New Item
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {loading && items.length === 0 ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Alert severity="info">Belum ada menu items. Buat item baru untuk memulai.</Alert>
      ) : (
        <Stack spacing={2}>
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": { boxShadow: 4 },
                transition: "0.2s",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    URL: {item.url || "No URL"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Order: {item.order_int || 0} | ID: {item.id}
                  </Typography>
                </Box>

                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(item)}
                    disabled={loading}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? "Edit Item" : "New Item"}</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            fullWidth
            label="Judul Item"
            margin="normal"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              setError(null);
            }}
            required
            disabled={loading}
            error={error !== null && !formData.title.trim()}
            helperText={error && !formData.title.trim() ? "Judul tidak boleh kosong" : ""}
          />
          <TextField
            fullWidth
            label="URL"
            margin="normal"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            disabled={loading}
            placeholder="Contoh: /about-us"
          />
          <TextField
            fullWidth
            label="Order"
            type="number"
            margin="normal"
            value={formData.order_int}
            onChange={(e) => setFormData({ ...formData, order_int: e.target.value })}
            disabled={loading}
            helperText="Urutan tampil menu (angka kecil = muncul duluan)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.title.trim() || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Simpan"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}