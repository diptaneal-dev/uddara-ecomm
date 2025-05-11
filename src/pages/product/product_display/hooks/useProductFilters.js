import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useProductFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const skipNextSync = useRef(false);
  const hasHandledShowcaseRedirect = useRef(false);

  const {
    initialQuery,
    initialFlavours,
    initialBrands,
    initialCategory
  } = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return {
      initialQuery: decodeURIComponent(urlParams.get("query") || "").replace(/\+/g, " "),
      initialFlavours: urlParams.getAll("flavour"),
      initialBrands: urlParams.getAll("brand"),
      initialCategory: urlParams.get("category") || "All",
    };
  }, [location.search]);

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFlavours, setSelectedFlavours] = useState(initialFlavours);
  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const fromShowcase = useMemo(() => location.state?.fromBrandShowcase, [location.state]);

  useEffect(() => {
    if (fromShowcase && !hasHandledShowcaseRedirect.current) {
      hasHandledShowcaseRedirect.current = true;
      setSearchQuery("");
      setSelectedFlavours([]);
      setSelectedBrands(initialBrands);
      setSelectedCategory("All");

      navigate(location.pathname + location.search, {
        replace: true,
        state: {},
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

  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }

    const buildParams = () => {
      const params = new URLSearchParams();
      if (searchQuery) params.set("query", searchQuery);
      if (selectedCategory && selectedCategory !== "All") params.set("category", selectedCategory);
      selectedFlavours.forEach((f) => params.append("flavour", f));
      selectedBrands.forEach((b) => params.append("brand", b));
      return params;
    };

    const newParams = buildParams();
    const currentParams = new URLSearchParams(location.search);

    // Compare logically
    const areEqual = [...newParams.entries()].every(([key, value]) => {
      const current = currentParams.getAll(key).sort().join(",");
      const next = newParams.getAll(key).sort().join(",");
      return current === next;
    });

    if (!areEqual) {
      skipNextSync.current = true;
      navigate(`/products?${newParams.toString()}`, { replace: true });
    }
  }, [
    searchQuery,
    selectedFlavours,
    selectedBrands,
    selectedCategory,
    location.search,
    navigate
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
