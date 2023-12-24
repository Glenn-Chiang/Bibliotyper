import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="email"
          className="flex gap-2 items-center text-sky-500 "
        >
          <FontAwesomeIcon icon={faEnvelope} />
          Email
        </label>
        <input id="email" type="email" className="bg-slate-100 p-2 rounded" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="password"
          className="flex gap-2 items-center text-sky-500 "
        >
          <FontAwesomeIcon icon={faLock} />
          Password
        </label>
        <input
          id="password"
          type="password"
          className="bg-slate-100 p-2 rounded"
        />
      </div>
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
