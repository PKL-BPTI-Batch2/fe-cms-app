import API from '../api';
import { handleApiError , handleApiSuccess} from '../../utils/apiHandlers';

export const addNews = async (newData) => {
  try {
    const  res  = await API.post("/add/news", newData);
    const body = res.data;
    const d = body.data;

    // mapping supaya sesuai DataTable
    const newRow = {
      id: d.id,
      title: d.title,
      author: d.author_name,
      status: d.status,
      published_date: d.published_date
      ? new Date(d.published_date).toLocaleDateString('id-ID') 
      : '-',
    };

    return { 
      success: true,
      successMessage: handleApiSuccess(res), 
      newRow };
  } catch (error) {
    return { 
      success: false,
       errorMessage: handleApiError(error) };
  }
};
