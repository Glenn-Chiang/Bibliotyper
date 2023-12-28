import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../auth/emailAndPassword";
import { ErrorMessage } from "../../components/ErrorMessage";
import { SubmitButton } from "./components/SubmitButton";
import { EmailField, UsernameField } from "./components/formFields";
import { SignUpFields } from "./types/AuthFormFields";
import { signUpWithGoogle } from "../../auth/google";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>();

  const usernameError = errors.username?.message;
  const emailError = errors.email?.message;

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

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFields> = async (fields) => {
    const { username, email, password } = fields;
    try {
      setPending(true);
      await signUp(username, email, password);
      navigate("/");
    } catch (error) {
      setPending(false);
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data);
      } else {
        setError((error as Error).message);
      }
    }
  };

  const handleGoogleClick = async () => {
    await signUpWithGoogle()
    navigate("/")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 "
    >
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
      {error && <ErrorMessage message={error} />}
      <SubmitButton label="Sign Up" pending={pending} />

      <div>OR</div>

      <button type="button" onClick={handleGoogleClick} className="bg-slate-100">
        <img src="https://google.com/favicon.ico" className="rounded-full" />
        Continue with Google
      </button>

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
