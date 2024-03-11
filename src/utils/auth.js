const TOKEN_KEY = "itcast_geek_pc";

//获取token
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || "";
};

const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const clearToken = () => {
  localStorage.clear(TOKEN_KEY);
};

export { getToken, setToken, clearToken };
