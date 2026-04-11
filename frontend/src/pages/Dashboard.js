import { useEffect, useState } from "react";
import API from "../api";
import NoteCard from "../components/NoteCard";
import { FileText, Plus, LogOut } from "lucide-react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ CREATE NOTE
  const createNote = async () => {
    if (!title || !body) return alert("Fill all fields");

    await API.post("/notes", { title, body });

    setTitle("");
    setBody("");
    setShowForm(false);

    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">My Notes</h1>
            <p className="text-sm text-gray-500">your@email.com</p>
          </div>
        </div>

        <div className="flex gap-3">
          {/* ✅ NEW NOTE BUTTON */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={16} />
            New Note
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location = "/";
            }}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* ✅ FORM */}
      {showForm && (
        <div className="bg-white p-5 rounded-xl shadow mb-6 max-w-md">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            className="border p-2 w-full mb-3 rounded"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <button
            onClick={createNote}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Note
          </button>
        </div>
      )}

      {/* Notes */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {notes.length > 0 ? (
          notes.map((n) => (
            <NoteCard key={n._id} note={n} refresh={fetchNotes} />
          ))
        ) : (
          <p className="text-gray-500">No notes yet...</p>
        )}
      </div>
    </div>
  );
}
