// ProductCard.jsx
import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardMedia,
  CardBody,
  CardFooter,
} from 'react-vector';

import { Button } from '../../components/Button/Button';

const StyledCard = styled(Card)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.grey || '#ddd'};
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const BrandText = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text || '#444'};
  margin-bottom: 0.25rem;
`;

const ProductSubtitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black || '#000'};
  margin-bottom: 0.25rem;
`;

const OfferBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.gold || '#FFD700'};
  color: ${({ theme }) => theme.colors.black || '#000'};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  display: inline-block;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const RatingBar = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.teal || '#349886'};
  margin: 0.3rem 0;
`;

const Star = styled.span`
  color: ${({ theme }) => theme.colors.gold || '#D4AF37'};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  font-size: clamp(0.875rem, 1.2vw, 1.1rem);
`;

const Price = styled.span`
  font-weight: 700;
`;

const MRP = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.textMuted || '#888'};
`;

const Discount = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.toast?.error || 'red'};
`;

const DeliveryLine = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.grey || '#666'};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VariantBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;

  span {
    padding: 2px 8px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.grey || '#ccc'};
    font-size: 0.75rem;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.seashell || '#f9f9f9'};
    }
  }
`;

const formatProductKey = (product, keys = ['name', 'flavour', 'unit']) =>
  keys.map(k => product[k]).filter(Boolean).join(' | ');

export const ProductCard = ({ product, onClick, onAddToCart }) => {
  const { image, brand, price, oldPrice, discount, currency, variants = [], reviews = [] } = product;

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : null;

    console.log("Incoming product:", product);

  return (
    <StyledCard clickable hoverable variant="flat" onClick={onClick}>
      <CardMedia
        src={image}
        alt={product.name}
        aspectRatio="1 / 1"
      />

      <CardBody style={{ padding: '1rem', fontSize: 'lg' }}>
        {brand && <BrandText>{brand}</BrandText>}
        <ProductSubtitle>{formatProductKey(product)}</ProductSubtitle>
        {discount && <OfferBadge>Great Offer</OfferBadge>}

        {avgRating && (
          <RatingBar>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i}>{i < Math.round(avgRating) ? '★' : '☆'}</Star>
            ))}{' '}
            <span style={{ marginLeft: 4, fontSize: '0.75rem', color: '#666' }}>
              ({reviews.length})
            </span>
          </RatingBar>
        )}

        {variants.length > 0 && (
          <VariantBar>
            {variants.map((v) => (
              <span key={formatProductKey(v, ['name'])}>{v.name}</span>
            ))}
          </VariantBar>
        )}

        <PriceRow>
          <Price>{new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(price)}</Price>
          {oldPrice && (
            <MRP>{new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(oldPrice)}</MRP>
          )}
          {discount && <Discount>{`-${discount}%`}</Discount>}
        </PriceRow>

        <DeliveryLine>🚚 3 days delivery</DeliveryLine>
      </CardBody>

      <CardFooter style={{ padding: '1rem', borderTop: 'none' }}>
        <Button
          $size="xs"
          $variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </StyledCard>
  );
};
