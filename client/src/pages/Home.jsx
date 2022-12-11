import React from 'react';
import Editor from '../components/Editor';
import Sidebar from '../components/Sidebar';
import Options from '../components/Options';
import SiteFooter from '../components/Footer';
import { Layout, theme } from 'antd';

// TODO: Footer is off page -- should be visible by default
// TODO: What other components do we need on this page?

const { Content } = Layout;

const Home = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <main>
      <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <br />
          <Editor />
        </Content>
        <SiteFooter />
      </Layout>
      <Options />
    </Layout>
    </main>
  );
};

export default Home;