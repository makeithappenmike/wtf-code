import React, { useState, useContext} from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_ME } from '../../src/utils/queries';
import { RightSquareOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useEffect } from 'react';
import WTFCode from'../assets/wtf-code.png';
import { GlobalContext } from '../utils/context';

const { Sider } = Layout;

const Sidebar = () => {
  // TODO: Spinning wheel if loading
  // TODO: error handling?

  const { setCurrentSnippet, refetchSnippets } = useContext(GlobalContext);
  const [getData, { refetch, loading, data, called }] = useLazyQuery(QUERY_ME);
  const snippets = data?.me.snippets || [];
  
  const [sideBarState, setSideBarState] = useState([]);

  const updateState = () => {
    const newState = snippets.map(obj => {
      return {label: obj.name, key: obj._id, icon: <RightSquareOutlined />, code: obj.code, explanation: obj.explanation};
      
    });
    setSideBarState(newState);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (called && refetchSnippets > 0) {
      refetch();
    }
  }, [refetchSnippets, called]);


  useEffect(() => {
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
        <img  src={WTFCode} style={{ maxHeight: '50px', verticalAlign: 'middle'}} alt="WTFCode"/>
        <h3 style={{ color: 'white'}}>Saved Snippets</h3>
        <Menu 
          style={{ textAlign: 'left' }}theme="dark" onClick={handleClick} mode="inline" items={sideBarState} />
      </Sider>
  );
};

export default Sidebar;
