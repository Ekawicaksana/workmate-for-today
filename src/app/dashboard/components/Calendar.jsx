"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";

export default function UserCalendar() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(new Date());
  }, []);

  // Dummy data tanggal kegiatan
  const eventDates = ["2025-09-02", "2025-09-05", "2025-09-10"];

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      if (eventDates.includes(dateStr)) {
        return "bg-blue-100 text-blue-800 font-semibold rounded-full";
      }
    }
    return null;
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow border">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Your WFC/WFA Activity Calendar
      </h2>
      {/* Only render Calendar after value is set */}
      {value && (
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={tileClassName}
        />
      )}
    </div>
  );
}
