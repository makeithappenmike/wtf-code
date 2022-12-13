import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SNIPPET } from '../../src/utils/queries';
import { RightSquareOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useEffect } from 'react';

const { Sider } = Layout;

const Sidebar = () => {
  // TODO: Spinning wheel if loading
  // TODO: error handling?
  const { loading, data } = useQuery(QUERY_SNIPPET);
  const snippets = data?.snippet || [];
  
  const [sideBarState, setSideBarState] = useState([]);

  const updateState = () => {
    const newState = snippets.map(obj => {
      console.log(obj.name);
      return {label: obj.name, key: obj._id, icon: <RightSquareOutlined />};
    });
    setSideBarState(newState);
  };

  useEffect(() => {
    // code here;
    updateState();
  }, [data]);


const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
      <Sider id='sidebar' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3 style={{ color: 'white'}}>Saved Blocks</h3>

        <Menu 
          theme="dark" defaultSelectedKeys={['1']} mode="inline" items={sideBarState} />
      </Sider>
  );
};

export default Sidebar;
