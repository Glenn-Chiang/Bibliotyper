import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { createUser, getUserById } from "../queries/backend/users";
import { redirect } from "react-router";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  const userId = user.uid;
  const email = user.email as string;
  const username = user.displayName as string;

  // If user is already registered, sign them in
  const existingUser = await getUserById(userId);
  console.log("User has already signed up. Proceeding to sign in.");
  // If user has not registered, create an account for them
  if (!existingUser) {
    console.log("Creating user...");
    await createUser(userId, email, username);
    console.log("User created");
  }

  redirect("/");
};
