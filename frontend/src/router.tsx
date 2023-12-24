import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Leaderboard from "./pages/Leaderboard";
import SignUp from "./pages/SignUp";
import AuthLayout from "./pages/AuthLayout";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {
        path: "sign-up",
        element: <SignUp/>
      },
      {
        path: "sign-in",
        element: <SignIn/>
      },
      {
        path: "sign-out"
      }
    ]
  },
]);

export { router };
