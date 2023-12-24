import { useState } from "react";
import { SubmitButton } from "./components/SubmitButton";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

export default function SignOut() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate()

  const handleSignout = async () => {
    setPending(true)
    await signOut(auth);
    navigate("/auth/sign-in")
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      Are you sure you want to sign out?
      <SubmitButton
        onClick={handleSignout}
        pending={pending}
        label="Sign Out"
      />
    </div>
  );
}
