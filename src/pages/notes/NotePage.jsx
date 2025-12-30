import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddNoteModal from "./AddNoteModel";



const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [filter, setFilter] = useState("all");
    const [openModal, setOpenModal] = useState(false);


    const fetchNotes = useCallback(async () => {
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
    }, [filter]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8">
            <div className="max-w-4xl mx-auto p-4">

                <ToastContainer position="top-right" autoClose={3000} />



                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                        📝 Notes
                    </h2>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    >
                        + Add Note
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    {["all", "general", "special"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                : "bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-600"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Notes List */}
                {notes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <p className="text-slate-500 dark:text-gray-400 text-lg">
                            No notes found
                        </p>
                        <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">
                            Add your first note to get started!
                        </p>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                        >
                            + Add First Note
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex justify-between items-start">
                                    {/* Note Content */}
                                    <div className="flex-1">
                                        <p className="text-slate-800 dark:text-white font-medium mb-2">
                                            {note.text}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {note.amount !== undefined && note.amount !== null && (
                                                <span
                                                    className={`px-2 py-1 rounded text-sm font-semibold ${note.direction === "given"
                                                            ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                                                            : "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                                                        }`}
                                                >
                                                    {note.direction === "given" ? "➖ Given" : "➕ Received"} ₹{note.amount}
                                                </span>
                                            )}


                                            {note.person && (
                                                <span className="px-2 py-1 bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-300 rounded text-sm">
                                                    👤 {note.person}
                                                </span>
                                            )}

                                            {note.contextType === "special" && note.specialTitle && (
                                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-sm">
                                                    🎯 {note.specialTitle}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-500 dark:text-gray-400">
                                            📅 {new Date(note.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(note._id);
                                        }}
                                        className="text-red-400 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200 ml-2"
                                        title="Delete"
                                    >
                                        🗑️
                                    </button>
                                </div>
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
        </div>
    );
};

export default NotesPage;