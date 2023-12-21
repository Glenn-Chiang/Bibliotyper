import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="p-2 rounded bg-rose-100 text-rose-500 flex items-center gap-2">
      <FontAwesomeIcon icon={faExclamationCircle} />
      {message}
    </p>
  );
};
