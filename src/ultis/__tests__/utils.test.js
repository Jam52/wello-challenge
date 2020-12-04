import { returnFilteredNotes, removeNoteFromArray } from '../index';

describe('FilterNotes', () => {
  const notes = [
    {
      id: 1,
      title: 'hello',
      notes: 'some notes',
      priority: 'low',
    },
    {
      id: 2,
      title: 'everyone',
      notes: 'some more notes',
      priority: 'low',
    },
    {
      id: 3,
      title: 'at wello',
      notes: 'I hope this works!',
      priority: 'low',
    },
  ];

  test('filters notes by input text', () => {
    const filterText = 'ello';
    const expectedOutcome = [notes[0], notes[2]];
    expect(returnFilteredNotes(notes, filterText)).toEqual(expectedOutcome);
  });

  test('removes not from array when passed a note', () => {
    const noteToFilter = notes[0];
    expect(removeNoteFromArray(noteToFilter, notes)).toHaveLength(2);
  });
});
