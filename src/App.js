import React, { Component } from 'react';
import styles from './App.module.scss';
import NoteCard from './components/NoteCard/NoteCard';

class App extends Component {
  state = {
    notes: [
      { title: 'testing testing', notes: ' some notes', priority: 1 },
      { title: 'testing testing', notes: ' some notes', priority: 1 },
      { title: 'testing testing', notes: ' some notes', priority: 2 },
      { title: 'testing testing', notes: ' some notes', priority: 3 },
    ],
  };

  returnPriorityNotes = (priority) => {
    return this.state.notes
      .filter((note) => note.priority === priority)
      .map((note, index) => <NoteCard note={note} key={index} />);
  };

  render() {
    const highPriorityNotes = this.returnPriorityNotes(1);
    const mediumPriorityNotes = this.returnPriorityNotes(2);
    const lowPriorityNotes = this.returnPriorityNotes(3);

    return (
      <div data-testid="component-app" className={styles.container}>
        <header className="App-header">
          <h1 className={styles.header}>Loads of Notes</h1>
        </header>
        <main>
          <section
            data-testid="note-card-container"
            className={styles.notesSection}
          >
            <h2 className={styles.notesSection_title}>High Priority</h2>
            <div className={styles.notesSection_container}>
              {highPriorityNotes}
            </div>
          </section>
          <section
            data-testid="note-card-container"
            className={styles.notesSection}
          >
            <h2 className={styles.notesSection_title}>Medium Priority</h2>
            <div className={styles.notesSection_container}>
              {mediumPriorityNotes}
            </div>
          </section>
          <section
            data-testid="note-card-container"
            className={styles.notesSection}
          >
            <h2 className={styles.notesSection_title}>Low Priority</h2>
            <div className={styles.notesSection_container}>
              {lowPriorityNotes}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
