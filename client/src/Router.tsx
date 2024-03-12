import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);
