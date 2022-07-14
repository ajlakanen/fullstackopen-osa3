import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const notesURL = "http://localhost:3001/api/notes";

  useEffect(() => {
    //axios.get("http://localhost:3002/notes").then((response) => {
    //  setNotes(response.data);
    // });
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      // id: notes.length + 1,
    };

    /* axios.post(notesURL, noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    }); */

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    const url = `${notesURL}/${id}`;
    const note = notes.find((n) => {
      return n.id === id;
    });
    const changedNote = { ...note, important: !note.important };
    /* axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    }); */
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>{" "}
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
