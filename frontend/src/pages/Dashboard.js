import { useEffect, useState } from "react";
import API from "../api";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    if (!form.title || !form.body) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/notes", form);
    setForm({ title: "", body: "" });
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-[#444] text-white p-6">
      {/* 🔝 Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-wide">My Notes</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/";
          }}
          className="bg-[#999] text-black px-4 py-1 rounded-lg hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </div>

      {/* 📝 Create Note */}
      <div className="bg-[#888] p-6 rounded-2xl shadow-lg border border-gray-700 mb-8 max-w-xl">
        <h2 className="text-lg mb-4 font-semibold text-white">Create Note</h2>

        <input
          className="w-full mb-3 px-4 py-2 bg-[#777] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full mb-3 px-4 py-2 bg-[#777] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Write your note..."
          rows={3}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />

        <button
          onClick={createNote}
          className="bg-[#999] text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Add Note
        </button>
      </div>

      {/* 📦 Notes Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {notes.length > 0 ? (
          notes.map((n) => (
            <NoteCard key={n._id} note={n} refresh={fetchNotes} />
          ))
        ) : (
          <p className="text-gray-400">No notes yet...</p>
        )}
      </div>
    </div>
  );
}
