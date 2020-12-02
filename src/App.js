import React, { Component } from 'react';
import styles from './App.module.scss';
import NoteCard from './components/NoteCard/NoteCard';
import Note from './components/Note/Note';
import Layout from './components/Layout/Layout';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

class App extends Component {
  state = {
    notes: [
      { title: 'testing testing', notes: ' some notes', priority: 1 },
      { title: 'testing testing', notes: ' some notes', priority: 1 },
      { title: 'testing testing', notes: ' some notes', priority: 2 },
      { title: 'testing testing', notes: ' some notes', priority: 3 },
      { title: 'testing testing', notes: ' some notes', priority: 1 },
      { title: 'testing testing', notes: ' some notes', priority: 1 },
      { title: 'testing testing', notes: ' some notes', priority: 2 },
      { title: 'testing testing', notes: ' some notes', priority: 3 },
    ],
    showNote: false,
  };

  returnPriorityNotes = (priority) => {
    return this.state.notes
      .filter((note) => note.priority === priority)
      .map((note, index) => <NoteCard note={note} key={index} />);
  };

  openNote = (note = {}) => {
    this.setState({ showNote: true });
    disableBodyScroll(Note);
  };

  closeNote = () => {
    this.setState({ showNote: false });
    enableBodyScroll(Note);
  };

  render() {
    const highPriorityNotes = this.returnPriorityNotes(1);
    const mediumPriorityNotes = this.returnPriorityNotes(2);
    const lowPriorityNotes = this.returnPriorityNotes(3);

    return (
      <div data-testid="component-app">
        {this.state.showNote ? <Note close={this.closeNote} /> : null}
        <Layout>
          <header className={styles.header}>
            <h1 className={styles.header_title}>Loads of Notes</h1>
            <button
              className={styles.header_add}
              data-testid="add-note-button"
              onClick={this.openNote}
            >
              New Note
            </button>
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
        </Layout>
      </div>
    );
  }
}

export default App;
