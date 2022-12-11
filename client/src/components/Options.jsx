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
  import { Breadcrumb, Layout, Menu, theme, Switch } from 'antd';
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const modelItems = [
    getItem('Model', 'sub1', <CodeOutlined />, [
      getItem('Model 1', '3'),
      getItem('Model 2', '4'),
      getItem('Model 3', '5'),
    ])
  ];

  const editorItems = [
    getItem('Editor Theme', 'sub1', <CodeOutlined />, [
      getItem('Theme 1', '3'),
      getItem('Theme 2', '4'),
      getItem('Theme 3', '5'),
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

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  
  return (
      <Sider id='options' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3>Options</h3>
        <Menu style={{ textAlign: 'left'}} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={modelItems} expandIcon={<RightOutlined />}/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ textAlign: 'left'}} items={editorItems} expandIcon={<RightOutlined />}/>
      </Sider>
  );
};

export default Options;
