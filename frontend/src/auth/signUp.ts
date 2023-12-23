import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userId = user.uid;
    const username = user.displayName;
    const avatarUrl = user.photoURL;

    await axios.post(
      "/users",
      { userId, email, username, avatarUrl },
      {
        baseURL: import.meta.env.VITE_API_URL,
      }
    );
  } catch (error) {
    console.log("Error signing up:", error);
  }
};
