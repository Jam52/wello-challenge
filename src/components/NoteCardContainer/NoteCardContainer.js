import React from 'react';
import styles from './NoteCardContainer.module.scss';

const NoteCardContainer = (props) => {
  return (
    <section data-testid="note-card-container" className={styles.notesSection}>
      <h2 className={styles.notesSection_title}>{props.priority} Priority</h2>
      <div className={styles.notesSection_container}>{props.children}</div>
    </section>
  );
};

export default NoteCardContainer;
