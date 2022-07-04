import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PageletA', () => {
  render(<App />);
  const pageletAHeader = screen.getByText(/PageletA/i);
  expect(pageletAHeader).toBeInTheDocument();
});
