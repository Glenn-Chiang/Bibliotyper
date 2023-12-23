import { useContext } from "react";
import { GameStateContext } from "../contexts/GamestateContext";

type TimeDropdownProps = {
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
}

export const TimeDropdown = ({handleChange}: TimeDropdownProps) => {
  const timeOptions = [15, 30, 60, 120, 300];

  const gameState = useContext(GameStateContext)
  const disabled = gameState != "pre-game";
  
  return (
    <select
      onChange={handleChange}
      className={`p-2 rounded-md bg-slate-100 ${
        disabled && "opacity-40 cursor-not-allowed"
      }`}
      disabled={disabled}
    >
      {timeOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}