import { FirebaseError } from "firebase/app";

export const parseFirebaseError = (error: FirebaseError): string => {
  return error.code.split("/")[1].split("-").join(" ");
}