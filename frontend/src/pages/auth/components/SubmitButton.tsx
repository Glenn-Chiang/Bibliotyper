import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SubmitButtonProps = {
  onClick?: () => void;
  pending?: boolean;
  label: string;
};

export const SubmitButton = ({
  onClick,
  pending,
  label,
}: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
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
