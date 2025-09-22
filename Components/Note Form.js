import { useState, useEffect } from "react";

export default function NoteForm({ onSubmit, noteToEdit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setBody(noteToEdit.body);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body, id: noteToEdit?.id });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">{noteToEdit ? "Update Note" : "Add Note"}</button>
    </form>
  );
}
