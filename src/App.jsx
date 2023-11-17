import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoutes from "./router/PrivateRoutes";
import PublicRoute from "./router/PublicRoutes"
import UserProvider from "./context/userContext";

// App component
function App() {
  const checkAuth = false
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    checkAuth ? PrivateRoutes() : {},
    ...PublicRoute(),
  ]);
  // Provide the router configuration using RouterProvider
  return <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>;
}

export default App;
