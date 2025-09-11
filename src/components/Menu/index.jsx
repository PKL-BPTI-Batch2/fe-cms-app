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

  const [formData, setFormData] = useState({
    name: "",
    path: ""
  });

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
        name: menu.name || "",
        path: menu.path || ""
      });
    } else {
      setEditingMenu(null);
      setFormData({ name: "", path: "" });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const newData = {
      name: formData.name,
      path: formData.path
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
        justifyContent="flex-end"
        alignItems="center"
        mb={3}
      >
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          + New Menu
        </Button>
      </Stack>

      <Stack spacing={2}>
        {menus.map((menu) => (
          <Card key={menu.id} variant="outlined">
            <CardContent
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {menu.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {menu.path}
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
            label="Name"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Path"
            margin="normal"
            value={formData.path}
            onChange={(e) => setFormData({ ...formData, path: e.target.value })}
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
