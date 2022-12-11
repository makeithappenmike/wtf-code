import React, { useState } from 'react';
import Auth from '../utils/auth';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    RightSquareOutlined,
  } from '@ant-design/icons';
  import { Breadcrumb, Layout, Menu, theme } from 'antd';
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Saved One', '1', <RightSquareOutlined />),
    getItem('Saved Two', '2', <RightSquareOutlined />),
    getItem('Saved Two', '3', <RightSquareOutlined />),
  ];

const Sidebar = () => {

const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
      <Sider id='sidebar' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3 style={{ color: 'white'}}>Saved Blocks</h3>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
  );
};

export default Sidebar;
