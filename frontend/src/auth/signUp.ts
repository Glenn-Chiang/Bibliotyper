import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {

  // Check if a user with this username already exists
  const existingUser = (await axios.get(
    "/users",{
      baseURL: import.meta.env.VITE_API_URL,
      params: {
        username
      }
    }
  )).data

  if (existingUser.length > 0) {
    throw new Error("Username is already taken")
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userId = user.uid;

  const res = await axios.post(
    "/users",
    { userId, email, username },
    {
      baseURL: import.meta.env.VITE_API_URL,
    }
  );

  return res.data;
};
