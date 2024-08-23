import { render, screen } from '@testing-library/react';
import UploadStatus from './UploadStatus';

test('renders loading message when isLoading is true', () => {
  render(<UploadStatus isLoading={true} uploadSuccess={false} />);
  expect(screen.getByText('Analyzing your SOP...')).toBeInTheDocument();
});

test('renders success message when uploadSuccess is true', () => {
  render(<UploadStatus isLoading={false} uploadSuccess={true} />);
  expect(screen.getByText('Upload Successful! Analyzing complete.')).toBeInTheDocument();
});

test('renders nothing when neither isLoading nor uploadSuccess', () => {
  render(<UploadStatus isLoading={false} uploadSuccess={false} />);
  expect(screen.queryByText('Analyzing your SOP...')).not.toBeInTheDocument();
  expect(screen.queryByText('Upload Successful! Analyzing complete.')).not.toBeInTheDocument();
});
