import { AxiosError } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";
import { auth } from "../../firebase";
import { SubmitButton } from "./components/SubmitButton";
import { EmailField, PasswordField } from "./components/formFields";
import { SignInFields } from "./types/AuthFormFields";
import { GoogleButton } from "./components/GoogleButton";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>();

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  const emailAttrs = {
    ...register("email", { required: "Email is required" }),
  };
  const passwordAttrs = {
    ...register("password", { required: "Password is required" }),
  };

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignInFields> = async (fields) => {
    try {
      const { email, password } = fields;
      setPending(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setPending(false);
      if (error instanceof AxiosError) {
        setError(error.response?.data);
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
      <SubmitButton label="Sign In" pending={pending} />

      <div>OR</div>
      <GoogleButton />

      <p>
        Don&apos;t have an account?{" "}
        <Link
          to={"/auth/sign-up"}
          className="text-sky-500 font-medium hover:underline underline-offset-8"
        >
          Sign up now
        </Link>
      </p>
    </form>
  );
}
