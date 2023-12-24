import { Link } from "react-router-dom";
import { EmailField, PasswordField } from "./components/formFields";

export default function SignUp() {
  

  return (
    <>
      <h1>Create an account</h1>
      <EmailField />
      <PasswordField />
      <button className="bg-sky-500 text-white w-full">Sign Up</button>
      <p>
        Already have an account?{" "}
        <Link
          to={"/auth/sign-in"}
          className="font-medium hover:underline underline-offset-8 text-sky-500"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
