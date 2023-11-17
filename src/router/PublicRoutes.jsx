import { Navigate } from "react-router-dom";
import Loginform from "../pages/Login";

export default function routes() {
  return [
    { path: "/login", element: <Loginform /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}