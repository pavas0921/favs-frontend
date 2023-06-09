import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { HomePage, Dashboard, Favs } from "../pages";
import { Favsform, FavsUpdate } from "../components/FavsForm";
import { FavDetails } from "../components/FavDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Page not found!</div>,
  },
  {
    path: "/users",
    element: <Dashboard />,
  },
  {
    path: "/favs",
    element: <Favs />,
  },
  {
    path: "/fav/create",
    element: <Favsform />,
  },

  {
    path: "/fav/edit/:favid",
    element: <FavsUpdate />,
  },
  {
    path: "/fav/:favid",
    element: <FavDetails />,
  },
]);

export const CustomRouterProvider = () => (
  <RouterProvider router={router}></RouterProvider>
);
