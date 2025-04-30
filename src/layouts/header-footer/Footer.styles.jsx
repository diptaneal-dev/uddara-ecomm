import styled from "styled-components";

/* Outer Container */
export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
`;

/* Grid Layout */
export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) 1.5fr; // 4 normal columns + 1 wider for newsletter
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
    color: ${({ theme }) => theme.colors.white};
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
        color: ${({ theme }) => theme.colors.white};
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
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

/* Logo + Social */
export const StyledLogoCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    padding: 6px;
  }
`;

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
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
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
  background-color: ${({ theme }) => theme.colors.purple};
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
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    color: ${({ theme }) => theme.colors.white};

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: ${({ theme }) => theme.colors.white};
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

export const NewsletterColumn = styled(FooterColumn)`
  text-align: left;

  h5 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.white};
  }

  form {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input[type="email"] {
      flex: 1;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: none;
      font-size: 0.9rem;
      outline: none;
    }

    button {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      border: none;
      background-color: ${({ theme }) => theme.colors.gold};
      color: white;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.pink};
      }
    }
  }

  @media (max-width: 768px) {
    form {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;

      input[type="email"] {
        width: 100%;
        padding: 0.4rem 0.75rem;
        font-size: 0.85rem;
      }

      button {
        width: 100%;
        height: 38px;
        font-size: 0.9rem;
        border-radius: 6px;
      }
    }
  }
`;
