import { createContext, useEffect, useState } from "react";

import { ConfigProvider, message } from "antd";
import { theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

export const ColorModeContext = createContext({});

export const ColorModeContextProvider = ({ children }) => {
  const themeSelect = localStorage.getItem("theme") || "light";
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState(theme);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setMode(themeSelect);
    }
  }, [isMounted, themeSelect]);

  const setColorMode = () => {
    if (mode === "light") {
      localStorage.setItem("theme", "dark");
      setMode("dark");
    } else {
      localStorage.setItem("theme", "light");
      setMode("light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  const styleToken = {
    token: {
            // colorPrimary: "#00b96b",
            // borderRadius: 10,
            // colorBgContainer: "#f6ffed",
            // colorInfo: "#0055ff",
            // colorSuccess: "#eb2f96",
            // colorError: "#ff0003",
            // colorWarning: "#ffaa00",
            // wireframe: true,
            // colorBgBase: "#cdcdcd",
    },
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        theme={{
          ...styleToken,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        <StyleProvider hashPriority="high">{children}</StyleProvider>
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
