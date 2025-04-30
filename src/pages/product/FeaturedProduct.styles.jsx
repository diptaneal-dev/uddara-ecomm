// src/components/product/FeaturedProduct.Styles.js
import styled from 'styled-components';

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.white}; 
  padding: 3rem 0;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

export const ImageCol = styled.div`
  flex: 1 1 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  img {
    width: 100%;
    max-width: 300px; /* ✅ Reduced size */
    height: auto;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const InfoCol = styled.div`
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
`;

export const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 0;
  color: ${({ theme }) => theme.colors.pink};
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 1rem;
  margin-left: 0;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;

    strong {
      margin-right: 0.5rem;
    }

    span {
      font-weight: bold;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
`;
