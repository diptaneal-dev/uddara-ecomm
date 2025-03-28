import React from "react";
import { useNavigate } from "react-router-dom";
import products from "../../data/products";
import {
  Section,
  Container,
  Row,
  ImageCol,
  InfoCol,
  Title,
  Price,
  Description,
  InfoList,
  ButtonGroup,
} from "./FeaturedProduct.styles";
import { Button } from "../../components/Button/Button";


const FeaturedProduct = () => {
  const selectedProduct = products[0] || {};
  const navigate = useNavigate();

  return (
    <Section>
      <Container>
        <Row>
          {/* Image Column */}
          <ImageCol>
            <img
              src={selectedProduct.images?.[0] || selectedProduct.image || "/placeholder.jpg"}
              alt={selectedProduct.name}
              loading="lazy"
            />
          </ImageCol>

          {/* Product Info Column */}
          <InfoCol>
            <div>
              <Title>{selectedProduct.name ?? "Product Name"}</Title>
              <Price>
                {selectedProduct.currency ?? "INR"} {selectedProduct.price?.toFixed(2) ?? "0.00"}
              </Price>
              <Description>{selectedProduct.description ?? "No description available."}</Description>

              <InfoList>
                <li>
                  <strong>Brand:</strong> {selectedProduct.brand ?? "N/A"}
                </li>
                <li>
                  <strong>Category:</strong> {selectedProduct.category ?? "N/A"}
                </li>
                <li>
                  <strong>Stock:</strong>
                  {selectedProduct.stock > 0 ? (
                    <span style={{ color: "green" }}> In Stock</span>
                  ) : (
                    <span style={{ color: "red" }}> Out of Stock</span>
                  )}
                </li>
                <li>
                  <strong>Use By:</strong> {selectedProduct.useBy ?? "N/A"}
                </li>
              </InfoList>
            </div>

            <ButtonGroup>
              <Button $variant="secondary" $outline onClick={() => navigate(`/product/${selectedProduct.id}`)}>
                Know More
              </Button>
              <Button $variant="primary">Add to Cart</Button>
            </ButtonGroup>
          </InfoCol>
        </Row>
      </Container>
    </Section>
  );
};

export default FeaturedProduct;
