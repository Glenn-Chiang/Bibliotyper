import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

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

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log("Error signing in:", error)
  }
}