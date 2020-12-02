import Note from '../Note';
import { screen, render, cleanup } from '@testing-library/react';

describe('Note', () => {
  const props = { note: { title: 'title', notes: 'some notes', priority: 1 } };

  beforeEach(() => {
    render(<Note {...props} />);
  });
  afterEach(() => {
    cleanup();
  });
  test('renders w/ error', () => {
    expect(screen.getByTestId('component-note')).toBeInTheDocument();
  });
});
