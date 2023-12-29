import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useCurrentUser = () => {
  const userAccount = useContext(AuthContext);
  const user = userAccount ? {...userAccount, id: userAccount.uid} : null
  return user
};
