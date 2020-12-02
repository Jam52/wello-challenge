import React from 'react';
import styles from './NoteCard.module.scss';

const NoteCard = (props) => {
  const priority = props.note.priority;
  let priorityStyle =
    priority === 1 ? styles.high : priority === 2 ? styles.medium : styles.low;

  return (
    <div
      data-testid="component-note-card"
      className={`${styles.note} ${priorityStyle}`}
    >
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
