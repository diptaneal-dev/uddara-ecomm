import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import products from "../../data/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import {
  PageWrapper,
  Title,
  CategoryFilter,
  ProductGrid,
  ProductCard,
  CartPanel,
  CartHeader,
  CartBody,
  CartFooter,
} from "./ProductList.styles";
import { Button } from "../../components/Button/Button";

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const cartSubTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <PageWrapper darkMode={darkMode}>

      <CategoryFilter>
        {["All", "Snacks", "Spices", "Nuts"].map((cat) => (
          <Button
            key={cat}
            size="sm" variant="primary"
            outline={selectedCategory !== cat}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </CategoryFilter>

      <Button variant="primary" onClick={() => setShowCart(true)} style={{ marginBottom: "2rem" }}>
        View Cart ({cart.length})
      </Button>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <div className="card-body" onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
              <img src={product.image} alt={product.name} />
              <h5>{product.name}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                {product.oldPrice && (
                  <span className="old-price">
                    {formatCurrency(product.oldPrice, product.currency)}
                  </span>
                )}
                <span className="price">
                  {formatCurrency(product.price, product.currency)}
                </span>
                {product.discount && <span className="badge">-{product.discount}%</span>}
              </p>
              <Button variant="primary" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </ProductCard>
        ))}
      </ProductGrid>

      {/* Cart Panel */}
      <CartPanel show={showCart} darkMode={darkMode}>
        <CartHeader>
          <h5>Cart Summary</h5>
          <Button variant="outline" onClick={() => setShowCart(false)}>
            ←
          </Button>
        </CartHeader>
        <CartBody>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="me-3"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="mb-1 text-muted">{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Qty: {item.quantity}</span>
                      <span>{formatCurrency(item.price, item.currency)}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CartBody>
        {cart.length > 0 && (
          <CartFooter>
            <div className="total">
              Sub Total: {formatCurrency(cartSubTotal, cart[0]?.currency || "USD")}
            </div>
            <div className="actions">
              <Button variant="secondary" onClick={() => navigate("/cart")}>
                View Cart
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      cartItems: cart,
                      totalAmount: cartSubTotal,
                      currency: cart[0]?.currency || "USD",
                    },
                  })
                }
              >
                Checkout
              </Button>
            </div>
          </CartFooter>
        )}
      </CartPanel>
    </PageWrapper>
  );
};

export default ProductList;
