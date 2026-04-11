import { useState } from "react";
import API from "../api";
import { Pencil, Trash2 } from "lucide-react";

export default function NoteCard({ note, refresh }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const del = async () => {
    await API.delete(`/notes/${note._id}`);
    refresh();
  };

  const updateNote = async () => {
    await API.put(`/notes/${note._id}`, { title, body });
    setEdit(false);
    refresh();
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      {edit ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={updateNote}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">{note.title}</h3>

          <p className="text-gray-600 mb-4">{note.body}</p>

          <p className="text-xs text-gray-400 mb-3">
            {new Date(note.createdAt).toLocaleString()}
          </p>

          <div className="flex gap-3">
            <button onClick={() => setEdit(true)} className="text-blue-600">
              <Pencil size={18} />
            </button>

            <button onClick={del} className="text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
