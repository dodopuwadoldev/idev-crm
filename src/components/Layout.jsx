import React, { useEffect, useState, useContext, startTransition } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  HomeOutlined,
  LogoutOutlined,
  BulbTwoTone,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { handleLogout } from "../service/collection";
import { staffs } from "./../schema/index";
import { ColorModeContext } from "../context/Themecontext";
const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  const navigate = useNavigate();
  const pathName = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [seletPath, setSelectPath] = useState("/");
  const { mode, setMode } = useContext(ColorModeContext);

  useEffect(() => {
    setSelectPath(pathName.pathname);
  }, [pathName]);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: mode === "light" ? "#FFFFFF" : "#333333",
          color: mode === "light" ? "#000000" : "#FFFFFF",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          onClick={({ key }) => {
            startTransition(() => {
              setSelectPath(key);
              navigate(key);
            });
          }}
          selectedKeys={[seletPath]}
          items={[
            { key: "/", icon: <HomeOutlined />, label: "Home" },
            { key: "/staffs", icon: <TeamOutlined />, label: "Staffs" },
          ]}
        />
        <Menu
          mode="inline"
          onClick={() => {
            handleLogout();
          }}
          items={[{ key: "Logout", icon: <LogoutOutlined />, label: "Logout" }]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: mode === "light" ? "#FFFFFF" : "#333333",
            color: mode === "light" ? "#000000" : "#FFFFFF",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: mode === "light" ? "#000000" : "#FFFFFF",
            }}
          />
          <Button onClick={toggleMode}>
            DarkMode
            <BulbTwoTone />
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
