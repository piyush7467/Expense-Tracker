import { useNavigate } from "react-router-dom";

const YearPage = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Example: last 5 years
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Select Year</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {years.map((year) => (
          <div
            key={year}
            onClick={() => navigate(`/dashboard/general/${year}`)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow hover:scale-105 transition"
          >
            <p className="text-xl font-semibold">{year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearPage;
