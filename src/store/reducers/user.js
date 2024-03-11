import { getToken } from "@/utils";

//存储登录token
const initialState = {
  token: getToken(),
  name: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    //设置token
    case "user/setToken":
      return {
        ...state,
        token: action.payload,
      };
    //设置name
    case "user/setName":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default user;
