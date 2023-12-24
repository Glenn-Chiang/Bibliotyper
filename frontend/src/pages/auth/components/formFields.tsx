import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { AuthFormFields } from "../types/AuthFormFields";

type FormFieldProps = {
  error?: string;
  register: UseFormRegister<AuthFormFields>;
};

export const EmailField = ({ error, register }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="email" className="flex gap-2 items-center text-sky-500 ">
        <FontAwesomeIcon icon={faEnvelope} />
        Email
      </label>
      {error && <ErrorMessage message={error} />}
      <input
        id="email"
        type="email"
        {...register("email", { required: "Email is required" })}
        className="bg-slate-100 p-2 rounded"
      />
    </div>
  );
};

export const PasswordField = ({ error, register }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="password"
        className="flex gap-2 items-center text-sky-500 "
      >
        <FontAwesomeIcon icon={faLock} />
        Password
      </label>
      {error && <ErrorMessage message={error} />}
      <input
        id="password"
        type="password"
        {...register("password", { required: "Password is required" })}
        className="bg-slate-100 p-2 rounded"
      />
    </div>
  );
};
