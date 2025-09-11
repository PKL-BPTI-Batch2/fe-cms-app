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
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getMenus, addMenu, updateMenu, deleteMenu } from "./../../services/crudmenu.jsx";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    created_by: 1
  });

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      const data = await getMenus();
      setMenus(data);
    } catch (error) {
      console.error("Error loading menus:", error);
    }
  };

  const handleOpen = (menu = null) => {
    if (menu) {
      setEditingMenu(menu);
      setFormData({
        name: menu.name || "",
        created_by: menu.created_by || 1
      });
    } else {
      setEditingMenu(null);
      setFormData({ name: "", created_by: 1 });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMenu(null);
    setFormData({ name: "", created_by: 1 });
  };

  const handleSave = async () => {
    try {
      const newData = {
        name: formData.name,
        created_by: parseInt(formData.created_by) || 1
      };

      if (editingMenu) {
        await updateMenu(editingMenu.id, newData);
      } else {
        await addMenu(newData);
      }

      loadMenus();
      handleClose();
    } catch (error) {
      console.error("Error menyimpan  menu:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu ingin menghapus menu ini?")) {
      try {
        await deleteMenu(id);
        loadMenus();
      } catch (error) {
        console.error("Error menghapus menu:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box p={3}>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Menu Management
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            + New Menu
          </Button>
        </Stack>
      </Box>

      <Stack spacing={2}>
        {menus.map((menu) => (
          <Card key={menu.id} variant="outlined">
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {menu.name}
                  </Typography>
                  <Chip 
                    label={`ID: ${menu.id}`} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  <strong>Dibuat:</strong> {formatDate(menu.created_at)}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  <strong>Dibuat oleh:</strong> User {menu.created_by}
                </Typography>
              </Box>

              <Box>
                <IconButton color="primary" onClick={() => handleOpen(menu)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(menu.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMenu ? "Edit Menu" : "New Menu"}
          {editingMenu && (
            <Typography variant="body2" color="text.secondary">
              Menu ID: {editingMenu.id}
            </Typography>
          )}
        </DialogTitle>
        
        <DialogContent>
          <TextField
            fullWidth
            label="Nama Menu"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <TextField
            fullWidth
            label="Dibuat Oleh (User ID)"
            type="number"
            margin="normal"
            value={formData.created_by}
            onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
            required
            inputProps={{ min: 1 }}
          />

          {editingMenu && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Dibuat Oleh:</strong> {formatDate(editingMenu.created_at)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!formData.name.trim()}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}