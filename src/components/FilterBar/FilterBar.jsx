import React, { useState, useEffect } from 'react';
import { SelectBox } from '../SelectBox/SelectBox';
import styled from 'styled-components';
import { filterConfig } from './filterConfig';

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-end;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterItem = styled.div`
  flex: 1 1 180px;
  max-width: 160px;
  min-width: 100px;
  margin: 10px;
`;

const PivotFilterItem = styled(FilterItem)`
  max-width: 180px;
  min-width: 100px;
  flex: none;
`;

const FilterBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
`;


export const FilterBar = ({ initialPivot = 'User', onFiltersChange }) => {
    const [pivot, setPivot] = useState(initialPivot);
    const [filters, setFilters] = useState({});

    // Reset filters when pivot changes
    useEffect(() => {
        const defaultFilters = {};
        (filterConfig[pivot] || []).forEach((f) => {
            defaultFilters[f.key] = f.multi ? [] : '';
        });
        setFilters(defaultFilters);
        onFiltersChange?.(pivot, defaultFilters);
    }, [pivot]);

    const handleFilterChange = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        onFiltersChange?.(pivot, updated);
    };

    return (
        <FilterBarWrapper>
            <FilterRow>
                <PivotFilterItem>
                    <SelectBox
                        label=""
                        value={pivot}
                        onChange={setPivot}
                        options={Object.keys(filterConfig).map((p) => ({ label: p, value: p }))}
                        variant="filled"
                    />
                </PivotFilterItem>

                {(filterConfig[pivot] || []).map((filter) => (
                    <FilterItem key={filter.key}>
                        <SelectBox
                            label=""
                            value={filters[filter.key]}
                            onChange={(val) => handleFilterChange(filter.key, val)}
                            options={filter.options}
                            multi={filter.multi}
                            checkboxes={filter.checkboxes}
                            searchable
                        />
                    </FilterItem>
                ))}
            </FilterRow>
        </FilterBarWrapper>
    );
};
