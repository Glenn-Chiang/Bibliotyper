import { faClock, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SettingsMenuProps = {
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const SettingsMenu = ({handleChange}: SettingsMenuProps) => {
  const timeOptions = [30, 60, 120];

  return (
    <menu className="rounded-md p-2 border-2 flex flex-col gap-2">
      <span className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faGear} />
        Settings
      </span>
      <div className="flex gap-2 items-center">
        <label className="text-sky-500 flex gap-2 items-center">
          <FontAwesomeIcon icon={faClock} />
          Time limit
        </label>
        <select onChange={handleChange} className="p-2 rounded-md bg-slate-100">
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
