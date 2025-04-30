import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeroSection,
  HeroOverlay,
  HeroFrame, // ✅ Use this instead
  HeroTopSection,
  HeroHeading,
  HeroSubheading,
  HeroBottomSection,
} from './HeroSection.Styles';

import { Button } from '../../components/Button/Button';

const LandingPageHeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <HeroOverlay />
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
          <Button $variant="primary" onClick={() => navigate('/explore')}>
            Explore Products
          </Button>
          <Button $variant="secondary" onClick={() => navigate('/products')}>
            Shop Now
          </Button>
        </HeroBottomSection>
      </HeroFrame>
    </HeroSection>
  );
};

export default LandingPageHeroSection;
