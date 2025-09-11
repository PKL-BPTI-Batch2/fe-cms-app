const API_URL = "http://127.0.0.1:3000/menus";

// Ambil semua menu
export async function getMenus() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Gagal fetch menus");
  return res.json();
}

// Tambah menu baru
export async function addMenu(newMenu) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMenu),
  });
  if (!res.ok) throw new Error("Gagal tambah menu");
  return res.json();
}

// Update menu
export async function updateMenu(id, updatedMenu) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedMenu),
  });
  if (!res.ok) throw new Error("Gagal update menu");
  return res.json();
}

// Hapus menu
export async function deleteMenu(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal hapus menu");
  return res.json();
}
