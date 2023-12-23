import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useCurrentUser = () => {
  const userAccount = useContext(AuthContext);
  const user = userAccount ? {id: userAccount.uid, username: userAccount.displayName} : null
  return user
};
