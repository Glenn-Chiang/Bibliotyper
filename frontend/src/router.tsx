import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import RootLayout from "./pages/RootLayout";
import Stats from "./pages/Stats";
import AuthLayout from "./pages/auth/AuthLayout";
import SignIn from "./pages/auth/SignIn";
import SignOut from "./pages/auth/SignOut";
import SignUp from "./pages/auth/SignUp";

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
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "sign-up",
            element: <SignUp />,
          },
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-out",
            element: <SignOut />,
          },
        ],
      },
    ],
  },
]);

export { router };

