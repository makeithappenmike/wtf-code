import React, { useState } from 'react';
import { CodeOutlined, RightOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

// !: Options are a work in progress, so we're displaying an empty sidebar
// TODO: Wireup editor theme changing
// TODO: Wireup editor model changing
// TODO: Add more options

const { Sider } = Layout;

// Update state when name added to text field
// const handleModel = (event) => {
//   const nameArea = { model: document.getElementById('explanation_name').value};
//   setNameState(nameArea);
//   console.log('Name State: ', nameState.name);
// };

// const modelItems = [
//   getItem('Model', 'sub1', <CodeOutlined />, [
//     getItem('Davinci', '3'),
//     getItem('Cushman', '4'),
//   ])
// ];

// const editorItems = [
//   getItem('Editor Theme', 'sub1', <CodeOutlined />, [
//     getItem('Theme 1', '3'),
//     getItem('Theme 2', '4'),
//     getItem('Theme 3', '5'),
//   ])
// ];

// function getItem(label, key, icon) {
//   return {
//     label,
//     key,
//     icon
//   };
// }

const Options = () => {

  const [collapsed, setCollapsed] = useState(false);
  // const [editorTheme, setEditorTheme] = useState(false);
  
  return (
      <Sider id='options' collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}breakpoint='md'>
        {/* <h1 id='sider_title'>Options</h1>
        <Menu style={{ textAlign: 'left'}} theme='dark' defaultSelectedKeys={['1']} mode='inline' items={modelItems} expandIcon={<RightOutlined />}/>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' style={{ textAlign: 'left'}} items={editorItems} expandIcon={<RightOutlined />}/> */}
      </Sider>
  );
  
};

export default Options;
