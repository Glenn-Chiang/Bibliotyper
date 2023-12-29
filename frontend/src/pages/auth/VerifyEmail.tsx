import { FirebaseError } from "firebase/app";
import { User, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCurrentUser } from "../../auth/useCurrentUser";
import { ErrorMessage } from "../../components/ErrorMessage";
import { parseFirebaseError } from "../../lib/helpers/parseFirebaseError";
import { SubmitButton } from "./components/SubmitButton";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function VerifyEmail() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useCurrentUser() as User;
  console.log("Email verified:", currentUser?.emailVerified);

  const handleClickResend = async () => {
    setPending(true);
    try {
      await sendEmailVerification(auth.currentUser as User);
      toast("Verification email sent", { type: "success" });
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(parseFirebaseError(error));
      } else {
        setError((error as Error).message);
      }
    }
    setPending(false);
  };

  if (currentUser?.emailVerified) {
    return (
      <p className="flex items-center justify-center gap-2">
        <FontAwesomeIcon icon={faCheckCircle} className="text-teal-500 text-2xl" />
        Your email has been verified
      </p>
    );
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
      {error && <ErrorMessage message={error} />}
      <p className="text-center">
        Once you have opened the link, click the button below to confirm that
        your email has been verified
      </p>
      <SubmitButton
        onClick={() => auth.currentUser?.getIdToken(true)}
        label="Confirm verification"
      />
    </div>
  );
}
