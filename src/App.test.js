import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  afterEach(() => {
    cleanup();
  });

  test('renders component-app', () => {
    expect(screen.getByTestId('component-app')).toBeInTheDocument();
  });

  test('renders 3 note card containers', () => {
    expect(screen.getAllByTestId('note-card-container')).toHaveLength(3);
  });

  test('renders add button', () => {
    expect(screen.getByTestId('add-note-button')).toBeInTheDocument();
  });

  const headers = ['High Priority', 'Medium Priority', 'Low Priority'];

  describe.each(headers)('conaints headers', (header) => {
    test(`${header}`, () => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  describe('with note popup not in dom', () => {
    test('shows popup on selecting add new button', () => {
      const addButton = screen.getByTestId('add-note-button');
      fireEvent.click(addButton);
      const note = screen.getByTestId('component-note');
      expect(note).toBeInTheDocument();
    });
  });
});
