// components/Product/RelatedProducts.jsx
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SectionWrapper = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
`;

const SectionTitle = styled.h4`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
`;

const SliderContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem; /* spacing around slider */
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 0.5rem;
  }

  .slick-list {
    margin: 0 -0.5rem;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ProductCard = styled.div`
  position: relative; /* ✅ This is the fix */
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.85rem;
  cursor: pointer;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImageWrapper = styled.div`
  height: 150px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const CardBody = styled.div`
  padding: 0.75rem;
`;

const ProductName = styled.h6`
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
`;

const ProductDescription = styled.p`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  color: #666;
`;

const ProductPrice = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;

  span {
    color: #999;
    text-decoration: line-through;
    margin-right: 0.25rem;
  }

  strong {
    color: #d00;
  }
`;

const AddToCartButton = styled.button`
  font-size: 0.8rem;
  width: 100%;
  padding: 0.4rem 0.75rem;
  border: 1px solid #007bff;
  background: transparent;
  color: #007bff;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #007bff;
    color: #fff;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 50%; /* ensures perfect circle */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0; /* remove padding to prevent distortion */

  svg {
    font-size: 1rem;
  }

  &:hover {
    background: #f1f1f1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BadgesWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem; /* simpler and cleaner than :not(:last-child) */
  z-index: 2;
`;

const Badge = styled.span`
  background: ${({ $bg }) => $bg || "#d00"};
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  border-radius: 0.25rem;
  font-weight: 600;
`;

const StyledPrevArrow = styled(ArrowButton)`
  left: -3rem; // push further outside
`;

const StyledNextArrow = styled(ArrowButton)`
  right: -3rem;
`;

const RelatedProducts = ({ related, addToCart, formatCurrency }) => {
    const PrevArrow = ({ onClick }) => (
        <StyledPrevArrow onClick={onClick}>
            <FaChevronLeft />
        </StyledPrevArrow>
    );

    const NextArrow = ({ onClick }) => (
        <StyledNextArrow onClick={onClick}>
            <FaChevronRight />
        </StyledNextArrow>
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <SectionWrapper>
            <SectionTitle>Related Products</SectionTitle>
            <SliderContainer>
                <StyledSlider {...settings}>
                    {related.map((sp) => (
                        <div key={sp.id}>
                            <CardLink to={`/product/${sp.id}`}>
                                <ProductCard>
                                    <BadgesWrapper>

                                        {/* 🔥 Discount Badge */}
                                        {sp.discount && (
                                            <Badge $bg="#28a745">-15%</Badge>
                                        )}

                                        {/* 🔥 New Badge (optional if you have isNew flag) */}
                                        {sp.isNew && (
                                            <Badge bg="#007bff" style={{ top: "2rem" }}>
                                                NEW
                                            </Badge>
                                        )}
                                    </BadgesWrapper>

                                    <ProductImageWrapper>
                                        <ProductImage src={sp.image} alt={sp.name} />
                                    </ProductImageWrapper>
                                    <CardBody>
                                        <ProductName>{sp.name}</ProductName>
                                        <ProductDescription>{sp.description}</ProductDescription>
                                        <ProductPrice>
                                            {sp.oldPrice && (
                                                <span>{formatCurrency(sp.oldPrice, sp.currency)}</span>
                                            )}
                                            <strong>{formatCurrency(sp.price, sp.currency)}</strong>
                                        </ProductPrice>
                                        <AddToCartButton
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent navigation
                                                addToCart(sp);
                                            }}
                                        >
                                            Add to Cart
                                        </AddToCartButton>
                                    </CardBody>
                                </ProductCard>
                            </CardLink>
                        </div>
                    ))}
                </StyledSlider>
            </SliderContainer>
        </SectionWrapper>
    );
};

export default RelatedProducts;
