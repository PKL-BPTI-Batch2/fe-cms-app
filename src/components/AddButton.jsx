import { Box, Button } from "@mui/material"

export default function AddButton({label,onClick}) {
  return (
     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={onClick} >
          {label}
        </Button>
      </Box>
  )
}