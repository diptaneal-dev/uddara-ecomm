import React from "react";
import styled from "styled-components";
import {
  SidebarFilters,
  FilterGroup,
  FilterLabel,
  FilterOption,
  ClearFilterButton,
} from "../../pages/ProductList.styles";

const StyledSelect = styled.select`
  padding: 8px 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  font-size: 1rem;
  background-color: white;
`;

export const ProductFilters = ({ config, clearFilters, handleMultiSelect }) => {
  return (
    <SidebarFilters>
      <ClearFilterButton onClick={clearFilters}>Clear All Filters</ClearFilterButton>

      {config.map((filter) => (
        <FilterGroup key={filter.key}>
          <FilterLabel>{filter.label}</FilterLabel>

          {/* Select Dropdown */}
          {filter.type === "select" ? (
            <StyledSelect
              value={filter.getValue() || ""}
              onChange={(e) => filter.setValue(e.target.value)}
            >
              <option value="">-- All --</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </StyledSelect>
          ) : (
            // Checkbox or Radio
            filter.options.map((option) => {
              const selectedValue = filter.getValue();
              const isChecked =
                filter.type === "checkbox"
                  ? selectedValue.includes(option)
                  : selectedValue === option;

              const handleChange = () => {
                if (filter.type === "checkbox") {
                  handleMultiSelect(option, selectedValue, filter.setValue);
                } else {
                  filter.setValue(option);
                }
              };

              return (
                <FilterOption key={option}>
                  <input
                    type={filter.type}
                    name={filter.key}
                    checked={isChecked}
                    onChange={handleChange}
                  />
                  {option}
                </FilterOption>
              );
            })
          )}
        </FilterGroup>
      ))}
    </SidebarFilters>
  );
};
