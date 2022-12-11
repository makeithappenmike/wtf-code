import { Layout } from 'antd';
import React from 'react';
import SiteFooter from '../components/Footer';

// TODO: Add content here
// TODO: Footer is off page -- should be visible by default

const { Content } = Layout;
const NotFound = () => {

  return (
    <main>
        <Layout style={{
        minHeight: '100vh',
      }}>
        <Content >
        NotFound
        </Content>
        <SiteFooter />
        </Layout>
    </main>
  );
};

export default NotFound;