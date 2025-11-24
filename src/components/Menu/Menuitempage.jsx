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
} from "@mui/material";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "../../services/crudmenuitem.jsx";

export default function MenuItemsPage() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", url: "" });

  
  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await getMenuItems(menuId);
        setItems(data);
      } catch (error) {
        console.error("Error loading items:", error);
      }
    };

    loadItems();
  }, [menuId]); 

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title || "", url: item.url || "" });
    } else {
      setEditingItem(null);
      setFormData({ title: "", url: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setFormData({ title: "", url: "" });
  };

  const handleSave = async () => {
    try {
      const newData = { title: formData.title, url: formData.url, menu_id: menuId };

      if (editingItem) {
        await updateMenuItem(editingItem.id, newData);
      } else {
        await addMenuItem(newData);
      }

      const updatedData = await getMenuItems(menuId);
      setItems(updatedData);
      handleClose();
    } catch (error) {
      console.error("Error menyimpan item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu ingin menghapus item ini?")) {
      try {
        await deleteMenuItem(id);
        const updatedData = await getMenuItems(menuId);
        setItems(updatedData);
      } catch (error) {
        console.error("Error menghapus item:", error);
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
          <IconButton onClick={() => navigate("/menus")}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Menu Items (Menu ID: {menuId})
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => handleOpen()}>
          + New Item
        </Button>
      </Box>

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
                  {item.url}
                </Typography>
              </Box>

              <Box>
                <IconButton color="primary" onClick={() => handleOpen(item)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(item.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? "Edit Item" : "New Item"}</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            fullWidth
            label="Judul Item"
            margin="normal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="URL"
            margin="normal"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.title.trim()}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}