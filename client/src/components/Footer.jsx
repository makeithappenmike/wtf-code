import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

const SiteFooter = () => {
  
  return (
    <Footer style={{ textAlign: 'center' }} >
      WTFCode ©2022<br />Created by <a href='https://github.com/makeithappenmike' target='blank'>Michael Martens</a> & <a href='https://github.com/shogren' target='blank'>Jon Shogren</a>
    </Footer>
  );
};

export default SiteFooter;
