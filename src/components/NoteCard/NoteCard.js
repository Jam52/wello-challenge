import React from 'react';
import styles from './NoteCard.module.scss';

const NoteCard = (props) => {
  return (
    <div data-testid="component-note-card" className={styles.note}>
      <img
        src={process.env.PUBLIC_URL + '/pencil.svg'}
        alt="pencil"
        className={styles.note_pencil}
      />
      <p className={styles.note_title}>{props.note.title}</p>
    </div>
  );
};

export default NoteCard;
