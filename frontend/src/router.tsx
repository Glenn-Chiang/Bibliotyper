import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Leaderboard from "./pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/stats",
        element: <Stats/>
      },
      {
        path: "/leaderboard",
        element: <Leaderboard/>
      }
    ],
  },
]);

export { router };
