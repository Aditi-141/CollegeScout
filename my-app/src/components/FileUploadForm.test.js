import { render, screen, fireEvent } from '@testing-library/react';
import FileUploadForm from './FileUploadForm';

beforeAll(() => {
    global.alert = jest.fn(); // Mock alert
  });

test('renders FileUploadForm component', () => {
  render(<FileUploadForm />);
  expect(screen.getByText('Welcome to College Scout')).toBeInTheDocument();
});

test('handles file selection', () => {
  render(<FileUploadForm />);
  const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
  const input = screen.getByLabelText(/browse/i);
  fireEvent.change(input, { target: { files: [file] } });
  expect(screen.getByText('example.txt is ready to be uploaded.')).toBeInTheDocument();
});

test('handles form submission with no file', () => {
  render(<FileUploadForm />);
  const submitButton = screen.getByText('Upload');
  fireEvent.click(submitButton);
  expect(screen.queryByText('Analyzing...')).not.toBeInTheDocument();
});
