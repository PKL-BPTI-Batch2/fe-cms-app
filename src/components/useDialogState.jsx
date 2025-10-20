// src/hooks/useDialogState.js
import { useReducer } from 'react';

const initialDialogState = { dialog: null, payload: null };

function dialogReducer(state, action) {
  switch (action.type) {
    case 'OPEN_ADD':
      return { dialog: 'add', payload: null };
    case 'OPEN_UPDATE':
      return { dialog: 'update', payload: action.payload }; // row berita untuk edit
    case 'OPEN_DELETE':
      return { dialog: 'delete', payload: action.payload }; // id berita untuk hapus
    case 'CLOSE':
      return { dialog: null, payload: null };
    default:
      return state;
  }
}

export function useDialogState() {
  return useReducer(dialogReducer, initialDialogState);
}
