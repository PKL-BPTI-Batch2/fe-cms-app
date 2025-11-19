import React from "react";
import ActionsCell from "./ActionsCell";

/**
 * Reusable column generator
 * @param {Object} options
 * @param {Array} options.fields - daftar kolom utama
 * @param {Function} [options.onDelete] - fungsi hapus (opsional)
 * @param {Function} [options.onEdit] - fungsi edit (opsional)
 * @param {boolean} [options.withActions=true] - tambahkan kolom aksi
 * @param {Function} [options.hideDeleteIf] - sembunyikan tombol delete berdasarkan kondisi row
 * @param {Function} [options.hideEditIf] - sembunyikan tombol edit berdasarkan kondisi row
 */
export const createColumns = ({
  fields = [],
  onDelete,
  onEdit,
  withActions = true,
  hideDeleteIf,
  hideEditIf,
}) => {
  const baseColumns = fields.map((col) => ({
    sortable: true,
    filterable: true,
    headerAlign: "left",
    align: "left",
    ...col,
  }));

  const actionsColumn = {
    field: "actions",
    headerName: "AKSI",
    width: 120,
    sortable: false,
    filterable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <ActionsCell
        row={params.row}
        onDelete={onDelete}
        onEdit={onEdit}
        hideDeleteIf={hideDeleteIf}
        hideEditIf={hideEditIf}
      />
    ),
  };

  return withActions ? [...baseColumns, actionsColumn] : baseColumns;
};
