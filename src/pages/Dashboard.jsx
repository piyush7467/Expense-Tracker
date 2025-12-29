import { Card } from "@/components/ui/card";
import { store } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();


 

  const dashboardCards = [
    {
      id: 1,
      title: "General Expenses",
      description: "Track daily, weekly & monthly expenses",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
      route: "/dashboard/general"
    },
    {
      id: 2,
      title: "Notes",
      description: "Save reminders & important thoughts",
      icon: "📝",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
      route: "/dashboard/notes"
    },
    {
      id: 3,
      title: "Special Context",
      description: "Trips, events, projects & more",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
      route: "/dashboard/special"
    },
    {
      id: 4,
      title: "Analytics",
      description: "View spending insights & reports",
      icon: "📈",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
      route: "/dashboard/analytics"
    },
    {
      id: 5,
      title: "Categories",
      description: "Manage expense categories",
      icon: "🏷️",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300",
      route: "/dashboard/categories"
    },
    {
      id: 6,
      title: "Settings",
      description: "Account & app preferences",
      icon: "⚙️",
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      iconColor: "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300",
      route: "/dashboard/settings"
    }
  ];

  const stats = [
    { label: "Today's Expenses", value: "₹0", change: "+0%", color: "text-red-500" },
    { label: "This Month", value: "₹0", change: "+0%", color: "text-blue-500" },
    { label: "Notes Count", value: "0", change: "+0", color: "text-yellow-500" },
    { label: "Balance", value: "₹0", change: "0%", color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                Welcome back, <span className="text-blue-600 dark:text-blue-400">{user?.name || "User"}</span> 👋
              </h1>
              <p className="text-slate-600 dark:text-gray-300 mt-2">
                Here's what's happening with your finances today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-gray-700"
            >
              <p className="text-sm text-slate-600 dark:text-gray-400">{stat.label}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dashboard Cards */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardCards.map((card) => (
                  <Card
                    key={card.id}
                    onClick={() => navigate(card.route)}
                    className="cursor-pointer p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${card.iconColor} flex items-center justify-center text-2xl`}>
                          {card.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-gray-700">
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1">
                          Open
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                      💸
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">No recent activity</p>
                      <p className="text-sm text-slate-500 dark:text-gray-400">Add your first transaction</p>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-gray-400">Just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user?.name || "User"}</h3>
                  <p className="text-blue-100 text-sm">{user?.email || "user@example.com"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-blue-100">Expenses</p>
                  <p className="text-lg font-bold">₹0</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-blue-100">Notes</p>
                  <p className="text-lg font-bold">0</p>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">💡 Quick Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span className="text-sm text-slate-600 dark:text-gray-300">Track expenses daily for better insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span className="text-sm text-slate-600 dark:text-gray-300">Use notes for important reminders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span className="text-sm text-slate-600 dark:text-gray-300">Categorize expenses for better analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span className="text-sm text-slate-600 dark:text-gray-300">Set monthly budgets to control spending</span>
                </li>
              </ul>
            </div>

            {/* Quick Add */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">🚀 Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate("/dashboard/general")}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💸</span>
                    <span>Add Expense</span>
                  </div>
                </button>
                <button 
                  onClick={() => navigate("/dashboard/notes")}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📝</span>
                    <span>Add Note</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;