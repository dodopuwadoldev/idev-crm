import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";
import { handleLogout } from "../service/collection";
import { staffs } from "./../schema/index";
const { Header, Sider, Content } = Layout;
const LayoutComponent = () => {
  const navigate = useNavigate();
  const pathName = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [seletPath, setSelectPath] = useState("/");
  const [setmode, setMode] = useState();
  const {
    token: { colorBgContainer, colorPrimary, colorPrimaryTextActive },
  } = theme.useToken();
  const colorBg = "#FFFFFF";
  useEffect(() => {
    setSelectPath(pathName.pathname);
  }, [pathName]);

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={
          {
            // mode === 'light'? colorBg: colorPrimaryTextActive,
          }
        }
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          onClick={({ key }) => {
            console.log("key", key);
            setSelectPath(key);
            navigate(key);
          }}
          selectedKeys={[seletPath]}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "/staffs",
              icon: <TeamOutlined />,
              label: "Staffs",
            },
          ]}
        />
        <Menu
          mode="inline"
          onClick={() => {
            handleLogout();
          }}
          items={[
            {
              key: "Logout",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          <Suspense fallback={<div>Loading.....</div>}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
