import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoutes from "./router/PrivateRoutes";
import PublicRoute from "./router/PublicRoutes";
import UserProvider from "./context/userContext";
import { ColorModeContextProvider } from "./context/Themecontext";
function App() {
  const checkAuth = localStorage.getItem("access_token");
  const router = createBrowserRouter([
    checkAuth ? PrivateRoutes() : {},
    ...PublicRoute(),
  ]);
  return (
    <ColorModeContextProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ColorModeContextProvider>
  );
}

export default App;
