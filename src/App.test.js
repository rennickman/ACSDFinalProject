import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';



test('can access login page', () => {
  render (<App />);

  // Get Login Link
  const loginLink = screen.getByTestId("loginLink");

  // Verify that we can access login Page
  fireEvent.click(loginLink);
  const loginInput = screen.getByPlaceholderText(/email/i)
  expect(loginInput).toBeInTheDocument();
});


test('can access registration page', () => {
  render(<App />);

  // Get Login Link
  const loginLink = screen.getByTestId("loginLink");
  // Navigate To Login Page
  fireEvent.click(loginLink);
  
  // Verfiy that we can access the registration page
  const registrationLink = screen.getByTestId("registrationLink");
  fireEvent.click(registrationLink);
  const backToLoginLink = screen.getByTestId("backToLogin");
  expect(backToLoginLink).toBeInTheDocument();
});


test('can change inputs in Login Form', () => {
  render(<App />);

  // Get Login Link
  const loginLink = screen.getByTestId("loginLink");
  // Navigate to Login Page
  fireEvent.click(loginLink);
  
  // Set test Values and grab inputs
  const testEmailValue = "testEmail";
  const testPasswordValue = "testPassword";
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  // Change input value and verify
  fireEvent.change(emailInput, { target: { value: testEmailValue } });
  expect(emailInput.value).toBe(testEmailValue);
  fireEvent.change(passwordInput, { target: { value: testPasswordValue } });
  expect(passwordInput.value).toBe(testPasswordValue);
});


test('can change inputs in registration form', () => {
  render(<App />);

  // Get Login Link
  const loginLink = screen.getByTestId("loginLink");
  // Navigate To Login Page
  fireEvent.click(loginLink);
  // Navigate to Registration Page
  const registrationLink = screen.getByTestId("registrationLink");
  fireEvent.click(registrationLink);

  // Set test Values and grab inputs
  const testEmailValue = "testEmail";
  const testPasswordValue = "testPassword";
  const testVerifyValue = "testVerify";
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByTestId("password");
  const verifyInput = screen.getByTestId("verify");

  // Change Input value and verify
  fireEvent.change(emailInput, { target: { value: testEmailValue } });
  expect(emailInput.value).toBe(testEmailValue);
  fireEvent.change(passwordInput, { target: { value: testPasswordValue } });
  expect(passwordInput.value).toBe(testPasswordValue);
  fireEvent.change(verifyInput, { target: { value: testVerifyValue } });
  expect(verifyInput.value).toBe(testVerifyValue);
});


test('email required by form', async () => {
  render(<App />);

  // Get Login Link
  const loginLink = screen.getByTestId("loginLink");
  // Navigate To Login Page
  fireEvent.click(loginLink);
  // Navigate to Registration Page
  const registrationLink = screen.getByTestId("registrationLink");
  fireEvent.click(registrationLink);

  // Set test Values and grab inputs
  const emailInput = screen.getByPlaceholderText(/email/i);
  const testPasswordValue = "testPassword";
  const testVerifyValue = "testVerify";
  const passwordInput = screen.getByTestId("password");
  const verifyInput = screen.getByTestId("verify");

  // Update all inputs except username
  fireEvent.change(passwordInput, { target: { value: testPasswordValue } });
  fireEvent.change(verifyInput, { target: { value: testVerifyValue } });

  
  
});


