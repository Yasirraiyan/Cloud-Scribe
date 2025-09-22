const NOTE_API_URL = "https://jsonplaceholder.typicode.com/wrongURL";

export const fetchNotes = async () => {
  const res = fetch(NOTE_API_URL);
  if (res.ok) return (await res.json()).slice(0, 5);
  throw new Error(`Error fetching notes: ${res.status}`);
};
export const createNote = async (note) => {
  const res = await fetch(NOTE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (res.status === 201 || res.status === 200) return await res.json();
  if (res.status === 403) throw new Error("Forbidden!");
  if (res.status === 404) throw new Error("Not Found!");
  if (res.status === 500) throw new Error("Server Error!");
  throw new Error(`Unknown Error: ${res.status}`);
};

export const updateNote = async (id, note) => {
  const res = await fetch(`${NOTE_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (res.status === 200) return await res.json();
  if (res.status === 403) throw new Error("Forbidden!");
  if (res.status === 500) throw new Error("Server Error!");
  throw new Error(`Unknown Error: ${res.status}`);
};

export const deleteNote = async (id, note) => {
  const res = await fetch(`${NOTE_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (res.status === 200 || res.status === 201) return { success: true };
  if (res.status === 403) throw new Error("Forbidden!");
  if (res.status === 500) throw new Error("Server Error!");
  throw new Error(`Unknown Error: ${res.status}`);
};
