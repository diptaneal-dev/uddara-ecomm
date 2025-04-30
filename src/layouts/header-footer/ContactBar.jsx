import React from 'react';
import styled from 'styled-components';
import { Mail, Phone } from 'lucide-react'; // Import Lucide icons

// Styled Components
const ContactBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  height: 30px;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.smallText.fontSize};
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  color: ${({ theme }) => theme.colors.seashell};
  position: relative; /* Removed 'absolute' and added 'relative' */
  z-index: 9999;
  margin-bottom: 10px; /* Added margin to separate it from the rest of the header */
`;

const ContactItem = styled.span`
  display: flex;
  align-items: center;
  margin-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const IconWrapper = styled.div`
  margin-right: 5px;
  color: ${({ theme }) => theme.colors.gold}; 
`;

const ContactBar = ({ email, phone }) => {
  return (
    <ContactBarWrapper>
      <ContactItem>
        <IconWrapper>
          <Mail size={16} /> {/* Lucide mail icon */}
        </IconWrapper>
        {email}
      </ContactItem>
      <ContactItem>
        <IconWrapper>
          <Phone size={16} /> {/* Lucide phone icon */}
        </IconWrapper>
        {phone}
      </ContactItem>
    </ContactBarWrapper>
  );
};

export default ContactBar;
