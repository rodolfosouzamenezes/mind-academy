import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

import { Hero } from "./Hero";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Dashboard } from "./Dashboard";
import { CourseForm } from "./CourseForm";

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
        {
          path: "/cadastro",
          element: <SignUp />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/curso/:id",
          element: <CourseForm />,
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}