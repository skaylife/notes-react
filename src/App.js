import { useEffect, useState } from "react"; // Полдюкчения состояний, благодаря этому можно перехватыватывать состояния
import uuid from "react-uuid"; // Export модуля для генерации id cmd - "npm install react-uuid"
import './App.css';
import Main from './Main';
import Sidebar from './Sidebar';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

function App() {
  // const [notes,
  // setNotes] = useState(JSON.parse(localStorage.notes) || []); // Сохранение данных, чтоб после обновление страници все осталось НЕ РАБОТАЕТ, возможно из-за браузера
  //   setNotes] = useState([]); //Массив с перваченными даннными
  // const [activeNote,
  //   setActiveNote] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Безымянная запись",
      body: "",
      lastModified: Date.now()
    };

    setNotes([
      newNote, ...notes
    ])
  };

  const onUpdateNote = (updateNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updateNote.id) {
        return updateNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  }

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote} />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
      />
    </div>
  );
}

export default App;
