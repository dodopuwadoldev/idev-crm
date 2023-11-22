import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoutes from "./router/PrivateRoutes";
import PublicRoute from "./router/PublicRoutes";
import UserProvider from "./context/userContext";
import { ConfigProvider } from "antd";
function App() {
  const checkAuth = localStorage.getItem("access_token");
  const router = createBrowserRouter([
    checkAuth ? PrivateRoutes() : {},
    ...PublicRoute(),
  ]);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          borderRadius: 10,
          colorBgContainer: "#f6ffed",
          colorInfo: "#0055ff",
          colorSuccess: "#eb2f96",
          colorError: "#ff0003",
          colorWarning: "#ffaa00",
          wireframe: true,
          colorBgBase: "#cdcdcd",
        },
      }}
    >
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ConfigProvider>
  );
}

export default App;
