import { ActionCodeSettings } from "firebase/auth";

export const actionCodeSettings: ActionCodeSettings = {
  url: import.meta.env.BASE_URL,
  handleCodeInApp: true,
}