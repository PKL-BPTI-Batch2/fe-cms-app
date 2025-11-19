import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

/**
 * Komponen tombol aksi reusable untuk tabel mana pun.
 * Bisa dikasih aturan kapan tombol delete/edit ditampilkan.
 * 
 * Props:
 * - row: data baris
 * - onEdit: fungsi edit (opsional)
 * - onDelete: fungsi delete (opsional)
 * - hideDeleteIf: (row) => boolean  → sembunyikan tombol delete jika return true
 * - hideEditIf: (row) => boolean  → sembunyikan tombol edit jika return true
 */
export default function ActionsCell({ row, onDelete, onEdit, hideDeleteIf, hideEditIf }) {
  const shouldHideDelete = hideDeleteIf ? hideDeleteIf(row) : false;
  const shouldHideEdit = hideEditIf ? hideEditIf(row) : false;

  return (
    <>
      {!shouldHideEdit && onEdit && (
        <IconButton
          color="primary"
          size="small"
          onClick={() => onEdit(row)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}

      {!shouldHideDelete && onDelete && (
        <IconButton
          color="error"
          size="small"
          onClick={() => onDelete(row.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </>
  );
}
