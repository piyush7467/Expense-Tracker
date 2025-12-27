import { useParams, useNavigate } from "react-router-dom";

const WeekPage = () => {
  const { year, month } = useParams();
  const navigate = useNavigate();

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        📆 {month} {year} — Select Week
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {weeks.map((week) => (
          <div
            key={week}
            onClick={() =>
              navigate(`/dashboard/general/${year}/${month}/${week}`)
            }
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow hover:scale-105 transition"
          >
            {week}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekPage;
