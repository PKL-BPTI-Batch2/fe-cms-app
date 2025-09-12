import axios from "axios";

const API_URL = "http://127.0.0.1:3000/menu";

// Ambil semua menu
export async function getMenus() {
  try {
    const res = await axios.get(`${API_URL}/`);
    return res.data;
  } catch (error) {
    console.error("Gagal fetch menus:", error);
    throw error;
  }
}

// Tambah menu baru
export async function addMenu(newMenu) {
  try {
    const res = await axios.post(`${API_URL}/insert`, newMenu);
    return res.data;
  } catch (error) {
    console.error("Gagal tambah menu:", error);
    throw error;
  }
}

// Update menu
export async function updateMenu(id, updatedMenu) {
  try {
    const res = await axios.put(`${API_URL}/update/${id}`, updatedMenu);
    return res.data;
  } catch (error) {
    console.error("Gagal update menu:", error);
    throw error;
  }
}

// Hapus menu
export async function deleteMenu(id) {
  try {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Gagal hapus menu:", error);
    throw error;
  }
}
