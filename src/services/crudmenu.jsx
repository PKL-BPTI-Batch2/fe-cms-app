const API_URL = "http://127.0.0.1:3000/menus";

export async function getMenus() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addMenu(newMenu) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMenu),
  });
  return res.json();
}

export async function updateMenu(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
}

export async function deleteMenu(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
