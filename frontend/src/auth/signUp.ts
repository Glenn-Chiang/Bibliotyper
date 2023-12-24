import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userId = user.uid;
  const username = user.displayName;
  const avatarUrl = user.photoURL;

  const res = await axios.post(
    "/users",
    { userId, email, username, avatarUrl },
    {
      baseURL: import.meta.env.VITE_API_URL,
    }
  );

  return res.data
};
