import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

// TODO: Show footer on view screen -- currently you have to scroll a touch

const SiteFooter = () => {
  
  return (
    <Footer
          style={{
            textAlign: 'center',
          }}
        >
          WTF Code ©2022 Created by Michael Martens & Jon Shogren
        </Footer>
  );
};

export default SiteFooter;
