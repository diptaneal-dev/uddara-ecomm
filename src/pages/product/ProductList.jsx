import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import products from "../../data/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { IconButton } from "../../components/Button/IconButton";
import { ProductCard } from "./ProductCard"; // ✅ Import your new component

import {
  PageWrapper,
  ContentLayout,
  SidebarFilters,
  FilterGroup,
  FilterLabel,
  FilterOption,
  ProductGrid,
  CartPanel,
  CartHeader,
  CartBody,
  CartFooter,
  MobileFilterToggle,
  ClearFilterButton,
  ProductResults
} from "./ProductList.styles";

import { Button } from "../../components/Button/Button";

const formatCurrency = (amount, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);

const allFlavours = ["Peri peri", "Plain", "Masala"];
const allBrands = ["Foxnut Feast", "Super Snacks"];
const allCategories = ["All", "Snacks"];

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { darkMode } = useTheme();

  const params = new URLSearchParams(location.search);
  const queryParam = decodeURIComponent(params.get("query") || "").replace(/\+/g, " ");

  const flavourParam = params.getAll("flavour");
  const brandParam = params.getAll("brand");
  const categoryParam = params.get("category") || "All";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedFlavours, setSelectedFlavours] = useState(flavourParam);
  const [selectedBrands, setSelectedBrands] = useState(brandParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // sync filters to URL
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("query", searchQuery);
    if (selectedCategory && selectedCategory !== "All") newParams.set("category", selectedCategory);
    selectedFlavours.forEach((f) => newParams.append("flavour", f));
    selectedBrands.forEach((b) => newParams.append("brand", b));
    navigate(`/products?${newParams.toString()}`, { replace: true });
  }, [searchQuery, selectedFlavours, selectedBrands, selectedCategory]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = decodeURIComponent(params.get("query") || "").replace(/\+/g, " ");
    setSearchQuery(queryParam);
  }, [location.search]);

  const handleMultiSelect = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedFlavours([]);
    setSelectedBrands([]);
    setSelectedCategory("All");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavour?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.filterTags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.dietType?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesFlavour = selectedFlavours.length === 0 || selectedFlavours.includes(product.flavour);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return matchesSearch && matchesCategory && matchesFlavour && matchesBrand;
  });

  const cartSubTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <PageWrapper $darkMode={darkMode}>

      <MobileFilterToggle onClick={() => setShowFilters((prev) => !prev)}>
        <FontAwesomeIcon icon={faFilter} /> Filters
      </MobileFilterToggle>

      {searchQuery && (
        <p style={{ marginBottom: '1rem' }}>
          Showing results for <strong>"{searchQuery}"</strong>
        </p>
      )}

      <ContentLayout>
        {(showFilters || window.innerWidth > 768) && (
          <SidebarFilters>
            <ClearFilterButton onClick={handleClearFilters}>Clear All Filters</ClearFilterButton>

            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              {allCategories.map((cat) => (
                <FilterOption key={cat}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  {cat}
                </FilterOption>
              ))}
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Flavour</FilterLabel>
              {allFlavours.map((flav) => (
                <FilterOption key={flav}>
                  <input
                    type="checkbox"
                    checked={selectedFlavours.includes(flav)}
                    onChange={() => handleMultiSelect(flav, selectedFlavours, setSelectedFlavours)}
                  />
                  {flav}
                </FilterOption>
              ))}
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Brand</FilterLabel>
              {allBrands.map((brand) => (
                <FilterOption key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleMultiSelect(brand, selectedBrands, setSelectedBrands)}
                  />
                  {brand}
                </FilterOption>
              ))}
            </FilterGroup>
          </SidebarFilters>
        )}

        <ProductResults>
          <ProductGrid>
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={[product.name, product.flavour, product.unit].filter(Boolean).join('|')}
                  product={product}
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: { product } })
                  }
                  onAddToCart={addToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </ProductGrid>
        </ProductResults>
      </ContentLayout>

      {/* Cart Panel */}
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
