import API from './api'

export const login = async ({ email, password }) => {
  const { data } = await API.post("/auth/login", { email, password });
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const register = async ({ username, email, password }) => {
  const { data } = await API.post("/auth/register", { username, email, password });
  return data;
};

export const forgotPassword = async ({ email }) => {
  const { data } = await API.post("/auth/forgot-password"/*contoh*/, { email });
  return data;
};

export const resetPassword = async ({token,password}) => {
  const {data} = await API.post(`/auth/reset-password/${token}`/*contoh*/, {password})
  return data;
}

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth";
};

