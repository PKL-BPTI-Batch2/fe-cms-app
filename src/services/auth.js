import API from './api'

export const login = async ({ email, password }) => {
  const { data } = await API.post("/login"/*contoh*/, { email, password });
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const register = async ({ username, email, password }) => {
  const { data } = await API.post("/register"/*contoh*/, { username, email, password });
  return data;
};

export const forgotPassword = async ({ email }) => {
  const { data } = await API.post("/forgot-password"/*contoh*/, { email });
  return data;
};

export const resetPassword = async ({token,password}) => {
  const {data} = await API.post("/reset-password"/*contoh*/, {token,password})
  return data;
}

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth";
};

