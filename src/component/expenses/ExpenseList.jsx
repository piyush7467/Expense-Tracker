import axios from "axios";

const ExpenseList = ({ expenses, onDelete }) => {
  if (!expenses.length) {
    return <p className="text-gray-500 text-center">No expenses yet</p>;
  }

  return (
    <div className="space-y-3">
      {expenses.map(exp => (
        <div
          key={exp._id}
          className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
        >
          <div>
            <p className="font-semibold">
              {exp.type === "spent" ? "−" : "+"}₹{exp.amount}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {exp.category} • {exp.date?.split("T")[0]}
            </p>
          </div>

          <button
            onClick={() => onDelete(exp._id)}
            className="text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
