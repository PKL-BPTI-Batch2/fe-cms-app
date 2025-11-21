// src/components/News/getNewsById.js
import API from '../api';
import { handleApiError } from '../../utils/apiHandlers';

export const getNewsById = async (id) => {
  try {
    const { data } = await API.post('/view/newsbyid', { id });
    const mapped = {
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.author_name,
      status: data.status,
      published_date: data.published_date
        ? new Date(data.published_date).toLocaleDateString('id-ID')
        : '',
    };
    return { success: true, data: mapped };
  } catch (error) {
    return { success: false, errorMessage: handleApiError(error) };
  }
};
