import React from 'react';
import styles from './FilterNotes.module.scss';

const FilterNotes = (props) => {
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

export default FilterNotes;
