import React from 'react';
import { Banner, useBannerConfig } from 'react-vector';

const UddaraBanner = () => {
  const { bannerProps, show } = useBannerConfig();

  if (!show) return null;

  return (
    <Banner config={bannerProps}>
      <span>
        Welcome to <strong>UDDARA</strong>! You can speak with us on{' '}
        <a href="tel:+919403883381">+91 940 388 3381</a> and also write to us at{' '}
        <a href="mailto:support@uddara.com">info@uddara.com</a>.
      </span>
    </Banner>
  );
};

export default UddaraBanner;
