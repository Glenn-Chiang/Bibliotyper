import { Link } from "react-router-dom";
import { EmailField, PasswordField } from "./components/formFields";

export default function SignIn() {
  return (
    <>
      <EmailField/>
      <PasswordField/>
      <button className="bg-sky-500 text-white w-full">Sign In</button>
      <p>
        Don&apos;t have an account?{" "}
        <Link to={"/auth/sign-up"} className="text-sky-500 font-medium hover:underline underline-offset-8">
          Sign up now
        </Link>
      </p>
    </>
  );
}
