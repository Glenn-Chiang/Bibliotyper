import { useMutation, useQuery, useQueryClient } from "react-query";
import { Score, ScorePayload } from "../../lib/types";
import { instance as axios } from "./axiosConfig";

export const useGetUserScores = (userId: number, time?: number) => {
  return useQuery({
    queryKey: ["users", userId, "scores", time],
    queryFn: async () => {
      const res = await axios.get(`/users/${userId}/scores`, {
        params: {
          time,
        },
      });
      const scores: Score[] = res.data;
      return scores;
    },
  });
};

export const useSaveScore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({userId, time, author, wpm, accuracy}: ScorePayload) => {
      const res = await axios.post(`/users/${userId}/scores`, {
        time, author, wpm, accuracy
      })
      const score: Score = res.data
      return score
    },
    onSuccess: async (score: Score) => {
      await queryClient.invalidateQueries(["users", score.userId, "scores", score.time])
    }
  })

}

export const useGetUserBest = (userId: number, time: number) => {
  return useQuery({
    queryKey: ["users", userId, "highScore", time],
    queryFn: async () => {
      const res = await axios.get(`/users/${userId}/highScore`, {
        params: {
          time,
        },
      });
      const highScore = res.data;
      return highScore;
    },
  });
};

export const useGetTopScores = (time: number) => {
  return useQuery({
    queryKey: ["topScores", time],
    queryFn: async () => {
      const res = await axios.get("/scores", {
        params: {
          time,
        },
      });
      const scores: Score[] = res.data;
      return scores;
    },
  });
};
