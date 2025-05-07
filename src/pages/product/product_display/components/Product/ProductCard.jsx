import React from 'react';
import styled from 'styled-components';
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    CardSubtitle,
    CardPrice,
    CardBadge,
    CardReview,
    CardTag,
    CardActions,
    CardMediaResponsive,
    Button,
} from 'react-vector';

// Layout wrappers
const CardWrapper = styled.div`
  margin-bottom: ${({ $isList }) => ($isList ? '1rem' : '0')};
`;

const CardLayoutWrapper = styled.div`
  display: ${({ $isList }) => ($isList ? 'flex' : 'block')};
  flex-direction: ${({ $isList }) => ($isList ? 'row' : 'column')};
  gap: ${({ $isList, theme }) => ($isList ? theme.spacing.md : 0)};
  align-items: ${({ $isList }) => ($isList ? 'flex-start' : 'stretch')};
`;

const MediaSection = styled.div`
  flex: ${({ $isList }) => ($isList ? '0 0 270px' : 'initial')};
  max-width: ${({ $isList }) => ($isList ? '270px' : '100%')};
  display: flex;
  align-items: stretch;

  & > div {
    width: 100%;
    height: auto;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted || '#555'};
  margin: 0.25rem 0 0.5rem;
  line-height: 1.4;
`;

const DeliveryLine = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.grey || '#666'};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VariantTagSelector = ({ variants }) => (
    <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
        {variants.map((v) => (
            <CardTag key={v.name}>{v.name}</CardTag>
        ))}
    </div>
);

export const ProductCard = ({
    product,
    onClick,
    onAddToCart,
    layout = 'grid-3',
}) => {
    const {
        image,
        srcSet,
        sizes,
        brand,
        flavour,
        name,
        price,
        oldPrice,
        discount,
        description,
        currency,
        variants = [],
        reviews = [],
    } = product;

    const avgRating = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;

    const isList = layout === 'list';

    return (
        <CardWrapper $isList={isList}>
            <Card
                clickable
                hoverable
                variant="outlined"
                onClick={onClick}
            >
                <CardLayoutWrapper $isList={isList}>
                    <MediaSection $isList={isList}>
                        <CardMediaResponsive
                            src={image}
                            alt={name}
                            aspectRatio={'3 / 4'}
                            srcSet={srcSet}
                            objectFit="cover"
                            $objectPosition="center"
                            sizes={sizes}
                        />

                    </MediaSection>

                    <InfoSection>
                        <CardBody>
                            {brand && <CardSubtitle>{brand}</CardSubtitle>}
                            <CardTitle align="left">{flavour}</CardTitle>

                            {isList && description && <CardDescription>{description}</CardDescription>}

                            {discount && (
                                <CardBadge fontSize="0.75rem" fontWeight={600} bg="#007BFF" color="#FFF">
                                    Best Price
                                </CardBadge>
                            )}

                            {avgRating && (
                                <CardReview
                                    rating={avgRating}
                                    reviewCount={reviews.length}
                                />
                            )}

                            {variants.length > 0 && (
                                <VariantTagSelector variants={variants} />
                            )}

                            <CardPrice
                                price={price}
                                originalPrice={oldPrice}
                                discount={discount}
                                currency={currency}
                            />

                        </CardBody>

                        <CardFooter>
                            <CardActions>
                                <Button
                                    $size={isList ? 'md' : 'xs'}
                                    $outline
                                    $color="#222"
                                    $borderColor="#222"
                                    $hoverBg="#222"
                                    $hoverTextColor="#fff"
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </CardFooter>
                    </InfoSection>
                </CardLayoutWrapper>
            </Card>
        </CardWrapper>
    );
};
