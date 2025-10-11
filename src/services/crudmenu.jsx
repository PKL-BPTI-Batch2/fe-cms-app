import axios from "axios";

const API_URL = "http://localhost:3000/api/menu";

export const getMenus = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addMenu = async (menu) => {
  const res = await axios.post(`${API_URL}/insert`, menu); // Tambah /insert
  return res.data;
};

export const updateMenu = async (id, menu) => {
  const res = await axios.put(`${API_URL}/update/${id}`, menu); // Tambah /update
  return res.data;
};

export const deleteMenu = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`); // Tambah /delete
};