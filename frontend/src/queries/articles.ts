import { useQuery } from "react-query";
import { instance as axios } from "./axiosConfig";
import { ArticleData } from "../lib/types";

const useGetArticles = (articleTypeId: number, categoryId?: number) => {
  return useQuery({
      queryKey: ["categories", categoryId, "articles"], 
      queryFn: async () => {
        const res = await axios.get("/articles", {
          params: { articleTypeId, categoryId },
        });
        const articles: ArticleData[] = res.data
        console.log(articles)
        return articles;
      }
    })
  }


export { useGetArticles };
