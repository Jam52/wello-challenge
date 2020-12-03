import React from 'react';
import styles from './FilterSearch.module.scss';

const FilterSearch = (props) => {
  return (
    <div className={styles.filter}>
      <input
        type="text"
        value={props.value}
        className={styles.filter_input}
        placeholder="filter notes"
        onChange={props.change}
      />
      <img
        src={process.env.PUBLIC_URL + '/search.svg'}
        className={styles.filter_search}
        alt="filter notes"
      />
    </div>
  );
};

export const filterNotes = (notes, filter) => {
  const regex = new RegExp(filter, 'gi');

  return notes.filter((note) => {
    const text = `${note.title} ${note.notes}`;
    return text.match(regex);
  });
};

export default FilterSearch;
