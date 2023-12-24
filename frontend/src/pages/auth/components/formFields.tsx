import { faEnvelope, faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "../../../components/ErrorMessage";

type FormFieldProps = {
  error?: string;
  attributes: UseFormRegisterReturn
  disabled: boolean
};

export const UsernameField = ({ error, attributes, disabled }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="username" className="flex gap-2 items-center text-sky-500 ">
        <FontAwesomeIcon icon={faUserCircle} />
        Username
      </label>
      {error && <ErrorMessage message={error} />}
      <input
        id="username"
        {...attributes}
        disabled={disabled}
        className="bg-slate-100 p-2 rounded"
      />
    </div>
  );
};

export const EmailField = ({ error, attributes, disabled }: FormFieldProps) => {
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
        {...attributes}
        disabled={disabled}
        className="bg-slate-100 p-2 rounded"
      />
    </div>
  );
};

export const PasswordField = ({ error, attributes, disabled }: FormFieldProps) => {
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
        {...attributes}
        disabled={disabled}
        className="bg-slate-100 p-2 rounded"
      />
    </div>
  );
};
