import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddNoteModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    text: "",
    amount: "",
    direction: "given",
    person: "",
    contextType: "general",
    specialTitle: "",
  });

  // 🔒 Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitNote = async (e) => {
    e.preventDefault();

    if (!form.text.trim()) {
      toast.warning("Note text is required");
      return;
    }

    if (form.contextType === "special" && !form.specialTitle.trim()) {
      toast.warning("Special title is required");
      return;
    }

    try {
      await axios.post(
        "https://vercel-backend-one-sepia.vercel.app/api/expense/notes",
        {
          ...form,
          amount: form.amount ? Number(form.amount) : undefined,
          specialTitle:
            form.contextType === "special" ? form.specialTitle : undefined,
        },
        { withCredentials: true }
      );

      toast.success("Note added");

      onSuccess();
      onClose();

      // Reset form
      setForm({
        text: "",
        amount: "",
        direction: "given",
        person: "",
        contextType: "general",
        specialTitle: "",
      });
    } catch {
      toast.error("Failed to add note");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
       <ToastContainer position="top-right" autoClose={3000} />


      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Add New Note
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={submitNote} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
              Note Text *
            </label>
            <textarea
              name="text"
              placeholder="Type your note here..."
              value={form.text}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                Amount (₹)
              </label>
              <input
                name="amount"
                type="number"
                placeholder="Optional"
                value={form.amount}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                Direction
              </label>
              <select
                name="direction"
                value={form.direction}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="given">Given</option>
                <option value="taken">Taken</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
              Person (Optional)
            </label>
            <input
              name="person"
              placeholder="Person name"
              value={form.person}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                Context Type
              </label>
              <select
                name="contextType"
                value={form.contextType}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="general">General</option>
                <option value="special">Special</option>
              </select>
            </div>

            {form.contextType === "special" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                  Special Title *
                </label>
                <input
                  name="specialTitle"
                  placeholder="Trip / Event name"
                  value={form.specialTitle}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required={form.contextType === "special"}
                />
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              💾 Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;