import API from "../api";

export const getMenuItems = async (menuId) => {
  try {
    const res = await API.get("/menu-item/");

    const items = Array.isArray(res.data) ? res.data : [];

    if (menuId) {
      const filtered = items.filter(
        (item) => item.menu_id === Number(menuId)
      );
      return filtered;
    }

    return items;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return []; 
  }
};

export const getMenuItemById = async (id) => {
  try {
    const res = await API.get(`/menu-item/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return null;
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
