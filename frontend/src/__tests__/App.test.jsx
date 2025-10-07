import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders home page heading', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const heading = screen.getByText(/Delicious Food Delivered Fast/i);
  expect(heading).toBeInTheDocument();
});
