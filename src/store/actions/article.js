import { http } from "@/utils";
//获取频道
export const getChannels = () => {
  return async (dispatch) => {
    const data = await http.get("/channels");
    dispatch({ type: "article/setChannels", payload: data.channels });
  };
};
//获取文章列表
export const getArticles = (params) => {
  return async (dispatch) => {
    const data = await http.get("/mp/articles", { params });
    dispatch({ type: "article/setArticles", payload: data });
  };
};
//删除文章
export const delArticle = (id) => {
  return async (dispatch) => {
    await http.delete("/mp/articles/" + id);
  };
};
//添加文章
export const addArticle = (data, draft = false) => {
  return async (dispatch) => {
    await http.post(`mp/articles?draft=${draft}`, data);
  };
};
//获取单个文章
export const getArticle = (id) => {
  return async () => {
    const data = await http.get(`/mp/articles/${id}`);
    return data;
  };
};
//修改文章
export const editArticle = (data, draft) => {
  return async () => {
    await http.put(`/mp/articles/${data.id}?draft=${draft}`, data);
  };
};
