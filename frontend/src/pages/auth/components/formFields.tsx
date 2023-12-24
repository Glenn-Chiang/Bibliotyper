import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EmailField = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="email" className="flex gap-2 items-center text-sky-500 ">
        <FontAwesomeIcon icon={faEnvelope} />
        Email
      </label>
      <input id="email" type="email" className="bg-slate-100 p-2 rounded" />
    </div>
  );
};

export const PasswordField = () => {
  return (
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
  );
};
