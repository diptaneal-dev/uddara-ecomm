// src/components/SearchBar/SearchBar.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchIcon
} from "./HeaderLayout.styles";

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  initialQuery = "",
  className = "",
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery && typeof onSearch === "function") {
      onSearch(trimmedQuery);
    }
  };

  return (
    <SearchForm className={className} onSubmit={handleSubmit}>
      <SearchInput
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton type="submit">
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
      </SearchButton>
    </SearchForm>
  );
};

export default SearchBar;
