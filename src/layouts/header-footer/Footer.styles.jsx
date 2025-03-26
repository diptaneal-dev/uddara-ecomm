import styled from "styled-components";

/* Outer Container */
export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.headerfootercolor};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
`;

/* Grid Layout */
export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1.5rem 1rem;
  align-items: start;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem 1rem;
    text-align: center;
  }
`;

/* Each Column */
export const FooterColumn = styled.div`
  position: relative;
  padding: 0 1rem;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1px;
    border-right: 1px dotted ${({ theme }) => theme.colors.grey};
    opacity: 0.4;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.navy};
    font-family: ${({ theme }) => theme.typography.fontPrimary};

    svg {
      margin-right: 0.4rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.4rem;

      a {
        color: ${({ theme }) => theme.colors.black};
        text-decoration: none;
        font-family: ${({ theme }) => theme.typography.fontSecondary};
        font-size: 0.9rem;

        &:hover {
          text-decoration: underline;
        }
      }

      em {
        font-style: italic;
        font-size: 0.9rem;
        color: ${({ theme }) => theme.colors.grey};
      }
    }
  }
`;

/* Logo + Social */
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/* Social Icons */
export const SocialTray = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
`;

export const IconCircle = styled.div`
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.colors.navy};
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink};
  }
`;

/* Footer Bottom */
export const FooterBottom = styled.div`
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.headerfootercolor};
  text-align: center;
`;

/* Bottom Row */
export const FooterBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.8rem;
  margin-top: 1rem;

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    font-family: ${({ theme }) => theme.typography.fontSecondary};
    color: ${({ theme }) => theme.colors.black};

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.black};

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: ${({ theme }) => theme.colors.black};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;

    div {
      justify-content: center;
    }
  }
`;
