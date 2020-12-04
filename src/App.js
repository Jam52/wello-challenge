import React, { Component } from 'react';
import styles from './App.module.scss';
import NoteCard from './components/NoteCard/NoteCard';
import Note from './components/Note/Note';
import NoteCardContainer from './components/NoteCardContainer/NoteCardContainer';
import Layout from './components/Layout/Layout';
import FilterNotes from './components/FilterNotes/FilterNotes.js';
import { removeNoteFromArray, returnFilteredNotes } from './ultis/index';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

class App extends Component {
  state = {
    notes: [],
    showNote: false,
    currentNote: {},
    filtered: '',
  };

  openNoteHandler = (note) => {
    this.setState({ showNote: true, currentNote: note });
    disableBodyScroll(Note);
  };

  closeNoteHandler = (updatedNote) => {
    this.setState({ showNote: false });
    enableBodyScroll(Note);
    this.updateNotesInState(updatedNote);
  };

  newNoteHandler = (priority) => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const newNote = {
      title: '',
      notes: '',
      priority: priority,
      id: randomId,
    };
    this.openNoteHandler(newNote);
  };

  openExistingNoteHandler = (id) => {
    const noteToOpen = this.state.notes.filter((note) => note.id === id)[0];
    this.openNoteHandler(noteToOpen);
  };

  updateNotesInState = (updatedNote) => {
    const remainingNotes = removeNoteFromArray(updatedNote, this.state.notes);
    if (updatedNote.title !== '') {
      this.setState({
        notes: [...remainingNotes, updatedNote],
      });
    } else {
      this.setState({
        notes: [...remainingNotes],
      });
    }
  };

  deleteNoteHandler = (noteToDelete) => {
    const removeFromNotes = removeNoteFromArray(noteToDelete, this.state.notes);
    this.setState({
      notes: removeFromNotes,
      showNote: false,
    });
    enableBodyScroll(Note);
  };

  returnPriorityNotes = (priority) => {
    let notes = this.state.notes;
    if (this.state.filter !== '' && notes.length > 0) {
      notes = returnFilteredNotes(notes, this.state.filter);
    }
    return notes
      .filter((note) => note.priority === priority)
      .map((note, index) => (
        <NoteCard
          note={note}
          key={index}
          click={() => this.openNoteHandler(note)}
        />
      ));
  };

  render() {
    const highPriorityNotes = this.returnPriorityNotes('high');
    const mediumPriorityNotes = this.returnPriorityNotes('medium');
    const lowPriorityNotes = this.returnPriorityNotes('low');

    return (
      <div data-testid="component-app">
        {this.state.showNote ? (
          <Note
            close={this.closeNoteHandler}
            note={this.state.currentNote}
            delete={this.deleteNoteHandler}
          />
        ) : null}
        <Layout>
          <header className={styles.header}>
            <h1 className={styles.header_title}>Loads of Notes</h1>
            <FilterNotes
              change={(event) => this.setState({ filter: event.target.value })}
              notes={this.state.notes}
              value={this.state.filter}
            />
          </header>
          <main>
            <NoteCardContainer
              priority="High"
              open={() => this.newNoteHandler('high')}
            >
              {highPriorityNotes}
            </NoteCardContainer>
            <NoteCardContainer
              priority="Medium"
              open={() => this.newNoteHandler('medium')}
            >
              {mediumPriorityNotes}
            </NoteCardContainer>
            <NoteCardContainer
              priority="Low"
              open={() => this.newNoteHandler('low')}
            >
              {lowPriorityNotes}
            </NoteCardContainer>
          </main>
        </Layout>
      </div>
    );
  }
}

export default App;
