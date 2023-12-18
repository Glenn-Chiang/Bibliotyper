import { instance as axios } from "./axiosConfig";

const getArticles = async (articleTypeId: number, categoryId?: number) => {
  const res = await axios.get("/article", {
    params: { articleTypeId, categoryId },
  });
  
  return res;
};

export { getArticles };
