import { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

      // reset form (safe)
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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">Add Note</h3>

        <form onSubmit={submitNote} className="space-y-3">
          <textarea
            name="text"
            placeholder="Note..."
            value={form.text}
            onChange={handleChange}
            className="w-full border rounded p-2 resize-none"
            rows={3}
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount (optional)"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <select
            name="direction"
            value={form.direction}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="given">Given</option>
            <option value="taken">Taken</option>
          </select>

          <input
            name="person"
            placeholder="Person (optional)"
            value={form.person}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <select
            name="contextType"
            value={form.contextType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>

          {form.contextType === "special" && (
            <input
              name="specialTitle"
              placeholder="Special title (Trip / Event)"
              value={form.specialTitle}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          )}

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
