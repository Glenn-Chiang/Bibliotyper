import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { createUser } from "../queries/backend/users";

const auth = getAuth();

export const signUpWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const userId = user.uid;

  await createUser(userId, email, username);
};
