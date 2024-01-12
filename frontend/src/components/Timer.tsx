import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Timer = ({timeLeft}: {timeLeft: number}) => {
  return (
    <span className="text-sky-500 flex gap-2 items-center p-2">
      <FontAwesomeIcon icon={faClock} />
      {timeLeft}
    </span>
  );
};
