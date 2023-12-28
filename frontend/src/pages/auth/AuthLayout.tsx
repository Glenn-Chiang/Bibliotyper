import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="w-full bg-white flex flex-col gap-4 justify-center items-center">
      <div className="p-4 w-full sm:w-2/3">
        <Outlet />
      </div>
    </main>
  );
}
