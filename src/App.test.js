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
    expect(screen.getAllByTestId('add-note-button')).toHaveLength(3);
  });

  const headers = ['High Priority', 'Medium Priority', 'Low Priority'];

  describe.each(headers)('conaints headers', (header) => {
    test(`${header}`, () => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  describe('with note popup not in dom', () => {
    test('shows popup on selecting add new button', () => {
      const addButton = screen.getAllByTestId('add-note-button')[0];
      fireEvent.click(addButton);
      const note = screen.getByTestId('component-note');
      expect(note).toBeInTheDocument();
    });

    test('has high priority level selected when new high priority note is opened', () => {
      const addButton = screen.getAllByTestId('add-note-button')[0];
      fireEvent.click(addButton);
      const priority = screen.getByTestId('priority-select');
      expect(priority.value).toBe('high');
    });
    test('has medium priority level selected when new medium priority note is opened', () => {
      const addButton = screen.getAllByTestId('add-note-button')[1];
      fireEvent.click(addButton);
      const priority = screen.getByTestId('priority-select');
      expect(priority.value).toBe('medium');
    });
    test('has low priority level selected when new low priority note is opened', () => {
      const addButton = screen.getAllByTestId('add-note-button')[2];
      fireEvent.click(addButton);
      const priority = screen.getByTestId('priority-select');
      expect(priority.value).toBe('low');
    });
  });
});
