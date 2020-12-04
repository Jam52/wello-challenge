export const removeNoteFromArray = (noteToDelete, array) => {
  if (array !== null && noteToDelete !== null) {
    return array.filter((note) => note.id !== noteToDelete.id);
  }
  return null;
};

export const returnFilteredNotes = (notes, filter) => {
  let text = filter;
  if (filter !== undefined) {
    text = filter.replace(/[-[\]{}()*+?.,\\^$|]/g, '\\$&');
  }
  const regex = new RegExp(text, 'gi');
  return notes.filter((note) => {
    const text = `${note.title} ${note.notes}`;
    return text.match(regex);
  });
};
