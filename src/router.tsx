import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home/>
      }
    ],
  },
]);

export { router };
