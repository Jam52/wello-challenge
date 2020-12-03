import { filterNotes } from '../FilterSearch';

describe('FilterSearch', () => {
  const notes = [
    {
      title: 'hello',
      notes: 'some notes',
      priority: 'low',
    },
    {
      title: 'everyone',
      notes: 'some more notes',
      priority: 'low',
    },
    {
      title: 'at wello',
      notes: 'I hope this works!',
      priority: 'low',
    },
  ];

  test('filters notes by input text', () => {
    const filterText = 'ello';
    const expectedOutcome = [notes[0], notes[2]];
    expect(filterNotes(notes, filterText)).toEqual(expectedOutcome);
  });
});
