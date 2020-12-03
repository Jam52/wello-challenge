import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
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

  test('renders add buttons', () => {
    expect(screen.getAllByTestId('add-note-button')).toHaveLength(3);
  });

  const headers = ['High Priority', 'Medium Priority', 'Low Priority'];

  describe.each(headers)('contains headers', (header) => {
    test(`${header}`, () => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  describe('without note popup not in dom', () => {
    test('shows popup on selecting add new button', () => {
      const addButton = screen.getAllByTestId('add-note-button')[0];
      fireEvent.click(addButton);
      const note = screen.getByTestId('component-note');
      expect(note).toBeInTheDocument();
    });

    const priorityData = [
      { button: 0, priority: 'high' },
      { button: 1, priority: 'medium' },
      { button: 2, priority: 'low' },
    ];

    describe.each(priorityData)('when new note button is pressed', (data) => {
      test(`note had ${data.priority} level when new note button from corrisponding note container is selected`, () => {
        const addButton = screen.getAllByTestId('add-note-button')[data.button];
        fireEvent.click(addButton);
        const priority = screen.getByTestId('priority-select');
        expect(priority.value).toBe(data.priority);
      });
    });
  });

  describe('when new note popup is already in the dom', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = render(<App />);
      const addButton = screen.getAllByTestId('add-note-button')[0];
      fireEvent.click(addButton);
    });
    afterEach(() => {
      cleanup();
    });
    test('removes note popup when cancle symbol is selected', () => {
      const { queryByTestId, getByTestId } = wrapper;
      const cancleButton = getByTestId('note-delete');
      fireEvent.click(cancleButton);
      expect(queryByTestId('component-note')).toBeNull();
    });
    test('adds noteCard when note is closed', () => {
      const { getAllByTestId, getByTestId } = wrapper;
      const titleInput = getByTestId('title-input');
      fireEvent.change(titleInput, { target: { value: 'note title' } });
      const saveButton = getByTestId('note-save');
      fireEvent.click(saveButton);
      expect(getAllByTestId('component-note-card')).toHaveLength(1);
    });
  });
});
