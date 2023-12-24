import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="w-full bg-white flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl flex flex-col gap-2 items-center">
        <FontAwesomeIcon
          icon={faKeyboard}
          className="text-6xl text-sky-500"
        />
        Welcome to Bibliotyper
      </h1>
      <div className="p-4 w-full sm:w-2/3">
        <Outlet />
      </div>
    </main>
  );
}
