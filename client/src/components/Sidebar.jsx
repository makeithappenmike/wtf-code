import React, { useState } from 'react';
import { RightSquareOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

// TODO: Load sidebar items based on saved snippets

const { Sider } = Layout;
const sidebarItems = [
  getItem('Saved One', '1', <RightSquareOutlined />),
  getItem('Saved Two', '2', <RightSquareOutlined />),
  getItem('Saved Two', '3', <RightSquareOutlined />),
];

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Sidebar = () => {

const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
      <Sider id='sidebar' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3 style={{ color: 'white'}}>Saved Blocks</h3>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={sidebarItems} />
      </Sider>
  );
};

export default Sidebar;
