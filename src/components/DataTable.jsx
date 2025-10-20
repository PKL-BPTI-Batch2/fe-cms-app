import { DataGrid } from "@mui/x-data-grid"

export default function DataTable({rows,columns}) {
  
  return(
     <DataGrid
  rows={rows}
  columns={columns}
  autoHeight
  disableSelectionOnClick
  hideFooterSelectedRowCount
  // jangan disableColumnMenu supaya titik 3 tetap ada
  sx={{
    border: 0, // hilangin border luar
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f8f9fb',
      borderBottom: '1px solid #e0e0e0',
      fontWeight: 'bold'
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none', // hilangkan garis vertikal pemisah header
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #f0f0f0' // garis horizontal antar cell
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: '1px solid #e0e0e0'
    }
  }}
/>
  )
}