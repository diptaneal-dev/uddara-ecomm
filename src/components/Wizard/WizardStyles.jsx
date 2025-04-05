// components/Wizard/WizardStyles.js
import styled, { css } from "styled-components";

export const WizardWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $layout }) => ($layout === "vertical" ? "row" : "column")};
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  gap: 2rem;
`;

export const StepSidebar = styled.div`
  flex: 0 0 ${({ $layout }) => ($layout === "vertical" ? "240px" : "auto")};
  display: flex;
  flex-direction: ${({ $layout }) => ($layout === "vertical" ? "column" : "row")};
  align-items: ${({ $layout }) => ($layout === "vertical" ? "flex-start" : "center")};
  gap: 1rem;
  border-right: ${({ $layout }) => ($layout === "vertical" ? "1px solid #ddd" : "none")};
  border-bottom: ${({ $layout }) => ($layout === "horizontal" ? "1px solid #ddd" : "none")};
  padding: 1rem 0;
`;

export const StepItem = styled.div`
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ theme, $active }) => ($active ? theme.colors.pink : theme.colors.grey)};
  border-left: ${({ $active }) => ($active ? "3px solid" : "none")};
  border-color: ${({ theme }) => theme.colors.pink};
  padding: ${({ $layout }) => ($layout === "vertical" ? "0.5rem 0.75rem" : "0.25rem 0.5rem")};
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
`;
