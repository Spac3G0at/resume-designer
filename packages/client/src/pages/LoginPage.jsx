import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../features/auth/authActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Mock login logic
    if (email && password) {
      setError("");
      dispatch(login({ email, password }));
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <LoginContainer>
      <FormContainer onSubmit={handleLogin}>
        <Title>Login</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <SubmitButton type="submit">Login</SubmitButton>
        </div>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background-color);
`;

const FormContainer = styled.form`
  background: var(--paper-color);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const InputField = styled.input`
  /* width: 100%; */
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;
