import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { actionCodeSettings } from "../../auth/actionCodeSettings";
import { useCurrentUser } from "../../auth/useCurrentUser";
import { SubmitButton } from "./components/SubmitButton";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const [pending, setPending] = useState(false);
  const currentUser = useCurrentUser();

  const handleClickResend = async () => {
    setPending(true);
    if (currentUser) {
      await sendEmailVerification(currentUser, actionCodeSettings);
    }
    setPending(false);
    toast("Verification email sent", { type: "success" });
  };

  if (currentUser?.emailVerified) {
    return <p className="text-center">Your email has been verified</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Welcome to Bibliotyper!</h1>
      <p className="text-center">
        To secure your account and unlock all features, please verify your email
        by clicking the link we've sent to your inbox.
      </p>
      <SubmitButton
        onClick={handleClickResend}
        label="Resend"
        pending={pending}
      />
    </div>
  );
}
