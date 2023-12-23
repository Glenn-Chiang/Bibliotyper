import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const username = user.displayName;
    const avatarUrl = user.photoURL;

    await axios.post(
      "/users",
      {
        email,
        username,
        avatarUrl,
      },
      {
        baseURL: import.meta.env.VITE_API_URL,
      }
    );
  } catch (error) {
    console.log("Error signing up:", error);
  }
};
