import { useQuery } from "react-query";
import { instance as axios } from "./axiosConfig";

const useGetArticles = (articleTypeId: number, categoryId?: number) => {
  return useQuery({
      queryKey: ["categories", categoryId, "articles"], 
      queryFn: async () => {
        const res = await axios.get("/article", {
          params: { articleTypeId, categoryId },
        });
        return res.dataw;
      }
    })
  }


export { useGetArticles };
