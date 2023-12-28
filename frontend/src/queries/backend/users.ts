import { axiosInstance as axios } from "./axiosConfig";

export const createUser = async (
  userId: string,
  email: string,
  username: string
) => {
  const res = await axios.post("/users", { userId, email, username });

  return res.data;
};

// Used to check if a user with this username already exists
export const getUserByUsername = async (username: string) => {
  const res = await axios.get("/users", {
    params: {
      username,
    },
  });

  return res.data;
};

export const getUserById = async (userId: string) => {
  const res = await axios.get(`/users/${userId}`)
  return res.data
}