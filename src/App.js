import React, { Component } from 'react';
import styles from './App.module.scss';
import NoteCard from './components/NoteCard/NoteCard';
import Note from './components/Note/Note';
import Layout from './components/Layout/Layout';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

class App extends Component {
  state = {
    notes: [],
    showNote: false,
    currentNote: { title: '', notes: '', priority: 'low' },
  };

  returnPriorityNotes = (priority) => {
    return this.state.notes
      .filter((note) => note.priority === priority)
      .map((note, index) => (
        <NoteCard
          note={note}
          key={index}
          click={() => this.openExistingNoteHandler(note.id)}
        />
      ));
  };

  openNote = () => {
    this.setState({ showNote: true });
    disableBodyScroll(Note);
  };

  closeNote = () => {
    const updatedNote = this.state.currentNote;
    const filteredNotes = this.state.notes.filter(
      (note) => note.id !== updatedNote.id,
    );
    this.setState({ showNote: false, notes: [...filteredNotes, updatedNote] });
    enableBodyScroll(Note);
  };

  newNoteHandler = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const newNote = { title: '', notes: '', priority: 'low', id: randomId };
    this.setState({
      currentNote: newNote,
    });
    this.openNote();
  };

  openExistingNoteHandler = (id) => {
    const note = this.state.notes.filter((note) => note.id === id)[0];
    this.setState({ currentNote: note });
    this.openNote();
  };

  updateCurrentNoteHandler = (event) => {
    let newNote = { ...this.state.currentNote };
    newNote[event.target.id] = event.target.value;
    this.setState({
      currentNote: newNote,
    });
  };

  render() {
    const highPriorityNotes = this.returnPriorityNotes('high');
    const mediumPriorityNotes = this.returnPriorityNotes('medium');
    const lowPriorityNotes = this.returnPriorityNotes('low');

    const note = (
      <Note
        close={this.closeNote}
        note={this.state.currentNote}
        change={(event) => this.updateCurrentNoteHandler(event)}
      />
    );

    return (
      <div data-testid="component-app">
        {this.state.showNote ? note : null}
        <Layout>
          <header className={styles.header}>
            <h1 className={styles.header_title}>Loads of Notes</h1>
            <button
              className={styles.header_add}
              data-testid="add-note-button"
              onClick={this.newNoteHandler}
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
