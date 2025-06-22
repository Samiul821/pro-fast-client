import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import AuthLayout from "../layout/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
