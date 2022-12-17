import React from 'react';
import SignupForm from '../components/SignUpForm';
import { Layout } from 'antd';
import SiteFooter from '../components/Footer';
import WTFCode from'../assets/wtf-code.png';

// TODO: What other content do we want here?

const { Content } = Layout;

const Signup = () => {

  return (
    <main>
        <Layout style={{
        minHeight: '100vh',
      }}>
          <Content >
          <img  id='signup_logo' src={WTFCode} alt="WTFCode"/>
            <SignupForm style={{ paddingLeft: '200px' }}/>
          </Content>
            <SiteFooter />
        </Layout>
    </main>
  );
};

export default Signup;