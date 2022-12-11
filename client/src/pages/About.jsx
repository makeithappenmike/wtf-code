import { Layout } from 'antd';
import React from 'react';
import SiteFooter from '../components/Footer';

// TODO: Add content here -- maybe some details on OpenAI?
// TODO: Footer is off page -- should be visible by default

const { Content } = Layout;
const About = () => {

  return (
    <main>
        <Layout style={{
        minHeight: '100vh',
      }}>
        <Content>
        About
        </Content>
        <SiteFooter />
        </Layout>
    </main>
  );
};

export default About;
