import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <main className="bg-white flex flex-col gap-4 justify-center items-center w-full p-4">
        <h1 className="text-3xl flex flex-col gap-2 items-center">
          <FontAwesomeIcon
            icon={faKeyboard}
            className="text-6xl text-sky-500"
          />
          Welcome to Bibliotyper
        </h1>
        <div className="p-4 w-full sm:w-1/2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
