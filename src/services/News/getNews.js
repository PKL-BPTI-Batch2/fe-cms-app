import API from '../api';
import { handleApiError } from '../../utils/apiHandlers';
export const getNews = async () => {
    try {
       const { data } = await API.get('/view/news');

        const mapped = data
        .map(item => ({
          id: item.id,
          title: item.title,
          author: item.author_name,
          status: item.status,
          published_date: item.published_date 
          ? new Date(item.published_date).toLocaleDateString('id-ID')
          : '-',
        }))
        .sort((a, b) => b.id - a.id);

        return {
            success: true,
            mapped
        };
    } catch (error) {
      return {
            success: false,
            errorMessage: handleApiError(error)
      }
    }
     
    
  };