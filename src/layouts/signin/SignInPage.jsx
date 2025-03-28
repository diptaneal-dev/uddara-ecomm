// src/pages/auth/SignInPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";
import userService from "../../services/UserService";

import {
  Wrapper,
  Card,
  LeftCol,
  RightCol,
  Heading,
  Label,
  Input,
  InputGroup,
  List,
  ListItem,
  Error,
} from "./SignInPage.styles";

import { Button } from "../../components/Button/Button";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { userContext } = await userService.login(username, password);
      login(userContext);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message || "Invalid username or password");
    }
  };

  return (
    <Wrapper>
      <Card>
        {/* Left: Sign In */}
        <LeftCol>
          <Heading>Sign In</Heading>
          {errorMessage && <Error>{errorMessage}</Error>}

          <form onSubmit={handleSignIn}>
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div>
              <Label>Password <span style={{ color: "#888" }}>(Case Sensitive)</span></Label>

              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </InputGroup>

            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn(!keepSignedIn)}
                style={{ marginRight: "0.5rem" }}
              />
              <Label htmlFor="keepSignedIn">Keep me signed in</Label>
            </div>

            <Button type="submit" $variant="primary" className="w-100">
              Sign In
            </Button>

            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              <a href="/forgot-password" style={{ color: "#156082", textDecoration: "none" }}>
                Forgot your password?
              </a>
            </p>
          </form>
        </LeftCol>

        {/* Right: Create Account */}
        <RightCol>
          <Heading>Create Account</Heading>
          <List>
            <ListItem>✔ Exclusive offers and discounts</ListItem>
            <ListItem>✔ Faster checkout and order tracking</ListItem>
            <ListItem>✔ Save favorite products and wishlists</ListItem>
            <ListItem>✔ Personalized shopping experience</ListItem>
          </List>
          <Button
            $variant="secondary"
            $outline
            className="w-100 mt-4"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
        </RightCol>
      </Card>
    </Wrapper>
  );
};

export default SignInPage;
