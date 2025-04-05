import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 180px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.smallText.fontSize};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 4px;
  display: block;
`;

const SelectDisplay = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  cursor: pointer;
  background-color: ${({ theme, $variant }) =>
    $variant === 'filled' ? theme.colors.buttonPrimary : theme.colors.white};
  color: ${({ theme, $variant }) =>
    $variant === 'filled' ? theme.colors.buttonText : theme.colors.black};
  min-height: 44px;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 0 0 2px rgba(102, 48, 144, 0.15);
  }
`;

const Placeholder = styled.span`
  color: #aaa;
  font-size: 0.9rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
`;

const Option = styled.div`
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ selected }) => (selected ? '#f0f0f0' : 'white')};

  &:hover {
    background-color: #f9f9f9;
  }

  input[type="checkbox"] {
    margin: 0;
  }
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.purple};
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TagClose = styled(FaTimes)`
  font-size: 0.6rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #eee;
`;

export const SelectBox = ({
    label,
    value,
    onChange,
    options = [],
    searchable = false,
    placeholder = 'Select...',
    multi = false,
    checkboxes = false,
    variant = 'default',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const ref = useRef();

    // Normalize value based on mode
    const normalizedValue = multi
        ? Array.isArray(value) ? value : []
        : value ?? '';

    const isSelected = (val) =>
        multi ? normalizedValue.includes(val) : normalizedValue === val;

    const toggleOption = (val) => {
        if (multi) {
            if (value.includes(val)) {
                onChange(value.filter((v) => v !== val));
            } else {
                onChange([...value, val]);
            }
        } else {
            onChange(val);
            setIsOpen(false);
        }
    };

    const removeTag = (val) => {
        onChange(value.filter((v) => v !== val));
    };

    const filteredOptions = searchable
        ? options.filter((opt) =>
            opt.label.toLowerCase().includes(filter.toLowerCase())
        )
        : options;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Container ref={ref}>
            {label && <Label>{label}</Label>}
            <SelectDisplay onClick={() => setIsOpen((prev) => !prev)} $variant={variant} tabIndex={0}>
                {multi ? (  
                    normalizedValue.length === 0 ? (
                        <Placeholder>{placeholder}</Placeholder>
                    ) : (
                        normalizedValue.map((val) => {
                            const label = options.find((o) => o.value === val)?.label || val;
                            return (
                                <Tag key={val}>
                                    {label}
                                    <TagClose
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeTag(val);
                                        }}
                                    />
                                </Tag>
                            );
                        })
                    )
                ) : (
                    <span>
                        {options.find((o) => o.value === value)?.label || placeholder}
                    </span>
                )}
                <FaChevronDown style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#aaa' }} />
            </SelectDisplay>

            {isOpen && (
                <Dropdown>
                    {searchable && (
                        <SearchInput
                            placeholder="Search..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    )}
                    {filteredOptions.map((opt) => (
                        <Option
                            key={opt.value}
                            selected={isSelected(opt.value)}
                            onClick={() => toggleOption(opt.value)}
                        >
                            {checkboxes && multi && (
                                <input
                                    type="checkbox"
                                    checked={isSelected(opt.value)}
                                    readOnly
                                />
                            )}
                            {opt.label}
                        </Option>
                    ))}
                </Dropdown>
            )}
        </Container>
    );
};
