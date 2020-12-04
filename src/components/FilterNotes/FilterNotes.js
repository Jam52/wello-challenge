import React, { useState } from 'react';
import styles from './FilterNotes.module.scss';

const FilterNotes = (props) => {
  let [value, updateValue] = useState('');

  const updateFilteredNotes = (event) => {
    updateValue(event.target.value);
    if (event.target.value === '') {
      props.filter(props.notes);
    } else {
      props.filter(returnFilteredNotes(props.notes, event.target.value));
    }
  };

  return (
    <div className={styles.filter}>
      <input
        type="text"
        value={value}
        className={styles.filter_input}
        placeholder="filter notes"
        onChange={(event) => updateFilteredNotes(event)}
      />
      <img
        src={process.env.PUBLIC_URL + '/search.svg'}
        className={styles.filter_search}
        alt="filter notes"
      />
    </div>
  );
};

export const returnFilteredNotes = (notes, filter) => {
  const regex = new RegExp(filter, 'gi');

  return notes.filter((note) => {
    const text = `${note.title} ${note.notes}`;
    return text.match(regex);
  });
};

export default FilterNotes;
