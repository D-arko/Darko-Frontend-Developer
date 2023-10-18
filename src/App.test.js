import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Check if the component renders without errors
test('renders App component', () => {
  render(<App />);
  const headerElement = screen.getByText(/SpaceX Rockets/i);
  expect(headerElement).toBeInTheDocument();
});

// Check if the search input works
test('search input works', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('Search Rockets');

  // Wrap the user interaction in act
  act(() => {
    userEvent.type(searchInput, 'Falcon');
  });

  // Check if the input value is updated
  expect(searchInput).toHaveValue('Falcon');

  // Use a more flexible text matcher for rocket name
  const rocketNameElement = screen.getByText(/Falcon/i, { exact: false });
  expect(rocketNameElement).toBeInTheDocument();
});
