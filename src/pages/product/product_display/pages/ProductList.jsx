import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../../../../data/products";
import { useProductFilters } from "../hooks/useProductFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../../../context/CartContext";
import { useTheme } from "../../../../context/ThemeContext";
import { IconButton } from "react-vector";
import { ProductGridList } from "../components/Product/ProductGridList";
import { filterProducts } from "../utils/Filters/filterProducts";
import { ProductFilters } from "../components/Filters/ProductFilters";

import {
  PageWrapper,
  ContentLayout,
  SidebarFilters,
  FilterGroup,
  FilterLabel,
  FilterOption,
  CartPanel,
  CartHeader,
  CartBody,
  CartFooter,
  MobileFilterToggle,
  ClearFilterButton,
  ProductResults
} from "./ProductList.styles";
import { Button } from "react-vector";
import { getFilterMetadataFromProducts } from "../utils/Filters/getFilterMetadataFromProducts";

const formatCurrency = (amount, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);

const allFlavours = ["Peri peri", "Plain", "Masala"];
const allBrands = ["Foxnut Feast", "Super Snacks"];
const allCategories = ["All", "Snacks"];

const ProductList = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { darkMode } = useTheme();

  const {
    searchQuery,
    setSearchQuery,
    selectedFlavours,
    setSelectedFlavours,
    selectedBrands,
    setSelectedBrands,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
  } = useProductFilters();

  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filterFields = ["category", "brand", "flavour"];
  const filterValues = getFilterMetadataFromProducts(products, filterFields);
  const filterConfig = [
    {
      key: "category",
      label: "Category",
      type: "radio",
      options: filterValues.category,
      getValue: () => selectedCategory,
      setValue: setSelectedCategory,
    },
    {
      key: "flavour",
      label: "Flavour",
      type: "checkbox",
      options: filterValues.flavour,
      getValue: () => selectedFlavours,
      setValue: setSelectedFlavours,
    },
    {
      key: "brand",
      label: "Brand",
      type: "select",
      options: filterValues.brand,
      getValue: () => selectedBrands[0] || "",
      setValue: (value) => setSelectedBrands(value ? [value] : []),
    },
  ];

  const handleMultiSelect = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const activeFilters = {
    searchQuery,
    selectedBrands,
    selectedFlavours,
    selectedCategory,
    // minPrice, maxPrice, minRating could be added here too
  };

  const filteredProducts = filterProducts(products, activeFilters);
  const cartSubTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <PageWrapper $darkMode={darkMode}>
      <MobileFilterToggle onClick={() => setShowFilters(prev => !prev)}>
        <FontAwesomeIcon icon={faFilter} /> Filters
      </MobileFilterToggle>

      {searchQuery && (
        <p style={{ marginBottom: '1rem' }}>
          Showing results for <strong>"{searchQuery}"</strong>
        </p>
      )}

      {selectedBrands.length > 0 && (
        <h2>Products for: {selectedBrands.join(", ")}</h2>
      )}

      <ContentLayout>
        {(showFilters || window.innerWidth > 768) && (
          <ProductFilters
            config={filterConfig}
            clearFilters={clearFilters}
            handleMultiSelect={handleMultiSelect}
          />
        )}

        <ProductResults>
          <ProductGridList
            products={filteredProducts}
            onProductClick={(product) =>
              navigate(`/product/${product.id}`, { state: { product } })
            }
            onAddToCart={addToCart}
          />
        </ProductResults>
      </ContentLayout>

      <CartPanel $show={showCart} $darkMode={darkMode}>
        <CartHeader>
          <h5>Cart Summary</h5>
          <Button $size="xs" $variant="primary" $outline onClick={() => setShowCart(false)}>←</Button>
        </CartHeader>
        <CartBody>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex align-items-center">
                  <img src={item.image} alt={item.name} style={{ width: 50, height: 50, borderRadius: 5 }} />
                  <div className="flex-grow-1 ms-3">
                    <h6>{item.name}</h6>
                    <p className="text-muted">{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Qty: {item.quantity}</span>
                      <span>{formatCurrency(item.price, item.currency)}</span>
                      <IconButton onClick={() => removeFromCart(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
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
              Sub Total: {formatCurrency(cartSubTotal, cart[0]?.currency || "INR")}
            </div>
            <div className="actions">
              <Button $variant="secondary" $outline onClick={() => navigate("/cart")}>View Cart</Button>
              <Button
                $variant="primary"
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      cartItems: cart,
                      totalAmount: cartSubTotal,
                      currency: cart[0]?.currency || "INR",
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
