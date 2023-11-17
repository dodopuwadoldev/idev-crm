import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LayoutComponent from "../components/Layout";
const HomePage = lazy(
  () => import("../pages/Home")
);

export default function privateRoutes() {
  return {
    element: <LayoutComponent />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}