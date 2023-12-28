import {
  getAdditionalUserInfo,
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink
} from "firebase/auth";
import { createUser } from "../queries/backend/users";
import { actionCodeSettings } from "./actionCodeSettings";

const auth = getAuth();

export const sendEmailLink = async (email: string) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  localStorage.setItem("emailForSignIn", email);
};

export const authenticateWithEmailLink = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn")
    if (!email) {
      email = window.prompt("Please provide your email for confirmation")
    }
    
    const userCredential = await signInWithEmailLink(auth, email as string, window.location.href)
    window.localStorage.removeItem("emailForSignIn")
    
    const user = userCredential.user;
    const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser

    if (isNewUser) {
      await createUser(user.uid, user.email as string, user.displayName as string);
    }
  }
}