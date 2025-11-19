import API from '../api';
import { handleApiError } from '../../utils/apiHandlers';

export const addUser = async (userData) => {
  try {
    // Kirim ke endpoint baru /user/create
    const { data } = await API.post('/createUser', userData);

    const newRow = {
      id: data.id,
      name: data.username,
      role: data.role,
    };

    return {
      success: true,
      newRow,
      successMessage: 'User berhasil ditambahkan',
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: handleApiError(error),
    };
  }
};
