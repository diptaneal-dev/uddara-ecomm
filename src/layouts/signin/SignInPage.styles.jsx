import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  overflow: hidden;
`;
export const LeftCol = styled.div`
  flex: 1 1 50%;
  padding: 3rem 2rem 3rem 2rem;
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
`;

export const RightCol = styled.div`
  flex: 1 1 50%;
  padding: 3rem 2rem 3rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
`;

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 0.95rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  input {
    flex: 1;
    padding-right: 4rem;
  }

button {
  position: absolute;
  right: 0.5rem;
  top: 40%;  
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey};
  padding: 0;
  cursor: pointer;

  &:hover {
    background: none;
    color: ${({ theme }) => theme.colors.black};
  }
}
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 80%;
  margin: 0 auto;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  color: ${({ theme }) => theme.colors.black};
`;

export const Error = styled.div`
  background-color: #f8d7da;
  color: #842029;
  font-size: 0.9rem;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
`;
