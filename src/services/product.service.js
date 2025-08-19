import axios from "axios";

export const getProducts = () => {
    return axios
    .get ('/api/users')
    .then((res) => res.data)
    .catch((err) => {
        console.log(err);
        throw err;
    });
};
