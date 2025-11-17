import API from '../api';
import { handleApiError } from '../../utils/apiHandlers';

export const getUserById = async (id) => {
  try {
    const { data } = await API.post('/showuser', { id });

    return {
      success: true,
      user: data,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: handleApiError(error),
    };
  }
};
