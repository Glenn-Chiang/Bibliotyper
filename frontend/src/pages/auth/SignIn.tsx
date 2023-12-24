import { Link } from "react-router-dom";
import { EmailField, PasswordField } from "./components/formFields";
import { useForm } from "react-hook-form";
import { AuthFormFields } from "./types/AuthFormFields";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormFields>();
  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const emailAttrs = { ...register("email") };
  const passwordAttrs = { ...register("password") };

  return (
    <form className="flex flex-col items-center gap-4 ">
      <EmailField attributes={emailAttrs} error={emailError} />
      <PasswordField attributes={passwordAttrs} error={passwordError} />
      <button className="bg-sky-500 text-white w-full">Sign In</button>
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
