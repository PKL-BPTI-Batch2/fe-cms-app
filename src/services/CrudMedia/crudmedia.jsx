import API from "../api";

export const getAllMedia = async () => {
  const res = await API.get("/media/");
  return Array.isArray(res.data) ? res.data : [];
};

export const uploadMedia = async (formData) => {
  const res = await API.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteMedia = async (id) => {
  const res = await API.delete(`/media/delete/${id}`);
  return res.data;
};

export const getMediaById = async (id) => {
  const res = await API.get(`/media/view/${id}`);
  return res.data;
};