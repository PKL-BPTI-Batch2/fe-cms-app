import API from '../api'
import { handleApiError ,handleApiSuccess} from '../../utils/apiHandlers'


export const deleteNews = async (id) => {
    try {
        const res = await API.delete("/del/news",{data: {id}});

        return {
            success: true,
            successMessage: handleApiSuccess(res)

        };
    } catch (error) {
        return {
            success: false,
            errorMessage: handleApiError(error)
        }
    }
    
}