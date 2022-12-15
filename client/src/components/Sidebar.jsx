import React, { useState, useContext} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SNIPPET } from '../../src/utils/queries';
import { RightSquareOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useEffect } from 'react';
import { GlobalContext } from '../utils/context';

const { Sider } = Layout;

const Sidebar = () => {
  // TODO: Spinning wheel if loading
  // TODO: error handling?

  const { setCurrentSnippet } = useContext(GlobalContext);
  const { loading, data } = useQuery(QUERY_SNIPPET);
  const snippets = data?.snippet || [];
  
  const [sideBarState, setSideBarState] = useState([]);

  const updateState = () => {
    const newState = snippets.map(obj => {
      return {label: obj.name, key: obj._id, icon: <RightSquareOutlined />, code: obj.code, explanation: obj.explanation};
      
    });
    setSideBarState(newState);
  };

  useEffect(() => {
    // code here;
    updateState();
  }, [data]);

   // Update state based on form input changes
   const handleClick = (id) => {
    const snippet = sideBarState.find(obj=>obj.key === id.key);
    setCurrentSnippet(snippet);

  };

const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
      <Sider id='sidebar' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <h3 style={{ color: 'white'}}>Saved Blocks</h3>

        <Menu 
          theme="dark" onClick={handleClick} mode="inline" items={sideBarState} />
      </Sider>
  );
};

export default Sidebar;
