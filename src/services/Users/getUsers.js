import API from '../api';
import { handleApiError } from '../../utils/apiHandlers';

export const getUsers = async () => {
  try {
    const { data } = await API.get('/');

    const mapped = data
      .map((item) => ({
        id: item.id,
        name: item.username,
        role: item.role,
      }))
      .sort((a, b) => b.id - a.id);

    return {
      success: true,
      mapped,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: handleApiError(error),
    };
  }
};
