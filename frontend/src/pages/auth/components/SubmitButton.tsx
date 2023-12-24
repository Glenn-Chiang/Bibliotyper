import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SubmitButtonProps = {
  pending: boolean;
  label: string;
};

export const SubmitButton = ({ pending, label }: SubmitButtonProps) => {
  return (
    <button
      disabled={pending}
      className={`${
        pending && "opacity-50 cursor-not-allowed"
      } bg-sky-500 text-white w-full flex justify-center items-center gap-2`}
    >
      {pending && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
      {label}
    </button>
  );
};
