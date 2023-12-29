import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { createUser } from "../queries/backend/users";
import { actionCodeSettings } from "./actionCodeSettings";

const auth = getAuth();

export const signUpWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  // Register user with firebase
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userId = user.uid;

  // Add user record to db
  await createUser(userId, email, username);

  await sendEmailVerification(user, actionCodeSettings)
  
};
