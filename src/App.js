import React, { Component } from 'react';
import styles from './App.module.scss';
import NoteCard from './components/NoteCard/NoteCard';

class App extends Component {
  render() {
    return (
      <div data-testid="component-app" className={styles.container}>
        <header className="App-header">
          <h1 className={styles.header}>Loads of Notes</h1>
        </header>
        <NoteCard note={{ title: 'testing testing' }} />
      </div>
    );
  }
}

export default App;
