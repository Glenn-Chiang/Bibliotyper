import { useMutation, useQuery, useQueryClient } from "react-query";
import { HighScore, Score, ScorePayload } from "../../lib/types";
import { axiosInstance as axios } from "./axiosConfig";

export const useGetUserScores = (
  userId: string | null,
  time?: number,
  sort?: string
) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["users", userId, time, "scores", sort],
    queryFn: async () => {
      const res = await axios.get(`/users/${userId}/scores`, {
        params: {
          time,
          sort,
        },
      });
      const scores: Score[] = res.data;
      return scores;
    },
  });
};

export const useSaveScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      time,
      author,
      wpm,
      accuracy,
    }: ScorePayload) => {
      const res = await axios.post(`/users/${userId}/scores`, {
        time,
        author,
        wpm,
        accuracy,
      });
      const score: Score = res.data;
      return score;
    },
    onSuccess: async (score: Score) => {
      await queryClient.invalidateQueries(["users", score.userId, score.time]);
    },
  });
};

export const useGetUserBest = (userId: string | null, time: number) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["users", userId, time, "highScore"],
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
      const scores: HighScore[] = res.data;
      return scores;
    },
  });
};
