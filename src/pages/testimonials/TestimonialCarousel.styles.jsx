// src/components/home/TestimonialCarousel.Styles.js
import styled from 'styled-components';

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.seashell};
  padding: 3rem 0;
`;

export const Heading = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.charcoal};
  font-family: ${({ theme }) => theme.typography.fontUddaraHeading};
  font-size: ${({ theme }) => theme.typography.uddaraHeading.fontSize};
  font-weight: ${({ theme }) => theme.typography.uddaraHeading.fontWeight};
  line-height: ${({ theme }) => theme.typography.uddaraHeading.lineHeight};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.uddaraHeadingMobile.fontSize};
    font-weight: ${({ theme }) => theme.typography.uddaraHeadingMobile.fontWeight};
    line-height: ${({ theme }) => theme.typography.uddaraHeadingMobile.lineHeight};
    margin-bottom: 1.5rem;
  }
`;

export const SlideCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  min-height: 280px; /* was 250px */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const TestimonialText = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
  font-family: ${({ theme }) => theme.typography.fontSecondary};
`;

export const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc7000;
  }

  &.next {
    right: -45px;
  }

  &.prev {
    left: -45px;
  }
`;

export const AuthorBlock = styled.div`
  text-align: right;
  margin-top: auto;
  padding-top: 1rem; /* gives breathing room */
`;

export const AuthorName = styled.div`
  font-weight: 600;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  color: ${({ theme }) => theme.colors.navy};
  border-bottom: 2px solid ${({ theme }) => theme.colors.navy};
  display: inline-block;
  padding-bottom: 2px;
`;

export const AuthorPlace = styled.div`
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  color: ${({ theme }) => theme.colors.pink};
  margin-top: 4px;
`;

