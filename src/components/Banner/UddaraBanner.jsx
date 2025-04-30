import React from 'react';
import { Banner } from 'react-vector'; // or '@/components/banner'
import styled from 'styled-components';

const BannerContent = styled.div`
  padding: 0 16px;
  line-height: 1.6;
  text-align: center;

  a {
    margin: 0 4px;
  }
`;

const UddaraBanner = () => {
  const config = {
    backgroundColor: 'teal',
    textColor: 'white',
    height: '40px',
    width: '100%',
    fontSize: '14px',
    position: 'top',
  };

  const message = (
    <BannerContent>
      Welcome to <strong>UDDARA</strong>! You can speak with us on
      <a href="tel:+919403883381" style={{ color: 'white', textDecoration: 'underline' }}>
        +91 940 388 3381
      </a>
      and also write to us at
      <a href="mailto:support@uddara.com" style={{ color: 'white', textDecoration: 'underline' }}>
        support@uddara.com
      </a>
    </BannerContent>
  );

  return <Banner config={config}>{message}</Banner>;
};

export default UddaraBanner;
