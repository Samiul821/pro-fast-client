import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../Pages/Auth/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import LoadingSpinner from "../Pages/shared/LoadingSpinner";
import AddParcelForm from "../Pages/AddParcel/AddParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch('./branches.json'),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
      },
      {
        path: "/add-parcel",
        Component: AddParcelForm
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
