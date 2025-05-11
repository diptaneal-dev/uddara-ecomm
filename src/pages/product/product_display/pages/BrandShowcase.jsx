import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const brands = [
  {
    name: "Plain Makhana",
    image: "/images/classic-makhana.png",
    filters: {
      brand: "Foxnut Feast",
      flavour: "Plain Makhana",
      category: "foxnuts",
    },
  },
  {
    name: "Jaggery Makhana",
    image: "/images/jaggery-makhana.png",
    filters: {
      brand: "Foxnut Feast",
      flavour: "Jaggery Makhana",
      category: "foxnuts",
    },
  },
  {
    name: "Jaggery Trial Mix",
    image: "/images/jaggery-trial-mix.png",
    filters: {
      brand: "Foxnut Feast",
      flavour: "Jaggery Trail Mix",
      category: "foxnuts",
    },
  },
];

// Styled Components
const Section = styled.section`
  padding: 30px 20px;
  text-align: center;
  background-color: #fbeee6;
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 80px;
  max-width: 1000px;
  margin: 0 auto;
`;

const BrandCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ImageCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fbeee6;
  box-shadow: none;
`;

const BrandImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BrandName = styled.p`
  margin-top: 14px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #444;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontUddaraHeading};
  font-weight: ${({ theme }) => theme.typography.uddaraHeading.fontWeight};
  font-size: ${({ theme }) => theme.typography.uddaraHeading.fontSize};
  color: ${({ theme }) => theme.colors.charcoal};
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.uddaraHeadingMobile.fontSize};
    font-weight: ${({ theme }) => theme.typography.uddaraHeadingMobile.fontWeight};
    line-height: ${({ theme }) => theme.typography.uddaraHeadingMobile.lineHeight};
    margin-bottom: 1.5rem;
  }
`;

const BrandShowcase = () => {
  const navigate = useNavigate();

  const handleClick = (filters) => {
    const params = new URLSearchParams();
    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        filters[key].forEach((val) => params.append(key, val));
      } else {
        params.append(key, filters[key]);
      }
    }
    navigate(`/products?${params.toString()}`, {
      state: { fromBrandShowcase: true },
    });
  };

  return (
    <Section>
      <Heading>
        Our Brand <span style={{ fontStyle: "italic" }}>Foxnut Feast</span>
      </Heading>

      <BrandGrid>
        {brands.map((brand, index) => (
          <BrandCard key={index} onClick={() => handleClick(brand.filters)}>
            <ImageCircle>
              <BrandImage src={brand.image} alt={brand.name} />
            </ImageCircle>
            <BrandName>{brand.name}</BrandName>
          </BrandCard>
        ))}
      </BrandGrid>
    </Section>
  );
};

export default BrandShowcase;
