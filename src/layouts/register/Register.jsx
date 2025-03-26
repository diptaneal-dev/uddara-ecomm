import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import userService from "../../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast, faGift, faTag, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import {
  PageWrapper,
  Layout,
  FormCard,
  PerksCard,
  Heading,
  SubText,
  InputGroup
} from "./Register.styles"; 

import styled, { useTheme as useStyledTheme } from "styled-components";

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.purple};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  color: ${({ theme }) => theme.colors.black};
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  input {
    margin-right: 0.5rem;
  }

  label {
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonPrimary};
  color: ${({ theme }) => theme.colors.buttonText};
  font-weight: 600;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.buttonDisabled};
    cursor: not-allowed;
  }
`;

const PerkItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.95rem;

  svg {
    margin-right: 0.75rem;
    color: ${({ theme }) => theme.colors.teal};
  }
`;

const Register = () => {
  const { darkMode } = useTheme();
  const theme = useStyledTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthMonth: "",
    birthDay: "",
    phoneNumber: "",
    signUpEmails: false,
    textAlerts: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    const updatedFormData = { ...formData, username: formData.email };

    try {
      await userService.register(updatedFormData);
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => navigate('/home'), 2000);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Layout>
        <FormCard>
          <Heading>Create an Account</Heading>
          <SubText>
            You’ll automatically be enrolled in Star Rewards and unlock member perks. Plus, sign up for emails to receive an extra 25% off* your next purchase.
          </SubText>

          <form onSubmit={handleRegister}>
            <Label>First Name</Label>
            <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required />

            <Label>Last Name</Label>
            <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required />

            <Label>Email Address</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <Label>Password</Label>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </InputGroup>

            <Label>Re-enter Password</Label>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

            <Label>Birthday Month</Label>
            <Select name="birthMonth" value={formData.birthMonth} onChange={handleInputChange} required>
              <option value="">Select Month</option>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </Select>

            <Label>Day</Label>
            <Select name="birthDay" value={formData.birthDay} onChange={handleInputChange} required>
              <option value="">Select Day</option>
              {[...Array(31).keys()].map(day => (
                <option key={day + 1} value={day + 1}>{day + 1}</option>
              ))}
            </Select>

            <Label>Phone Number</Label>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />

            <CheckboxWrapper>
              <input type="checkbox" name="signUpEmails" checked={formData.signUpEmails} onChange={handleInputChange} />
              <label>Sign up for emails & receive an extra 25% off*</label>
            </CheckboxWrapper>

            <CheckboxWrapper>
              <input type="checkbox" name="textAlerts" checked={formData.textAlerts} onChange={handleInputChange} />
              <label>Get text alerts on sales, orders & important account info</label>
            </CheckboxWrapper>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Registering..." : "Create Account"}
            </SubmitButton>

            {errorMessage && <p style={{ color: theme.colors.pink }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: theme.colors.teal }}>{successMessage}</p>}
          </form>
        </FormCard>

        <PerksCard>
          <Heading as="h3">Enjoy These Perks</Heading>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <PerkItem><FontAwesomeIcon icon={faShippingFast} /> Free returns & shipping at $25</PerkItem>
            <PerkItem><FontAwesomeIcon icon={faGift} /> Earn points on every purchase</PerkItem>
            <PerkItem><FontAwesomeIcon icon={faTag} /> Exclusive offers & birthday surprises</PerkItem>
            <PerkItem><FontAwesomeIcon icon={faCreditCard} /> Faster checkout with secure storage</PerkItem>
          </ul>
        </PerksCard>
      </Layout>
    </PageWrapper>
  );
};

export default Register;
