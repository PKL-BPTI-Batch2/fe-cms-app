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
import { Edit, Delete, List } from "@mui/icons-material";
import { getMenus, addMenu, updateMenu, deleteMenu } from "../../services/CrudMenuMenuItem/crudmenu.jsx";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMenus();
      setMenus(data || []);
    } catch (error) {
      console.error("Error loading menus:", error);
      setError("Gagal memuat data menu. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (menu = null) => {
    if (menu) {
      setEditingMenu(menu);
      setFormData({ name: menu.name || "" });
    } else {
      setEditingMenu(null);
      setFormData({ name: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMenu(null);
    setFormData({ name: "" });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError("Nama menu tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const newData = { name: formData.name.trim() };

      if (editingMenu) {
        await updateMenu(editingMenu.id, newData);
        setSuccess("Menu berhasil diupdate");
      } else {
        await addMenu(newData);
        setSuccess("Menu berhasil ditambahkan");
      }

      loadMenus();
      handleClose();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error menyimpan menu:", error);
      setError(error.response?.data?.error || "Gagal menyimpan menu. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu ingin menghapus menu ini?")) {
      try {
        setLoading(true);
        setError(null);
        await deleteMenu(id);
        setSuccess("Menu berhasil dihapus");
        loadMenus();
        
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error("Error menghapus menu:", error);
        setError(error.response?.data?.error || "Gagal menghapus menu. Silakan coba lagi.");
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
        <Typography variant="h5" fontWeight="bold">
          Menu Management
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()} disabled={loading}>
          + New Menu
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {loading && menus.length === 0 ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : menus.length === 0 ? (
        <Alert severity="info">Belum ada menu. Buat menu baru untuk memulai.</Alert>
      ) : (
        <Stack spacing={2}>
          {menus.map((menu) => (
            <Card
              key={menu.id}
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
                    {menu.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {menu.id}
                  </Typography>
                </Box>

                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/menu-item/${menu.id}`)}
                  >
                    <List />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(menu)}
                    disabled={loading}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(menu.id)}
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
        <DialogTitle>{editingMenu ? "Edit Menu" : "New Menu"}</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            fullWidth
            label="Nama Menu"
            margin="normal"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setError(null);
            }}
            required
            disabled={loading}
            error={error !== null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name.trim() || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Simpan"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}