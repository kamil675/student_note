import { useState } from "react";
import API from "../api";

export default function NoteCard({ note, refresh }) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(note);

  const update = async () => {
    await API.put(`/notes/${note._id}`, data);
    setEdit(false);
    refresh();
  };

  const del = async () => {
    await API.delete(`/notes/${note._id}`);
    refresh();
  };

  return (
    <div className="bg-[#222] p-5 rounded-xl border border-gray-700 shadow-md hover:shadow-xl transition duration-300">
      {edit ? (
        <>
          <input
            className="w-full mb-2 px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />

          <textarea
            className="w-full mb-3 px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={data.body}
            onChange={(e) => setData({ ...data, body: e.target.value })}
          />

          <div className="flex gap-2">
            <button
              onClick={update}
              className="bg-green-500 px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition"
            >
              Save
            </button>

            <button
              onClick={() => setEdit(false)}
              className="bg-gray-500 px-3 py-1 rounded-lg text-sm hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2 text-white">
            {note.title}
          </h3>

          <p className="text-gray-300 mb-4 break-words">{note.body}</p>

          <div className="flex gap-2">
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-500 px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Edit
            </button>

            <button
              onClick={del}
              className="bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
