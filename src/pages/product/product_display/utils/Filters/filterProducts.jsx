/**
 * Filters a list of products based on various criteria.
 *
 * @param {Array} products - The raw product list.
 * @param {Object} filters - Active filters.
 * @param {string} [filters.searchQuery] - Text search query.
 * @param {Array<string>} [filters.selectedBrands]
 * @param {Array<string>} [filters.selectedFlavours]
 * @param {string} [filters.selectedCategory]
 * @param {number} [filters.minPrice]
 * @param {number} [filters.maxPrice]
 * @param {number} [filters.minRating]
 *
 * @param {Object} config - Optional config for flexibility.
 * @param {Array<string>} [config.searchFields]
 * @param {string} [config.categoryField]
 * @param {string} [config.brandField]
 * @param {string} [config.flavourField]
 * @param {string} [config.priceField]
 * @param {string} [config.ratingField]
 */
export function filterProducts(products, filters, config = {}) {
    const {
      searchQuery = "",
      selectedBrands = [],
      selectedFlavours = [],
      selectedCategory = "All",
      minPrice,
      maxPrice,
      minRating,
    } = filters;
  
    const {
      searchFields = ["name", "description", "brand", "flavour", "filterTags", "dietType"],
      categoryField = "category",
      brandField = "brand",
      flavourField = "flavour",
      priceField = "price",
      ratingField = "reviews", // expects array of { rating: number }
    } = config;
  
    const normalizedSearch = searchQuery.toLowerCase();
  
    return products.filter((product) => {
      // 🔍 Full-text search
      const matchesSearch =
        !searchQuery ||
        searchFields.some((field) => {
          const value = product[field];
          if (Array.isArray(value)) {
            return value.some((v) => v.toLowerCase().includes(normalizedSearch));
          }
          return value?.toLowerCase().includes(normalizedSearch);
        });
  
      // 🏷 Category (comma-separated safe)
      const matchesCategory =
        selectedCategory === "All" ||
        (product[categoryField] &&
          product[categoryField]
            .toLowerCase()
            .split(",")
            .map((c) => c.trim())
            .includes(selectedCategory.toLowerCase()));
  
      // 🍭 Flavour
      const matchesFlavour =
        selectedFlavours.length === 0 ||
        selectedFlavours.some(
          (flav) => flav.toLowerCase() === product[flavourField]?.toLowerCase()
        );
  
      // 🏭 Brand
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.some(
          (brand) => brand.toLowerCase() === product[brandField]?.toLowerCase()
        );
  
      // 💸 Price Range
      const productPrice = product[priceField];
      const matchesPrice =
        (minPrice == null || productPrice >= minPrice) &&
        (maxPrice == null || productPrice <= maxPrice);
  
      // ⭐ Minimum Rating
      const productRatings = product[ratingField];
      const averageRating = Array.isArray(productRatings)
        ? productRatings.reduce((sum, r) => sum + r.rating, 0) / productRatings.length || 0
        : 0;
  
      const matchesRating = minRating == null || averageRating >= minRating;
  
      return (
        matchesSearch &&
        matchesCategory &&
        matchesFlavour &&
        matchesBrand &&
        matchesPrice &&
        matchesRating
      );
    });
  }
  