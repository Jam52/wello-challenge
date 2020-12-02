import NoteCard from '../NoteCard';
import { screen, render, cleanup } from '@testing-library/react';

describe('NoteCard', () => {
  const props = { note: { title: 'title' } };

  beforeEach(() => {
    render(<NoteCard {...props} />);
  });
  afterEach(() => {
    cleanup();
  });
  test('renders w/ error', () => {
    expect(screen.getByTestId('component-note-card')).toBeInTheDocument();
  });

  test('renders title passed in props', () => {
    expect(screen.getByText(props.note.title)).toBeInTheDocument();
  });
});
