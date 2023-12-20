import { useQuery } from "react-query";
import { instance as axios } from "./axiosConfig";
import { Quote } from "../../lib/types";

// Get a given number of random quotes from given author
export const useGetQuotes = (author: string, count: number) => {
  return useQuery({
    queryKey: ["quotes", "author"],
    queryFn: async () => {
      const res = await axios.get(`/authors/${author}/quotes?count=${count}`)
      const quotes: Quote[] = res.data
      return quotes
    }
  })
}