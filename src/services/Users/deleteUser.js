import API from '../api';
import { handleApiError } from '../../utils/apiHandlers';

export const deleteUser = async (id) => {
  try {
    await API.delete(`/delete`, {
  data: { id } 
    });
    return {
      success: true,
      successMessage: 'User berhasil dihapus',
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: handleApiError(error),
    };
  }
};
