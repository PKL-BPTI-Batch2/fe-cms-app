import React, { useEffect, useState } from 'react'
import { getNews } from '../../services/News/getNews';
import PageWrapper from '../PageWrapper';
import CardContainer from '../CardContainer';
import DataTable from '../DataTable';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import AddButton from '../AddButton';
import { useApp } from '../AppContext';
import { addNews } from '../../services/News/addNews';
import { createColumns } from '../Columns';
import { deleteNews } from '../../services/News/deleteNews';
import AddNewsDialog from './AddNewsDialog';
import ConfirmDialog from '../ConfirmDialog'; 
import { useDialogState } from '../useDialogState';
import UpdateNewsDialog from './UpdateNewsDialog';
import { updateNews } from '../../services/News/updateNews';


export default function News() {
  const {newsRows,setNewsRows} = useApp();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {currentUser} = useApp();
 


  const [dialogState, dispatchDialog] = useDialogState();

  const handleUpdateNews = async (updatedData) => {
    const result = await updateNews(updatedData); // panggil service
    if (result.success) {
      // patch state supaya row langsung berubah
      setNewsRows((rows) =>
        rows.map((r) => (r.id === updatedData.id ? result.updatedRow : r))
      );
      setSuccessMessage(result.successMessage);
      dispatchDialog({ type: 'CLOSE' });
      document.activeElement?.blur();
    } else {
      setErrorMessage(result.errorMessage);
    }
  };

 
   const confirmDelete = async () => {
    const deleteId = dialogState.payload;
    dispatchDialog({type: 'CLOSE'})
    document.activeElement?.blur();

    if (!deleteId) return;
    const result = await deleteNews(deleteId);
    if (result.success) {
      setNewsRows((rows) => rows.filter((r) => r.id !== deleteId));
      setSuccessMessage(result.successMessage);
    } else {
      setErrorMessage(result.errorMessage);
    }
  };

  const handleSaveNews = async (NewData) => {
    const result = await addNews(NewData);

  if (result.success) {
    setNewsRows(prev => [result.newRow, ...prev]);
    console.log(result);
    
    setSuccessMessage(result.successMessage);
    dispatchDialog({type: 'CLOSE'})
    document.activeElement?.blur();


  } else {
    setErrorMessage(result.errorMessage);
  }
};
    useEffect(() => {
  const fetchNews = async () => {
    const result = await getNews();
    if(result.success) {
      console.log(result)
      setNewsRows(result.mapped); // simpan di context
    }else {

      setErrorMessage(result.errorMessage);
    }
  };
      

    
    
  

  if (newsRows.length === 0) { // hanya fetch kalau kosong
    fetchNews();
  }
}, [newsRows]);
  return (
    <>
       <PageWrapper >
        <AddButton  onClick={() => dispatchDialog({type: 'OPEN_ADD'})} label="+ New News"/>
          {errorMessage && (
            <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
          )}
         
        {successMessage && (
           <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
        )}
       
           <AddNewsDialog
        open={dialogState.dialog === 'add' }
        onClose={() => dispatchDialog({type: 'CLOSE'})}
        onSave={handleSaveNews}
        currentUser={currentUser}
      />
      <UpdateNewsDialog
        open={dialogState.dialog === 'update'}
        data={dialogState.payload} // row minimal {id}
        currentUser={currentUser}
        onClose={() => dispatchDialog({ type: 'CLOSE' })}
        onUpdated={handleUpdateNews} // <== handler update dipassing di sini
      />

        <CardContainer >
          <DataTable
            rows={newsRows}
            columns={createColumns({
             fields: [
            { field: 'title', headerName: 'TITLE', flex: 1.5 },
            { field: 'author', headerName: 'AUTHOR', flex: 0.5 },
            { field: 'status', headerName: 'STATUS', flex: 0.5 },
            { field: 'published_date', headerName: 'PUBLISHED DATE', flex: 0.5 },
              ],
            onDelete: (id) => dispatchDialog({ type: 'OPEN_DELETE', payload: id }),
            onEdit: (row) => dispatchDialog({ type: 'OPEN_UPDATE', payload: row }),
              })}
/>

        </CardContainer>
       </PageWrapper>
         
           {/* Dialog konfirmasi hapus */}
      <ConfirmDialog
        open={dialogState.dialog === 'delete'}
        title="Konfirmasi Hapus"
        content="Yakin mau menghapus news ini?"
        onConfirm={confirmDelete}
        onCancel={() => dispatchDialog({type: 'CLOSE'})}
      />
      

        
      
    </>
  )
}






