// ProductDetailsPage.styles.js
import styled from "styled-components";

export const Container = styled.div`
  margin-top: 2rem;
  padding-left: 0.5rem;
  background-color: #fff;
  font-family: "Inter", sans-serif;
`;

export const SectionTitle = styled.h4`
  margin-top: 2rem;
  font-weight: 600;
`;

export const ProductInfoWrapper = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

export const PriceWrapper = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .old-price {
    text-decoration: line-through;
    margin-right: 0.5rem;
    color: #888;
  }

  .current-price {
    color: #dc3545;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .discount {
    margin-left: 0.5rem;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    padding: 2px 6px;
    font-size: 0.9rem;
  }
`;

export const ModalContent = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  .progress {
    flex-grow: 1;
  }
`;

export const DeliveryBox = styled.div`
  border-left: 1px solid #ccc;
  padding-left: 1rem;
`;

export const RelatedProductCard = styled.div`
  width: 18rem;
  .card-img-top {
    height: 150px;
    object-fit: cover;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  .form-control {
    width: 50px;
    text-align: center;
  }

  .btn {
    padding: 0.25rem 0.75rem;
  }
`;

export const ProductComparisonTable = styled.table`
  th,
  td {
    text-align: center;
    vertical-align: middle;
  }

  img {
    max-height: 80px;
  }
`;
