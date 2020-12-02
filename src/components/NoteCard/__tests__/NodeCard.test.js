import NoteCard from '../NoteCard';
import { screen, render, cleanup } from '@testing-library/react';

describe('NoteCard', () => {
  const props = { note: { title: 'title', notes: 'some notes', priority: 1 } };

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
  test('has correct background color for high priority', () => {
    expect(
      screen.getByTestId('component-note-card').classList.contains('high'),
    ).toBeTruthy();
  });
});
