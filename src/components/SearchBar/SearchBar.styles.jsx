// src/components/SearchBar/SearchBar.Styles.js
import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
`;

export const SearchInput = styled.input`
  min-width: 250px;
  max-width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 6px;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.teal};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.teal}33;
  }
`;

export const SearchButton = styled.button`
  margin-left: 8px;
  border: none;
  background: transparent;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink};
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SearchIcon = styled.span`
  color: ${({ theme }) => theme.colors.white}; // darker by default
  font-size: 1rem;
  transition: color 0.3s ease;
`;
