import { render, screen, cleanup } from '@testing-library/react';
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

  const headers = ['High Priority', 'Medium Priority', 'Low Priority'];

  describe.each(headers)('conaints headers', (header) => {
    test(`${header}`, () => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});
