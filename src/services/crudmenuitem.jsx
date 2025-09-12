import axios from "axios";

const API_URL = "http://localhost:3000/api/menu";

export const getMenuItems = async (menuId) => {
  const res = await axios.get(`${API_URL}?menu_id=${menuId}`);
  return res.data;
};

export const addMenuItem = async (item) => {
  const res = await axios.post(API_URL, item);
  return res.data;
};

export const updateMenuItem = async (id, item) => {
  const res = await axios.put(`${API_URL}/${id}`, item);
  return res.data;
};

export const deleteMenuItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
