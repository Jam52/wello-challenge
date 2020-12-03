import React from 'react';
import styles from './FilterSearch.module.scss';

const FilterSearch = (props) => {
  return (
    <div className={styles.filter}>
      <input
        type="text"
        value={props.search}
        className={styles.filter_input}
        placeholder="filter notes"
      />
      <img
        src={process.env.PUBLIC_URL + '/search.svg'}
        className={styles.filter_search}
        alt="filter notes"
      />
    </div>
  );
};

export default FilterSearch;
