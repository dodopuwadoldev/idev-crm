import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LayoutComponent from "../components/Layout";
const HomePage = lazy(() => import("../pages/Home"));
const StaffsPage = lazy(() => import("../pages/Staffs"));
import { staffs } from "./../schema/index";

export default function privateRoutes() {
  return {
    element: <LayoutComponent />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <Navigate to="/" replace /> },
      { path: "/staffs", element: <StaffsPage /> },
    ],
  };
}
