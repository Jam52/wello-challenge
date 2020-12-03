import React, { useEffect } from 'react';
import styles from './Note.module.scss';
import autosize from 'autosize';
import Backdrop from '../Backdrop/Backdrop';

const Note = (props) => {
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });

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
            value={props.note.title}
            onChange={props.change}
          />
        </div>
        <div className={styles.note_input}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            onChange={props.change}
            data-testid="priority-select"
            value={props.note.priority}
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </div>

        <div className={styles.note_input}>
          <label htmlFor="notes">Notes</label>
          <textarea
            className={styles.note_textarea}
            placeholder="add some notes"
            id="notes"
            value={props.note.notes}
            onChange={props.change}
          />
        </div>
        <div className={styles.note_submit}>
          <img
            src={process.env.PUBLIC_URL + '/cross.svg'}
            alt="delete note"
            onClick={props.delete}
            data-testid="note-delete"
          />
          <img
            src={process.env.PUBLIC_URL + '/tick.svg'}
            alt="save note"
            onClick={props.close}
            data-testid="note-save"
          />
        </div>
      </div>
      <Backdrop close={props.close} />
    </div>
  );
};

export default Note;
