import API from '../api';
import { handleApiError } from '../../utils/apiHandlers';

export const updateUser = async (data) => {
  try {
    const res = await API.put(`/update/${data.id}`, data);

    return {
      success: true,
      successMessage: res.data.message,
      updatedRow: {
        id: data.id,
        name: data.username,
        role: data.role,
      },
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: handleApiError(error),
    };
  }
};
