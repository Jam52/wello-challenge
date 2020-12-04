import React, { useEffect, useState } from 'react';
import styles from './Note.module.scss';
import autosize from 'autosize';
import Backdrop from '../Backdrop/Backdrop';

const Note = (props) => {
  let [currentNote, updateCurrentNote] = useState(props.note);

  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });

  const priorityStyles =
    currentNote.priority === 'high'
      ? styles.high
      : currentNote.priority === 'medium'
      ? styles.medium
      : styles.low;

  return (
    <div className={styles.background}>
      <div data-testid="component-note" className={styles.note}>
        <div className={styles.note_input}>
          <label htmlFor="title">Title</label>
          <input
            data-testid="title-input"
            type="textarea"
            className={styles.note_textarea}
            placeholder="add a title"
            id="title"
            value={currentNote.title}
            onChange={(event) => {
              updateCurrentNote({ ...currentNote, title: event.target.value });
            }}
          />
        </div>
        <div className={styles.note_input}>
          <label htmlFor="priority">Priority</label>
          <select
            className={priorityStyles}
            id="priority"
            onChange={(event) => {
              updateCurrentNote({
                ...currentNote,
                priority: event.target.value,
              });
            }}
            data-testid="priority-select"
            value={currentNote.priority}
          >
            <option value="high" className={styles.high}>
              high
            </option>
            <option value="medium" className={styles.medium}>
              medium
            </option>
            <option value="low" className={styles.low}>
              low
            </option>
          </select>
        </div>

        <div className={styles.note_input}>
          <label htmlFor="notes">Notes</label>
          <textarea
            className={styles.note_textarea}
            placeholder="add some notes"
            id="notes"
            value={currentNote.notes}
            onChange={(event) => {
              updateCurrentNote({ ...currentNote, notes: event.target.value });
            }}
          />
        </div>
        <div className={styles.note_submit}>
          <img
            src={process.env.PUBLIC_URL + '/cross.svg'}
            alt="delete note"
            onClick={() => props.delete(currentNote)}
            data-testid="note-delete"
          />
          <img
            src={process.env.PUBLIC_URL + '/tick.svg'}
            alt="save note"
            onClick={() => props.close(currentNote)}
            data-testid="note-save"
          />
        </div>
      </div>
      <Backdrop close={() => props.close(currentNote)} />
    </div>
  );
};

export default Note;
