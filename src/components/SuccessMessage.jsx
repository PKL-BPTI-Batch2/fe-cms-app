import { Alert } from "@mui/material";
import useAutoClearMessage from "../utils/useAutoClearMessage";
export default function SuccessMessage({message,onClose}) {
  
  useAutoClearMessage(message,onClose);
  return (
     <Alert
      severity="success"
      onClose={onClose}
      sx={{
        mb: 2,
        backgroundColor: '#4de72bfa',
        color: '#fff'
      }}
    >
      {message}
    </Alert>
  )
}