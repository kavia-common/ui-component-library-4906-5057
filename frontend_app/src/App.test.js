import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders header brand', () => {
  render(<App />);
  const brand = screen.getByText(/Ocean UI/i);
  expect(brand).toBeInTheDocument();
});
