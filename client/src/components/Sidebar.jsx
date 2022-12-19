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

  const { setCurrentSnippet, refetchSnippets } = useContext(GlobalContext);
  const [getData, { refetch, loading, data, called }] = useLazyQuery(QUERY_ME);
  const snippets = data?.me.snippets || [];
  const [sideBarState, setSideBarState] = useState([]);

  // Set saved Snippets to the sidebar
  const updateState = () => {
    const newState = snippets.map(obj => {
      return {label: obj.name, key: obj._id, icon: <RightSquareOutlined />, code: obj.code, explanation: obj.explanation};
      
    });
    setSideBarState(newState);
  };

  // Get everything from the DB on load
  useEffect(() => {
    getData();
  }, []);

  // Get everything from the DB on Snippet click
  useEffect(() => {
    if (called && refetchSnippets > 0) {
      refetch();
    }
  }, [refetchSnippets, called]);


  // Update state to reflect current Snippet
  useEffect(() => {
    updateState();
  }, [data]);

  // Update state based on form input changes
  const handleClick = (id) => {
  const snippet = sideBarState.find(obj=>obj.key === id.key);
    setCurrentSnippet(snippet);
  };

  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  
  return (
    <Sider id='sidebar' breakpoint='md' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <section id='image_container'>
        <img  className='.img-fluid' id='sidebar_logo' src={WTFCode} style={{ maxHeight: '50px', verticalAlign: 'middle'}} alt='WTFCode'/>
      </section>
      <h1 id='sider_title' style={{ color: 'white'}}>Saved Snippets</h1>
      <Menu style={{ textAlign: 'left' }}theme='dark' onClick={handleClick} mode='inline' items={sideBarState} />
    </Sider>
  );
};

export default Sidebar;
