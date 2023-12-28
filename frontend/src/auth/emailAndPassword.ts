import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { createUser, getUserByUsername } from "../queries/backend/users";

const auth = getAuth();

export const signUpWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  // Check if a user with this username already exists
  const existingUser = await getUserByUsername(username);
  if (existingUser.length > 0) {
    throw new Error("Username is in use");
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userId = user.uid;

  await createUser(userId, email, username);
};
