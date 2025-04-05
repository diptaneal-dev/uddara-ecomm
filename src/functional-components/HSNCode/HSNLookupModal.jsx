// components/HSNLookup/HSNLookupModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { mockHSNCodes } from "../../data/mockHSNCodes";
import { Button } from "../../components/Button/Button";

const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const ResultList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const ResultItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

export default function HSNLookupModal({ onClose, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = mockHSNCodes.filter(
    item =>
      item.code.includes(search) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>Select HSN Code</h3>
        <Input
          placeholder="Search HSN by code or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ResultList>
          {filtered.map(item => (
            <ResultItem key={item.code} onClick={() => onSelect(item.code)}>
              <strong>{item.code}</strong> — {item.description}
            </ResultItem>
          ))}
        </ResultList>
        <Button $outline $variant="primary" onClick={onClose}>Close</Button>
      </ModalBox>
    </Backdrop>
  );
}
