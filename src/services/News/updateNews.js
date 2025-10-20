// src/components/News/updateNews.js
import API from '../api';
import { handleApiError, handleApiSuccess } from '../../utils/apiHandlers';

export const updateNews = async (newsData) => {
  try {
    const { data } = await API.put('/upd/news', newsData);
    const updatedRow = {
      id: newsData.id,
      title: newsData.title,
      author: newsData.author,
      status: newsData.status,
      published_date:
        newsData.status?.toLowerCase() === 'draft'
          ? '-'
          : new Date().toLocaleDateString('id-ID'),
    };

    return {
      success: true,
      successMessage: handleApiSuccess(data),
      updatedRow,
    };
  } catch (error) {
    return { success: false, errorMessage: handleApiError(error) };
  }
};
