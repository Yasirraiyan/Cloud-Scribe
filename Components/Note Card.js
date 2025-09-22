// src/components/NoteCard.js
import React from "react";

function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>

      {/* ✨ নতুন Edit বাটন */}
      <button style={{ marginLeft: "10px" }} onClick={() => onEdit(note)}>
        Edit
      </button>
    </div>
  );
}

export default NoteCard;
