import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Gamestate } from "../lib/types";

type SettingsMenuProps = {
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  gameState: Gamestate;
};

export const SettingsMenu = ({
  gameState,
  handleChange,
}: SettingsMenuProps) => {
  const timeOptions = [15, 30, 60, 120];
  const disabled = gameState != "pre-game"

  return (
    <menu className="rounded-md p-2 border-2 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label className="text-sky-500 flex gap-2 items-center">
          <FontAwesomeIcon icon={faClock} />
          Time limit
        </label>
        <select
          onChange={handleChange}
          className={`p-2 rounded-md bg-slate-100 ${disabled && "opacity-40 cursor-not-allowed"}`}
          disabled={disabled}
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
    </menu>
  );
};
