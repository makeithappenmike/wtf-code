import { Layout } from 'antd';
import React from 'react';
import SiteFooter from '../components/Footer';

// TODO: Add content here -- contact info for WTF as well as links to OpenAI?
// TODO: Footer is off page -- should be visible by default

const { Content } = Layout;
const Contact = () => {

  return (
    <main>
        <Layout style={{
        minHeight: '100vh',
      }}>
        <Content >
        Contact
        </Content>
        <SiteFooter />
        </Layout>
    </main>
  );
};

export default Contact;