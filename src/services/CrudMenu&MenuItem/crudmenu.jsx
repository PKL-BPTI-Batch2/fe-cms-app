import API from "../api";

export const getMenus = async () => {
  try {
    const res = await API.get("/menu/");
    return res.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

export const addMenu = async (menu) => {
  try {
    const res = await API.post("/menu/insert", menu);
    return res.data;
  } catch (error) {
    console.error("Error adding menu:", error);
    throw error;
  }
};

export const updateMenu = async (id, menu) => {
  try {
    const res = await API.put(`/menu/update/${id}`, menu);
    return res.data;
  } catch (error) {
    console.error("Error updating menu:", error);
    throw error;
  }
};

export const deleteMenu = async (id) => {
  try {
    await API.delete(`/menu/delete/${id}`);
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};