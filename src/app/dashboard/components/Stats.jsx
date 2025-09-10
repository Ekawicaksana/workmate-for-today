// src/app/dashboard/components/Stats.jsx
"use client";

export default function Stats() {
  // Dummy data - nanti akan diganti fetch dari backend
  const stats = {
    totalEvents: 5,
    totalPeopleMet: 18,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="bg-white rounded-xl shadow p-6 border">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Total Activities This Month
        </h2>
        <p className="text-3xl font-bold text-indigo-600">
          {stats.totalEvents}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Total Persons You Met This Month
        </h2>
        <p className="text-3xl font-bold text-green-600">
          {stats.totalPeopleMet}
        </p>
      </div>
    </div>
  );
}
