import React from 'react';
import { Banner, useBannerConfig } from 'react-vector';

// C8A2C8, FF6F61, 007BFF, FFC107, 001F3F
const UddaraBanner = () => {
  const messages = [
    <>
      Welcome to <strong>UDDARA</strong>! You can speak with us on{' '}
      <a href="tel:+919403883381">+91 940 388 3381</a> and also write to us at{' '}
      <a href="mailto:support@uddara.com">info@uddara.com</a>.
    </>,
    'Welcome to Uddara — your new destination for delicious, mindful snacking!',
    <>
      Introducing{' '}
      <span style={{ color: '#FFC107', fontWeight: 'bold' }}>Foxnut Feast</span>{' '}
      — our signature brand of premium Makhana (foxnuts).
    </>,
    'Try all three exciting flavours: Classic, Jaggery, and Jaggery Trail Mix!',
  ];

  const { bannerProps, show } = useBannerConfig({
    type: 'ticker',
    overrides: {
      direction: 'left',
      backgroundColor: '#001F3F',
      textColor: '#fff',
      tickerSpeed: 20,
      message: messages,
    },
  });

  if (!show) return null;

  return <Banner config={bannerProps} />;
};

export default UddaraBanner;
