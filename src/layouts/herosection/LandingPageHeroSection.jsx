// src/layouts/herosection/LandingPageHeroSection.jsx
import React from 'react';
import {
  HeroSection,
  HeroFrame,
  HeroTopSection,
  HeroHeading,
  HeroSubheading,
  HeroBottomSection,
  HeroImage
} from './HeroSection.Styles';

import { Button } from '../../components/Button/Button';

const LandingPageHeroSection = () => {
  return (
    <HeroSection>
      <HeroFrame>
        <HeroTopSection>
          <HeroHeading>
            Expanding Horizons with Foxnuts
          </HeroHeading>
          <HeroSubheading>
            From India to the World – Quality, Health and Taste in Every Pack
          </HeroSubheading>
        </HeroTopSection>

        <HeroBottomSection>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/explore-products'}
          >
            Explore Products
          </Button>

          <Button
            variant="secondary"
            onClick={() => window.location.href = '/shop'}
          >
            Shop Now
          </Button>

        </HeroBottomSection>
      </HeroFrame>

      <HeroImage
        src="/images/uddara_herosection.webp"
        alt="Global Business Expansion"
      />
    </HeroSection>
  );
};

export default LandingPageHeroSection;
