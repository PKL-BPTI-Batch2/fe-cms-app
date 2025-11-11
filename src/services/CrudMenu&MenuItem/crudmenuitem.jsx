import API from "../api";

export const getMenuItems = async (menuId) => {
  try {
    const res = await API.get("/menu-item/");
    
    if (menuId) {
      // Filter items by menu_id
      const filtered = res.data.filter(item => item.menu_id === parseInt(menuId));
      return filtered;
    }
    
    return res.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

export const getMenuItemById = async (id) => {
  try {
    const res = await API.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw error;
  }
};

export const addMenuItem = async (item) => {
  try {
    const res = await API.post("/menu-item/create", item);
    return res.data;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

export const updateMenuItem = async (id, item) => {
  try {
    const res = await API.put(`/menu-item/update/${id}`, item);
    return res.data;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    await API.delete(`/menu-item/delete/${id}`);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};