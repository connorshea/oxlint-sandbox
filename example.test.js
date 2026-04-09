import { render, screen } from '@testing-library/react';

test('example test', () => {
  const { getByText } = render(<div>Hello</div>);
  // This should trigger testing-library/prefer-screen-queries
  expect(getByText('Hello')).toBeInTheDocument();
});
