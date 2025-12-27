import { Card } from "@/components/ui/card";
import { store } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          Welcome back, {user?.name || "User"} 👋
        </h1>
        <p className="text-slate-600 dark:text-gray-300 mt-1">
          Choose what you want to manage today
        </p>
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* General Expenses */}
        <Card
          onClick={() => navigate("/dashboard/general")}
          className="cursor-pointer p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                General Expenses
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Track daily, weekly & monthly expenses
              </p>
            </div>
          </div>
        </Card>

        {/* Notes */}
        <Card
          onClick={() => navigate("/dashboard/notes")}
          className="cursor-pointer p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
              📝
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Notes
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Save reminders & important thoughts
              </p>
            </div>
          </div>
        </Card>

        {/* Special Context */}
        <Card
          onClick={() => navigate("/dashboard/special")}
          className="cursor-pointer p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
              ✈️
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Special Context
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Trips, events, projects & more
              </p>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;
