import { Container } from "@mui/material"

export default function PageWrapper({children}) {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        bgcolor: '#f5f5f5', // warna abu-abu muda
        minHeight: '100vh', // biar penuh 1 layar
          overflowX: 'hidden' ,
        py: 4               // padding atas bawah
      }}
    >
      
     
      {children}
    </Container>
  )
}