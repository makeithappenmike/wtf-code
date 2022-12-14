import React from 'react';
import SignupForm from '../components/SignUpForm';
import { Layout } from 'antd';
import SiteFooter from '../components/Footer';

// TODO: What other content do we want here?

const { Content } = Layout;

const Signup = () => {

  return (
    <main>
        <Layout style={{
        minHeight: '100vh',
      }}>
          <Content >
            <SignupForm />
          </Content>
            <SiteFooter />
        </Layout>
    </main>
  );
};

export default Signup;