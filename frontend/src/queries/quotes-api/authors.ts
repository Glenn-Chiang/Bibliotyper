import { useQuery } from "react-query";
import { instance as axios } from "./axiosConfig";
import { Author } from "../../lib/types";

export const useGetAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await axios.get("/authors")
      const authors: Author[] = res.data
      return authors
    }
  })
}

