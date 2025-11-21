import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import FormDialog from "../FormDialog";
import FormField from "../FormField";

export default function AddUserDialog({ open, onClose, onSave, currentUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleSave = () => {
    const newData = {
      username,
      email,
      password,
      role: role.toLowerCase(),
    };

    onSave(newData);

    // Reset form
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("User");
    onClose();
  };

  return (
    <FormDialog open={open} onClose={onClose} onSave={handleSave} title="Tambah User Baru">
      <FormField
        label="Nama Lengkap"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <FormField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />

      <FormField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <FormField
        label="Role"
        select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="User">User</MenuItem>
      </FormField>

      <FormField
        label="Dibuat oleh"
        value={currentUser?.username || "System"}
        disabled
      />
    </FormDialog>
  );
}

