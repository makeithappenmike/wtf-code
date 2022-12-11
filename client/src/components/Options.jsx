import React, { useState } from 'react';
import { CodeOutlined, RightOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

// TODO: Move options somewhere else?
// TODO: Handle mobile better
// ?: Collapse options by default?
// TODO: Wireup editor theme changing
// TODO: Wireup editor model changing
// ?: Are we allowing any other editor customization?

const { Sider } = Layout;

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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Options = () => {

  const [collapsed, setCollapsed] = useState(false);
  
  return (
      <Sider id='options' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3>Options</h3>
        <Menu style={{ textAlign: 'left'}} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={modelItems} expandIcon={<RightOutlined />}/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ textAlign: 'left'}} items={editorItems} expandIcon={<RightOutlined />}/>
      </Sider>
  );
  
};

export default Options;
