import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Hero } from "./Hero";
import { Login } from "./Login";
import App from "../App";

export function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Hero />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}