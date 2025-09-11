//handle error
export function handleApiError(error) {
    return error.response?.data?.message || 
    error.response?.data?.error||
     "terjadi kesalahan di server";
};
//handle succes
export function handleApiSuccess(response, defaultMessage="berhasil") {
    return response?.data?.message || defaultMessage;
};
