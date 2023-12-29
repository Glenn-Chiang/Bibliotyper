import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RootLayout() {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={user}>
      <Navbar />
      <div className="mt-16 p-4">
        <Outlet />
      </div>
      <ToastContainer/>
    </AuthContext.Provider>
  );
}

export default RootLayout;
