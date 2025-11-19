import React, { useState, useEffect } from "react";
import { MenuItem } from "@mui/material";
import FormDialog from "../FormDialog";
import FormField from "../FormField";
import { getUserById } from "../../services/Users/getUserById";

export default function UpdateUserDialog({ open, userId, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      getUserById(userId).then((res) => {
        setLoading(false);
        if (res.success && res.user) {
          setUsername(res.user.username || "");
          setEmail(res.user.email || "");
          setRole(res.user.role?.toLowerCase?.() || "user");
        }
      });
    } else if (!open) {
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");
    }
  }, [open, userId]);

  const handleSave = async () => {
    if (!userId) return;

    const payload = {
      id: userId,
      username,
      email,
      password: password || undefined,
      role: role.toLowerCase(),
    };

    await onUpdate(payload);
    onClose();
    document.activeElement?.blur();
  };

  if (loading) return null;

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title="Edit Data User"
      loading={loading}
    >
      <FormField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormField
        label="Password (kosongkan jika tidak diubah)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormField label="Role" select value={role} onChange={(e) => setRole(e.target.value)}>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </FormField>
    </FormDialog>
  );
}
