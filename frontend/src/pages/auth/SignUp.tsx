import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { EmailField, PasswordField } from "./components/formFields";
import { AuthFormFields } from "./types/AuthFormFields";
import { signUp } from "../../auth/signUp";
import { useState } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { SubmitButton } from "./components/SubmitButton";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormFields>();
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AuthFormFields> = async (fields) => {
    const { email, password } = fields;
    try {
      setPending(true);
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 "
    >
      <h1>Create an account</h1>
      <EmailField register={register} error={emailError} disabled={pending} />
      <PasswordField
        register={register}
        error={passwordError}
        disabled={pending}
      />
      {error && <ErrorMessage message={error} />}
      <SubmitButton label="Sign Up" pending={pending} />
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
