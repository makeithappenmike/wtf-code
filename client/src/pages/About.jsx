import { Layout } from 'antd';
import React from 'react';
import SiteFooter from '../components/Footer';
import WTFcode from'../assets/wtf-code.png';

const { Content } = Layout;
const About = () => {

  return (
    <main>
        <Layout style={{ minHeight: '100vh' }}>
          <Content>
            <section style={{ textAlign: 'center' }}>
              <img  id='about_logo' src={WTFcode} alt='WTF Code Logo'/>
              <section style={{ textAlign: 'left', border: '1px solid #a1adc3', borderRadius: '10px', marginLeft: '50px', marginRight: '50px', marginTop: '50px', padding: '25px', backgroundColor: '#b2bed4', boxShadow: '3px 3px 3px #373f4a' }}>
                <h2 style={{ textAlign: 'center' }}>Welcome to WTFcode!</h2>
                <p>Let's face it, as developers, at somepoint we find ourselves asking <em>'what the f*@k is this code actually doing?'</em>. Its a perfectly valid question, and sometimes easier to answer than others.</p>
                <p><b>WTFcode</b> sets out to help developers answer that burning question by leveraging state-of-the-art technology with a bit of customization along the way.</p>
                <p>By tapping into <a href='https://openai.com/' target='blank' alt='OpenAI'>OpenAI's</a> technology, we're able to provide secure, personalized access to one of their API Playgrounds that uses Artifical Intelligence to read and explain your code for you.</p>
                <p>By scanning billions of lines of code, OpenAi can provide some amazing context -- and its growing and learning as it goes.</p>
                <p>Use our Code editor to analyze your snippets and save them to a database for future reference or share with a friend.</p>
                <p>Happy coding!<br />Your friends at WTFcode</p>
              </section>
            </section>
          </Content>
          <SiteFooter />
        </Layout>
    </main>
  );
};

export default About;
