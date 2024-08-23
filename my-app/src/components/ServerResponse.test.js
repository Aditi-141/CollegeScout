import { render, screen, fireEvent } from '@testing-library/react';
import ServerResponse from './ServerResponse';

const mockResponse = {
  name: "John Doe",
  program: "Computer Science",
  colleges: [
    { collegeName: "University A", similarity: "90%", description: "Top choice for CS." },
    { collegeName: "University B", similarity: "85%", description: "Strong program in AI." },
    { collegeName: "University C", similarity: "80%", description: "Great for software engineering." },
  ],
};

test('renders ServerResponse with data', () => {
  render(<ServerResponse serverResponse={mockResponse} showMore={false} toggleShowMore={() => {}} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Computer Science')).toBeInTheDocument();
  expect(screen.getByText('University A')).toBeInTheDocument();
  expect(screen.queryByText('University C')).not.toBeInTheDocument();
});

test('shows more colleges when "Show More" is clicked', () => {
  const toggleShowMore = jest.fn();
  render(<ServerResponse serverResponse={mockResponse} showMore={false} toggleShowMore={toggleShowMore} />);
  const showMoreButton = screen.getByText('Show More');
  fireEvent.click(showMoreButton);
  expect(toggleShowMore).toHaveBeenCalled();
});
