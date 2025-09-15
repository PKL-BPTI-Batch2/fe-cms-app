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
import { Edit, Delete, List } from "@mui/icons-material";
import { getMenus, addMenu, updateMenu, deleteMenu } from "../../services/crudmenu.jsx";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();

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
    try {
      const newData = { name: formData.name };

      if (editingMenu) {
        await updateMenu(editingMenu.id, newData);
      } else {
        await addMenu(newData);
      }

      loadMenus();
      handleClose();
    } catch (error) {
      console.error("Error menyimpan menu:", error);
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

  return (
    <Box p={3}>
      <Box
        mb={3}
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h5" fontWeight="bold">
          Menu Management
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          + New Menu
        </Button>
      </Box>

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
                  onClick={() => navigate(`/menu-items/${menu.id}`)}
                >
                  <List />
                </IconButton>
                <IconButton color="primary" onClick={() => handleOpen(menu)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(menu.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingMenu ? "Edit Menu" : "New Menu"}</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            fullWidth
            label="Nama Menu"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
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
