// src/components/SearchBar/SearchBar.Styles.js
import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
`;

export const SearchInput = styled.input`
  min-width: 250px;
  max-width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
`;

export const SearchButton = styled.button`
  border: none;
  background: transparent;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.navy};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 6px;
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SearchIcon = styled.span`
  color: ${({ theme }) => theme.colors.purple};
  transition: color 0.3s ease;
  font-size: 1rem;
`;
