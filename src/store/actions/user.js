import { clearToken, http, setToken } from "@/utils";
//登录action
export const login = (mobile, code) => {
  return async (dispatch) => {
    console.log(mobile, code);
    const data = await http.post("/authorizations", {
      mobile,
      code,
    });
    setToken(data.token);
    dispatch({ type: "user/setToken", payload: data.token });
  };
};
//获取用户信息
export const getUserInfo = () => {
  return async (dispatch) => {
    const data = await http.get("/user/profile");
    dispatch({ type: "user/setName", payload: data.name });
  };
};

//退出登录
export const logout = () => {
  return (dispatch) => {
    clearToken();
    dispatch({ type: "user/setToken", payload: "" });
    dispatch({ type: "user/setName", payload: "" });
  };
};
