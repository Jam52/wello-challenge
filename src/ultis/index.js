export const removeNoteFromArray = (noteToDelete, array) => {
  if (array !== null && noteToDelete !== null) {
    return array.filter((note) => note.id !== noteToDelete.id);
  }
  return null;
};

export const returnFilteredNotes = (notes, filter) => {
  const regex = new RegExp(filter, 'gi');

  return notes.filter((note) => {
    const text = `${note.title} ${note.notes}`;
    return text.match(regex);
  });
};
