// src/components/StoreSwitcher/StoreSwitcherIcon.jsx
import React, { useState } from "react";
import { Store } from "lucide-react";
import styled from "styled-components";
import { IconButton } from "../Button/IconButton";
import { useTheme } from "styled-components";

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  min-width: 200px;
`;

const StoreItem = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.seashell};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

export default function StoreSwitcherIcon({ stores = [], onSwitch }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((o) => !o);

    const handleSelect = (store) => {
        localStorage.setItem("activeStoreId", store.id);
        setOpen(false);
        onSwitch?.(store); // Optional callback
        window.location.reload(); // or soft refresh with router
    };

    return (
        <Wrapper>
            <IconButton
                onClick={toggle}
                title="Switch Store"
                color={theme.colors.white}
                $hoverColor={theme.colors.pink}
                $hoverIconColor={theme.colors.white}
                iconSize="md"
            >
                <Store size={20} />
            </IconButton>

            {open && (
                <Dropdown>
                    {stores.map((store) => (
                        <StoreItem key={store.id} onClick={() => handleSelect(store)}>
                            {store.storeName}
                        </StoreItem>
                    ))}
                </Dropdown>
            )}
        </Wrapper>
    );
}
