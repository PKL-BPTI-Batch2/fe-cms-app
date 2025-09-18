import React from 'react'
import { useEffect } from 'react'

function useAutoClearMessage(message, setMessage, delay = 3000  ){
  return (
    useEffect(()=> {
        if (message) {
            const timer = setTimeout(()=> setMessage(""),delay);
            return () => clearTimeout(timer);
        }
    },[message, setMessage, delay])
  
  )
}

export default useAutoClearMessage;