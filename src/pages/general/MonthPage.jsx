import { useParams, useNavigate } from "react-router-dom";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const MonthPage = () => {
  const { year } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🗓️ {year} — Select Month</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {months.map((month) => (
          <div
            key={month}
            onClick={() =>
              navigate(`/dashboard/general/${year}/${month}`)
            }
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow hover:scale-105 transition"
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthPage;
