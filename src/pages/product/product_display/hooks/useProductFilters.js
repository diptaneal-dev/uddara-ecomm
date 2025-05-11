import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useProductFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasHandledShowcaseRedirect = useRef(false);
  const skipSyncRef = useRef(false);

  // ✅ Memoize parsed query parameters so they don't recompute on every render
  const {
    initialQuery,
    initialFlavours,
    initialBrands,
    initialCategory,
  } = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return {
      initialQuery: decodeURIComponent(urlParams.get("query") || "").replace(/\+/g, " "),
      initialFlavours: urlParams.getAll("flavour"),
      initialBrands: urlParams.getAll("brand"),
      initialCategory: urlParams.get("category") || "All",
    };
  }, [location.search]);

  // ✅ Memoize state check to avoid triggering unnecessary re-renders
  const fromShowcase = useMemo(() => location.state?.fromBrandShowcase, [location.state]);

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFlavours, setSelectedFlavours] = useState(initialFlavours);
  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // ✅ Initial load or brand showcase redirect logic
  useEffect(() => {
    if (fromShowcase && !hasHandledShowcaseRedirect.current) {
      hasHandledShowcaseRedirect.current = true;

      setSearchQuery("");
      setSelectedFlavours([]);
      setSelectedBrands(initialBrands);
      setSelectedCategory("All");

      navigate(location.pathname + location.search, {
        replace: true,
        state: {}, // clear the flag
      });
    } else {
      setSearchQuery(initialQuery);
      setSelectedFlavours(initialFlavours);
      setSelectedBrands(initialBrands);
      setSelectedCategory(initialCategory);
    }
  }, [
    fromShowcase,
    initialQuery,
    initialFlavours,
    initialBrands,
    initialCategory,
    location.pathname,
    location.search,
    navigate,
  ]);

  // ✅ Sync UI state back to the URL (loop-safe)
  useEffect(() => {
    if (skipSyncRef.current) {
      skipSyncRef.current = false;
      return;
    }

    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("query", searchQuery);
    if (selectedCategory && selectedCategory !== "All") newParams.set("category", selectedCategory);
    selectedFlavours.forEach((f) => newParams.append("flavour", f));
    selectedBrands.forEach((b) => newParams.append("brand", b));

    const currentParams = new URLSearchParams(location.search);
    if (newParams.toString() !== currentParams.toString()) {
      skipSyncRef.current = true;
      navigate(`/products?${newParams.toString()}`, { replace: true });
    }
  }, [
    searchQuery,
    selectedCategory,
    selectedFlavours,
    selectedBrands,
    location.search,
    navigate,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFlavours([]);
    setSelectedBrands([]);
    setSelectedCategory("All");
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedFlavours,
    setSelectedFlavours,
    selectedBrands,
    setSelectedBrands,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
  };
};
