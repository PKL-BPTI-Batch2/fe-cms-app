//handle error
export function handleApiError(error) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Jika bukan admin
    if (status === 403) {
        return "Anda tidak memiliki akses";
    }
    return data?.message ||
           data?.error ||
           "Terjadi kesalahan di server";
};
//handle succes
export function handleApiSuccess(response, defaultMessage="berhasil") {
    return response?.data?.message || defaultMessage;
};
