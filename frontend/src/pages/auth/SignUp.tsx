import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUpWithEmailAndPassword } from "../../auth/emailAndPassword";
import { ErrorMessage } from "../../components/ErrorMessage";
import { GoogleButton } from "./components/GoogleButton";
import { SubmitButton } from "./components/SubmitButton";
import {
  EmailField,
  PasswordField,
  UsernameField,
} from "./components/formFields";
import { SignUpFields } from "./types/AuthFormFields";
import { FirebaseError } from "firebase/app";
import { parseFirebaseError } from "../../lib/helpers/parseFirebaseError";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>();

  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  const usernameAttrs = {
    ...register("username", {
      required: "Username is required",
      maxLength: {
        value: 25,
        message: "Username cannot be longer than 25 characters",
      },
    }),
  };
  const emailAttrs = {
    ...register("email", { required: "Email is required" }),
  };
  const passwordAttrs = {
    ...register("password", { required: "Password is required" }),
  };

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFields> = async (fields) => {
    const { username, email, password } = fields;
    try {
      setPending(true);
      await signUpWithEmailAndPassword(username, email, password);
      navigate("/auth/verify-email");
      
    } catch (error) {
      setPending(false);

      if (error instanceof AxiosError) {
        setError(error.response?.data.message || "An error occurred");
      } else if (error instanceof FirebaseError) {
        setError(parseFirebaseError(error));
      } else {
        setError((error as Error).message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 "
    >
      <h1>Create an account</h1>
      <UsernameField
        attributes={usernameAttrs}
        error={usernameError}
        disabled={pending}
      />
      <EmailField
        attributes={emailAttrs}
        error={emailError}
        disabled={pending}
      />
      <PasswordField
        attributes={passwordAttrs}
        error={passwordError}
        disabled={pending}
      />

      {error && <ErrorMessage message={error} />}
      <SubmitButton label="Sign Up" pending={pending} />

      <div>OR</div>
      <GoogleButton />

      <p>
        Already have an account?{" "}
        <Link
          to={"/auth/sign-in"}
          className="font-medium hover:underline underline-offset-8 text-sky-500"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
