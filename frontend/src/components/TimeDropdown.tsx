import { useContext } from "react";
import { GameStateContext } from "../contexts/GamestateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type TimeDropdownProps = {
  selectedValue: number;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const TimeDropdown = ({
  selectedValue,
  handleChange,
}: TimeDropdownProps) => {
  const timeOptions = [15, 30, 60, 120, 300];

  const gameState = useContext(GameStateContext);
  const disabled = gameState === "in-game" || gameState === "post-game";

  return (
    <div className="flex gap-2 items-center">
      <label className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faClock} />
        Time limit
      </label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className={disabled ? "opacity-40 cursor-not-allowed" : ""}
        disabled={disabled}
      >
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};
