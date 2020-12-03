import React, { Component } from 'react';
import styles from './App.module.scss';
import NoteCard from './components/NoteCard/NoteCard';
import Note from './components/Note/Note';
import NoteCardContainer from './components/NoteCardContainer/NoteCardContainer';
import Layout from './components/Layout/Layout';
import FilterSearch, {
  filterNotes,
} from './components/FilterSearch/FilterSearch.js';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

class App extends Component {
  state = {
    notes: [],
    showNote: false,
    currentNote: { title: '', notes: '', priority: 'low' },
    filter: '',
    filteredNotes: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filter !== this.state.filter ||
      prevState.notes !== this.state.notes
    ) {
      this.setState({
        filteredNotes: filterNotes(this.state.notes, this.state.filter),
      });
    }
  }

  openNote = () => {
    this.setState({ showNote: true });
    disableBodyScroll(Note);
  };

  closeNote = () => {
    this.setState({ showNote: false });
    enableBodyScroll(Note);
  };

  newNoteHandler = (priority) => {
    const randomId = Math.random().toString(36).substr(2, 9);
    const newNote = {
      title: '',
      notes: '',
      priority: priority,
      id: randomId,
    };
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

  closeNoteHandler = () => {
    const updatedNote = this.state.currentNote;
    const filteredNotes = this.state.notes.filter(
      (note) => note.id !== updatedNote.id,
    );
    if (updatedNote.title !== '') {
      this.setState({
        notes: [...filteredNotes, updatedNote],
      });
    } else {
      this.setState({ notes: [...filteredNotes] });
    }
    this.closeNote();
  };

  deleteNoteHandler = () => {
    const currentNoteId = this.state.currentNote.id;
    const filteredNotes = this.state.notes.filter(
      (note) => note.id !== currentNoteId,
    );
    this.setState({ notes: [...filteredNotes] });
    this.closeNote();
  };

  returnPriorityNotes = (priority) => {
    let notes = this.state.notes;
    if (this.state.filter !== '') {
      notes = this.state.filteredNotes;
    }
    return notes
      .filter((note) => note.priority === priority)
      .map((note, index) => (
        <NoteCard
          note={note}
          key={index}
          click={() => this.openExistingNoteHandler(note.id)}
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
            change={(event) => this.updateCurrentNoteHandler(event)}
            delete={this.deleteNoteHandler}
          />
        ) : null}
        <Layout>
          <header className={styles.header}>
            <h1 className={styles.header_title}>Loads of Notes</h1>
            <FilterSearch
              filter={this.updateFilteredNotes}
              notes={this.state.notes}
              value={this.state.filter}
              change={(event) => this.setState({ filter: event.target.value })}
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
