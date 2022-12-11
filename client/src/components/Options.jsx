import React, { useState } from 'react';
import Auth from '../utils/auth';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    CodeOutlined,
    RightOutlined
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
    getItem('Model', 'sub1', <CodeOutlined />, [
      getItem('Model 1', '3'),
      getItem('Model 2', '4'),
      getItem('Model 3', '5'),
    ])
  ];

const Options = () => {

const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  return (
      <Sider id='options' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3 style={{ color: 'white'}}>Options</h3>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} expandIcon={<RightOutlined />}/>
      </Sider>
  );
};

export default Options;
