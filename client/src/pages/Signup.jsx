import React from 'react';
import SignupForm from '../components/SignUpForm';
import { Layout } from 'antd';
import SiteFooter from '../components/Footer';
import WTFcode from'../assets/wtf-code.png';

// TODO: Improve Mobile form experience

const { Content } = Layout;

const Signup = () => {

  return (
    <main>
        <Layout style={{
        minHeight: '100vh',
      }}>
          <Content >
          <img  id='signup_logo' src={WTFcode} alt='WTFcode'/>
            <SignupForm style={{ paddingLeft: '200px' }}/>
          </Content>
          <SiteFooter />
        </Layout>
    </main>
  );
};

export default Signup;