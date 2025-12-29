import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AddNoteModal from "./AddNoteModel";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);

  // 🔹 Fetch notes
  const fetchNotes = async () => {
    try {
      const params = filter === "all" ? {} : { contextType: filter };

      const res = await axios.get(
        "https://vercel-backend-one-sepia.vercel.app/api/expense/notes",
        { params, withCredentials: true }
      );

      setNotes(res.data.data);
    } catch {
      toast.error("Failed to load notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [filter]);

  // 🔹 Delete note
  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await axios.delete(
        `https://vercel-backend-one-sepia.vercel.app/api/expense/notes/${id}`,
        { withCredentials: true }
      );

      toast.success("Note deleted");
      fetchNotes();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notes</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Note
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {["all", "general", "special"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm ${
              filter === f
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No notes found
        </p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white border rounded-lg p-4 flex justify-between items-start shadow-sm"
            >
              {/* Left */}
              <div>
                <p className="font-medium text-gray-800">
                  {note.text}
                </p>

                <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-2">
                  {note.amount && (
                    <span
                      className={
                        note.direction === "given"
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {note.direction === "given" ? "-" : "+"}₹{note.amount}
                    </span>
                  )}

                  {note.person && (
                    <span>👤 {note.person}</span>
                  )}

                  {note.contextType === "special" && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                      {note.specialTitle}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Right */}
              <button
                onClick={() => deleteNote(note._id)}
                className="text-red-500 hover:text-red-700 text-lg"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      {openModal && (
        <AddNoteModal
          onClose={() => setOpenModal(false)}
          onSuccess={fetchNotes}
        />
      )}
    </div>
  );
};

export default NotesPage;
