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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getMenus, addMenu, updateMenu, deleteMenu } from "./../../services/crudmenu.jsx";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({ title: "", items: "" });

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    const data = await getMenus();
    setMenus(data);
  };

  const handleOpen = (menu = null) => {
    if (menu) {
      setEditingMenu(menu);
      setFormData({
        title: menu.title,
        items: menu.items.join(", "),
      });
    } else {
      setEditingMenu(null);
      setFormData({ title: "", items: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const newData = {
      title: formData.title,
      items: formData.items.split(",").map((i) => i.trim()),
    };

    if (editingMenu) {
      await updateMenu(editingMenu.id, newData);
    } else {
      await addMenu(newData);
    }

    loadMenus();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteMenu(id);
    loadMenus();
  };

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="Flex-end"
        alignItems="center"
        mb={3}
      >
        <Button variant="contained"  color="primary" onClick={() => handleOpen()}>
          + New Menu
        </Button>
      </Stack>

      <Stack spacing={2}>
        {menus.map((menu) => (
          <Card key={menu.id} variant="outlined">
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {menu.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Items: {menu.items.join(", ")}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingMenu ? "Edit Menu" : "New Menu"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Menu Title"
            margin="normal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Menu Items (pisahkan dengan koma)"
            margin="normal"
            value={formData.items}
            onChange={(e) => setFormData({ ...formData, items: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={handleSave} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
