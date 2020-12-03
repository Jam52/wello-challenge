import React from 'react';
import styles from './NoteCardContainer.module.scss';

const NoteCardContainer = (props) => {
  const priorityStyles =
    props.priority === 'High'
      ? styles.high
      : props.priority === 'Medium'
      ? styles.medium
      : styles.low;
  return (
    <section data-testid="note-card-container" className={styles.notesSection}>
      <div className={styles.notesSection_header}>
        <h2>{props.priority} Priority</h2>
        <button
          data-testid="add-note-button"
          className={`${styles.plus} ${priorityStyles}`}
          onClick={props.open}
        >
          + note
        </button>
      </div>

      <div className={styles.notesSection_container}>{props.children}</div>
    </section>
  );
};

export default NoteCardContainer;
