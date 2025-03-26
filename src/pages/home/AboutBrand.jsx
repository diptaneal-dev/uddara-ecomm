// src/components/home/AboutBrand.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Section,
  Row,
  LeftCol,
  RightCol,
  Heading,
  Divider,
  Description,
  StyledButton,
} from './AboutBrand.styles';

const AboutBrand = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    window.scrollTo(0, 0);
    navigate('/about');
  };

  return (
    <Section>
      <div className="container-fluid p-0">
        <Row>
          <LeftCol>
            <Heading>About Uddara</Heading>
            <Divider />
            <Description>
              UDDARA is a premier exporter specializing in high-quality <strong>foxnuts, millets, and other commodities</strong>.  
              With a commitment to <strong>excellence</strong> and a focus on <strong>customer satisfaction</strong>, we aim to deliver the <strong>finest products</strong> to markets worldwide.  
              We are <strong>starting with Foxnut</strong> and have ambitious plans to <strong>expand our portfolio</strong> in the near future.
            </Description>
            <StyledButton onClick={handleNavigation}>
              Know More
            </StyledButton>
          </LeftCol>

          <RightCol>
            <img src="/images/uddara_experience.webp" alt="Happy Customer! Healthy Customer!" />
          </RightCol>
        </Row>
      </div>
    </Section>
  );
};

export default AboutBrand;
