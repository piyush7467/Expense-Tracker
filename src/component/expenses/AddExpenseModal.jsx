import { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

const AddExpenseModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "spent",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category) {
      toast.warning("Amount and category are required");
      return;
    }

    try {
      await axios.post(
        "/api/expense/insert",
        formData,
        { withCredentials: true }
      );

      toast.success("Expense added");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4">➕ Add Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="amount"
            placeholder="Amount ₹"
            className="w-full input"
            onChange={handleChange}
          />

          <select
            name="category"
            className="w-full input"
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            name="type"
            className="w-full input"
            onChange={handleChange}
          >
            <option value="spent">💸 Spent</option>
            <option value="received">💰 Received</option>
          </select>

          <input
            type="date"
            name="date"
            className="w-full input"
            value={formData.date}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Optional note"
            className="w-full input"
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
