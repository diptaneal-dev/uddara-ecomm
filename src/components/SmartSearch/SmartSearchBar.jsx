import React, { useState } from 'react';
import { FaSearch, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { Button } from '../Button/Button';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputGroup = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 4px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  line-height: 1.2;
  padding: 0.6rem 2.5rem 0.6rem 2.5rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 0 0 2px rgba(102, 48, 144, 0.15);
  }
`;

const IconLeft = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const ClearIconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  padding: 2px;
  height: 12px;
  width: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 10px;
    color: #fff;
  }

  &:hover {
    opacity: 0.85;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  max-height: 160px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function SmartSearchBar({
    placeholderFields = ['name', 'email'],
    onSearch,
    recentSearches = [],
    recentLocations = [],
}) {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    const placeholder =
        placeholderFields.length === 1
            ? `Search by ${placeholderFields[0]}`
            : `Search by ${placeholderFields.slice(0, -1).join(', ')} or ${placeholderFields.at(-1)}`;

    const handleSubmit = () => {
        onSearch?.(query, location);
        setShowSearchDropdown(false);
        setShowLocationDropdown(false);
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleSubmit();
        }}>
            <Wrapper>
                {/* Search Input */}
                <InputGroup onMouseLeave={() => setShowSearchDropdown(false)}>
                    <IconLeft><FaSearch /></IconLeft>
                    <StyledInput
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowSearchDropdown(true)}
                    />
                    {query && (
                        <ClearIconWrapper onClick={() => setQuery('')}>
                            <FaTimes />
                        </ClearIconWrapper>
                    )}
                    {showSearchDropdown && recentSearches.length > 0 && (
                        <Dropdown>
                            {recentSearches.map((item, idx) => (
                                <DropdownItem key={idx} onMouseDown={() => setQuery(item)}>
                                    {item}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </InputGroup>

                {/* Location Input */}
                <InputGroup onMouseLeave={() => setShowLocationDropdown(false)}>
                    <IconLeft><FaMapMarkerAlt /></IconLeft>
                    <StyledInput
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onFocus={() => setShowLocationDropdown(true)}
                    />
                    {location && (
                        <ClearIconWrapper onClick={() => setLocation('')}>
                            <FaTimes />
                        </ClearIconWrapper>
                    )}
                    {showLocationDropdown && recentLocations.length > 0 && (
                        <Dropdown>
                            {recentLocations.map((loc, idx) => (
                                <DropdownItem key={idx} onMouseDown={() => setLocation(loc)}>
                                    {loc}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </InputGroup>

                {/* Search Button */}
                <div>
                    <Button
                        $variant="primary"
                        $size="md"
                        $outline
                        type="submit" // ✅ so Enter submits too
                        style={{ borderRadius: '8px' }}
                    >
                        Search
                    </Button>
                </div>
            </Wrapper>
        </form>
    );
}
