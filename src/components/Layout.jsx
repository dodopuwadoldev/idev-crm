import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const LayoutComponent = () => {
  const pathName = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const [seletPath, setSelectPath] = useState('/');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setSelectPath(pathName)
  }, [pathName])

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[seletPath]}
          items={[
            {
              key: '/',
              icon: <UserOutlined />,
              label: 'Home',
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
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
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