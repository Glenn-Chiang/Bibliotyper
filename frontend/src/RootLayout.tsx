import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";

function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="mt-16 p-4">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
