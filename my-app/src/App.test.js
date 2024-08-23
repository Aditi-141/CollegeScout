import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the FileUpload component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Welcome to College Scout/i);
  expect(headerElement).toBeInTheDocument();
});

