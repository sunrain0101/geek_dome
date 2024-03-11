import store from "@/store";
import axios from "axios";
import { customHistory } from "./history";
import { logout } from "@/store/actions";
import { message } from "antd";
const http = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});
http.interceptors.response.use(
  (res) => {
    return res?.data?.data || res;
  },
  (e) => {
    if (e.response?.status === 401) {
      message.error("登录失败");
      store.dispatch(logout());
      if (customHistory.location.pathname !== "/login") {
        customHistory.push({
          pathname: "/login",
          state: { from: customHistory.location.pathname },
        });
      }
    }
    Promise.reject(e);
  }
);
http.interceptors.request.use(
  (config) => {
    const state = store.getState();
    if (state.user.token) {
      config.headers.Authorization = `Bearer ${state.user.token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);
export { http };
