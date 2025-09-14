import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div `
  background-color: rgba(30, 33, 36, 0.95);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  margin: 1rem;
`;

const Title = styled.h1 `
  color: white;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label `
  color: #b9bbbe;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Input = styled.input `
  padding: 0.75rem;
  background-color: #40444b;
  border: 1px solid transparent;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #5865f2;
  }
`;

const RememberMe = styled.div `
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b9bbbe;
  font-size: 0.875rem;
`;

const LoginButton = styled.button `
  background-color: #5865f2;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4752c4;
  }
`;

const ForgotPassword = styled.a `
  color: #00b0f4;
  font-size: 0.875rem;
  text-decoration: none;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpText = styled.p `
  color: #b9bbbe;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;

  a {
    color: #00b0f4;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <FormContainer>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input 
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required 
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </InputGroup>

                <RememberMe>
                    <input 
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                </RememberMe>

                <LoginButton type="submit">LOGIN</LoginButton>
                
                <ForgotPassword href="#">Forgot your password?</ForgotPassword>
            </Form>
            
            <SignUpText>
                New here? <a href="#">Sign Up</a>
            </SignUpText>
        </FormContainer>
    );
};

export default LoginForm; 

