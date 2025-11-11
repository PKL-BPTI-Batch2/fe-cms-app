// src/components/Media/Media.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Upload, Warning } from "@mui/icons-material";
import MediaItem from "./MediaItem";
import { getAllMedia, uploadMedia, deleteMedia } from "../../services/CrudMedia/crudmedia";

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllMedia();

      console.log("📦 Data dari backend:", data); 

      if (Array.isArray(data)) {
        setMediaList(data);
      } else {
        setMediaList([]);
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

 const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  e.target.value = "";

  try {
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    console.log("📤 Uploading file:", file.name, file.size, file.type);

    await uploadMedia(formData);
    
    console.log("✅ Upload success");
    await fetchMedia(); // Refresh list
    
  } catch (err) {
    console.error("❌ Upload error:", err.response?.data);
    setError(err.response?.data?.error || "Gagal upload media");
  } finally {
    setUploading(false);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus media ini?")) return;
    try {
      await deleteMedia(id);
      setMediaList((prev) => prev.filter((m) => m.id !== id && m._id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      setError(err.response?.data?.error || "Gagal menghapus media");
    }
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
    setOpenPreview(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Media Library
        </Typography>

        <Button
          variant="contained"
          component="label"
          startIcon={<Upload />}
          sx={{ borderRadius: 2, textTransform: "none" }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Media"}
          <input hidden type="file" onChange={handleUpload} />
        </Button>
      </Stack>

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }} 
          onClose={() => setError("")}
          icon={<Warning />}
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            {mediaList.length === 0 ? (
              <Typography textAlign="center" color="text.secondary">
                Belum ada media.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {mediaList.map((file) => (
                  <MediaItem
                    key={file.id || file._id}
                    file={file}
                    onPreview={handlePreview}
                    onDelete={handleDelete}
                  />
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="md" fullWidth>
        <DialogTitle>Preview: {previewFile?.filename}</DialogTitle>
        <DialogContent dividers>
          {previewFile ? (
            previewFile.type === "image" ? (
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={`http://localhost:3000${previewFile.filepath}`}
                  alt={previewFile.filename}
                  style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: 8 }}
                  onError={(e) => {
                    console.log("Gambar tidak dapat dimuat");
                    e.target.style.display = 'none';
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  File berhasil diupload! (Preview mungkin tidak tersedia)
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h6" color="text.secondary">
                  📄 {previewFile.filename}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Preview tidak tersedia untuk file {previewFile.type}
                </Typography>
              </Box>
            )
          ) : (
            <Typography textAlign="center" color="text.secondary">
              Tidak ada file untuk ditampilkan.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}