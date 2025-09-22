import "./App.css";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./api/noteService";
const GOOD_URL = "https://jsonplaceholder.typicode.com/posts"; // ✅ 200/201 OK
const BAD_403 = "https://httpstat.us/403"; // ❌ 403 Forbidden
const BAD_404 = "https://jsonplaceholder.typicode.com/wrongURL"; // ❌ 404 Not Found
const BAD_500 = "https://httpstat.us/500";
function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [apiURL, setApiURL] = useState(GOOD_URL);
  // ✅ মূল ডাটা লোড
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
        const data = await res.json;
        setNotes(data.slice(0, 5));
      } catch (err) {
        alert(`Fetch Error → ${err.message}`);
      }
    };
    loadNotes();
  }, [apiURL]);

  // ✅ Add / Update
  const handleAddOrUpdateNote = async (note) => {
    try {
      let result;
      if (note.id) {
        result = await updateNote(note.id, note);
        setNotes(notes.map((n) => (n.id === note.id ? result : n)));
      } else {
        result = await createNote(note);
        setNotes([result, ...notes]);
      }
      setEditNote(null);
    } catch (err) {
      alert(`Add/Update Error → ${err.message}`);
    }
  };

  // ✅ Delete
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      alert(`Delete Error → ${err.message}`);
    }
  };

  // ------------------------------------------
  // 🔹 Status Code Test Handlers
  // ------------------------------------------
  const test200 = async () => {
    try {
      const res = await fetch("https://httpstat.us/200");
      alert(`200 Test → Status: ${res.status}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const test201 = async () => {
    try {
      const res = await fetch("https://httpstat.us/201", { method: "POST" });
      alert(`201 Test → Status: ${res.status}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const test403 = async () => {
    try {
      const res = await fetch("https://httpstat.us/403");
      if (!res.ok) throw new Error(`403 Forbidden (status: ${res.status})`);
      alert(`403 Test → Status: ${res.status}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const test404 = async () => {
    try {
      const res = await fetch("https://httpstat.us/404");
      if (!res.ok) throw new Error(`404 Not Found (status: ${res.status})`);
      alert(`404 Test → Status: ${res.status}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const test500 = async () => {
    try {
      const res = await fetch("https://httpstat.us/500");
      if (!res.ok) throw new Error(`500 Server Error (status: ${res.status})`);
      alert(`500 Test → Status: ${res.status}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Random Weather & Notes App</h1>
      <WeatherCard />
      {/* ✅ URL Selector */}
      <h3>🔀 Select API URL (for testing status)</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={() => setApiURL(GOOD_URL)}>✅ 200 / 201 OK</button>
        <button onClick={() => setApiURL(BAD_403)}>❌ 403 Forbidden</button>
        <button onClick={() => setApiURL(BAD_404)}>❌ 404 Not Found</button>
        <button onClick={() => setApiURL(BAD_500)}>❌ 500 Server Error</button>
      </div>

      <p>
        Current URL: <code>{apiURL}</code>
      </p>
      {/* ✅ Note CRUD */}
      <NoteForm onSubmit={handleAddOrUpdateNote} noteToEdit={editNote} />
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={handleDeleteNote}
          onEdit={setEditNote}
        />
      ))}
      {/* ✅ CRUD Section */}
      <NoteForm onSubmit={handleAddOrUpdateNote} noteToEdit={editNote} />

      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={handleDeleteNote}
          onEdit={setEditNote}
        />
      ))}
      {/* ------------------------------------------
          🔹 Status Code Test Buttons
         ------------------------------------------ */}
      <h2>🔎 Test Status Codes</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={test200}>Test 200 OK</button>
        <button onClick={test201}>Test 201 Created</button>
        <button onClick={test403}>Test 403 Forbidden</button>
        <button onClick={test404}>Test 404 Not Found</button>
        <button onClick={test500}>Test 500 Server Error</button>
      </div>
    </div>
  );
}

export default App;
