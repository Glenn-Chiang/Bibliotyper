import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseError } from "firebase/app";
import { User, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../components/ErrorMessage";
import { auth } from '../../firebase';
import { parseFirebaseError } from "../../lib/helpers/parseFirebaseError";
import { SubmitButton } from "./components/SubmitButton";

export default function VerifyEmail() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUser = auth.currentUser as User;

  const handleClickResend = async () => {
    setPending(true);
    try {
      await sendEmailVerification(currentUser);
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

  const [verified, setVerified] = useState(currentUser?.emailVerified)
  const confirmVerification = async () => {
    await currentUser?.getIdToken(true)
    if (currentUser?.emailVerified) {
      setVerified(true)
    }
  }

  if (verified) {
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
        onClick={confirmVerification}
        label="Confirm verification"
      />
    </div>
  );
}
