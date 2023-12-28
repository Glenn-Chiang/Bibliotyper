import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { redirect } from "react-router";
import { createUser } from "../queries/backend/users";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authenticateWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  const userId = user.uid;
  const email = user.email as string;
  const username = user.displayName as string;

  // If user is already registered, sign them in
  const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser;

  // If user has not registered, create an account for them
  if (isNewUser) {
    await createUser(userId, email, username);
    console.log("User created");
  }

  redirect("/");
};
