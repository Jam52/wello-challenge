import React, { useEffect } from 'react';
import styles from './Note.module.scss';
import autosize from 'autosize';

const Note = (props) => {
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });

  return (
    <div className={styles.background}>
      <div data-testid="component-note" className={styles.note}>
        <img
          src={process.env.PUBLIC_URL + '/cross.svg'}
          alt="close"
          className={styles.note_close}
          onClick={props.close}
        />
        <div className={styles.note_input}>
          <label htmlFor="title">Title</label>
          <input
            type="textarea"
            className={styles.note_textarea}
            placeholder="add a title"
            id="titel"
          />
        </div>
        <div className={styles.note_input}>
          <label htmlFor="priority">Priority</label>
          <select id="priority">
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
          />
        </div>
        <button className={styles.note_delete}>Delete</button>
      </div>
    </div>
  );
};

export default Note;
