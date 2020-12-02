import React, { useEffect } from 'react';
import styles from './Note.module.scss';
import autosize from 'autosize';

const Note = (props) => {
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  });

  const isSelectedPriority = (priority) => {
    return props.note.priority === priority ? true : false;
  };

  return (
    <div className={styles.background}>
      <div data-testid="component-note" className={styles.note}>
        <img
          src={process.env.PUBLIC_URL + '/tick.svg'}
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
            id="title"
            value={props.note.title}
            onChange={props.change}
          />
        </div>
        <div className={styles.note_input}>
          <label htmlFor="priority">Priority</label>
          <select id="priority" onChange={props.change}>
            <option value="high" selected={isSelectedPriority('high')}>
              high
            </option>
            <option value="medium" selected={isSelectedPriority('medium')}>
              medium
            </option>
            <option value="low" selected={isSelectedPriority('low')}>
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
            value={props.note.notes}
            onChange={props.change}
          />
        </div>
        <button className={styles.note_delete} onClick={props.delete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
