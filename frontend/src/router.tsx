import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

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
        path: "/categories/:categoryId",
        element: <CategoryPage/>
      }
    ],
  },
]);

export { router };
