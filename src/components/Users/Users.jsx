import React, { useEffect, useState } from 'react';
import PageWrapper from '../PageWrapper';
import CardContainer from '../CardContainer';
import DataTable from '../DataTable';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import AddButton from '../AddButton';
import ConfirmDialog from '../ConfirmDialog';
import { useDialogState } from '../useDialogState';
import { useApp } from '../AppContext';

import { getUsers } from '../../services/Users/getUsers';
import { addUser } from '../../services/Users/addUser';
import { updateUser } from '../../services/Users/updateUser';
import { deleteUser } from '../../services/Users/deleteUser';
import { createColumns } from '../Columns';

import AddUserDialog from './addUserDialog';
import UpdateUserDialog from './UpdateUserDialog';

export default function Users() {
  const { userRows, setUserRows, currentUser } = useApp();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [dialogState, dispatchDialog] = useDialogState();

  // --- Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      if (result.success) {
        setUserRows(result.mapped);
      } else {
        setErrorMessage(result.errorMessage);
      }
    };

    if (userRows.length === 0) {
      fetchUsers();
    }
  }, [userRows, setUserRows]);

  // --- Add new user
  const handleSaveUser = async (newData) => {
    const result = await addUser(newData);
    if (result.success) {
      setUserRows((prev) => [result.newRow, ...prev]);
      setSuccessMessage(result.successMessage);
      dispatchDialog({ type: 'CLOSE' });
      document.activeElement?.blur();
    } else {
      setErrorMessage(result.errorMessage);
    }
  };

  // --- Update user
  const handleUpdateUser = async (updatedData) => {
  if (!updatedData.id) {
    setErrorMessage("ID user tidak ditemukan");
    return;
  }

  const result = await updateUser(updatedData);
  if (result.success) {
    setUserRows((rows) =>
      rows.map((r) => (r.id === updatedData.id ? result.updatedRow : r))
    );
    setSuccessMessage(result.successMessage);
    dispatchDialog({ type: 'CLOSE' });
    document.activeElement?.blur();
  } else {
    setErrorMessage(result.errorMessage);
  }
};


  // --- Delete user
  const confirmDelete = async () => {
    const deleteId = dialogState.payload;
    dispatchDialog({ type: 'CLOSE' });
    document.activeElement?.blur();
    if (!deleteId) return;

    const result = await deleteUser(deleteId);
    if (result.success) {
      setUserRows((rows) => rows.filter((r) => r.id !== deleteId));
      setSuccessMessage(result.successMessage);
    } else {
      setErrorMessage(result.errorMessage);
    }
  };

  return (
    <>
      <PageWrapper>
        <AddButton
          onClick={() => dispatchDialog({ type: 'OPEN_ADD' })}
          label="+ New User"
        />

        {errorMessage && (
          <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('')} />
        )}
        {successMessage && (
          <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('')} />
        )}

        {/* Dialog Tambah User */}
        <AddUserDialog
          open={dialogState.dialog === 'add'}
          onClose={() => dispatchDialog({ type: 'CLOSE' })}
          onSave={handleSaveUser}
          currentUser={currentUser}
        />

        {/* Dialog Update User */}
        <UpdateUserDialog
          open={dialogState.dialog === 'update'}
          userId={dialogState.payload?.id}
          onClose={() => dispatchDialog({ type: 'CLOSE' })}
          onUpdate={handleUpdateUser}
        />

        <CardContainer>
          <DataTable
            rows={userRows}
            columns={createColumns({
              fields: [
                { field: 'name', headerName: 'NAME', flex: 1 },
                { field: 'role', headerName: 'ROLE', flex: 1 },
              ],
              onDelete: (id) => dispatchDialog({ type: 'OPEN_DELETE', payload: id }),
              onEdit: (row) => dispatchDialog({ type: 'OPEN_UPDATE', payload: row }),
            })}
          />
        </CardContainer>
      </PageWrapper>

      {/* Konfirmasi Hapus */}
      <ConfirmDialog
        open={dialogState.dialog === 'delete'}
        title="Konfirmasi Hapus"
        content="Yakin mau menghapus user ini?"
        onConfirm={confirmDelete}
        onCancel={() => dispatchDialog({ type: 'CLOSE' })}
      />
    </>
  );
}
