import { Alert } from "@mui/material";
import useAutoClearMessage from "../utils/useAutoClearMessage";
export default function ErrorMessage({message,onClose}) {
  useAutoClearMessage(message,onClose);
  return (
     <Alert
      severity="error"
      onClose={onClose}
      sx={{
        mb: 2,
        backgroundColor: '#ff2f2fff',
        color: '#fff'
      }}
    >
      {message}
    </Alert>
  )
}