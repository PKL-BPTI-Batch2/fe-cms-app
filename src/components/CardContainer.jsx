import { Paper } from "@mui/material"

export default function CardContainer({children}) {
  return (
     <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        <div style={{ width: '100%' }}>
          {children}
          </div>
        </Paper>
  )
}