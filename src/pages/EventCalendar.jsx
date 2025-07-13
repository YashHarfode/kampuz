import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  CalendarIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import EventForm from "./Events/EventForm";
import EventsList from "./Events/EventsList";
import CalendarView from "./Events/CalendarView";

export default function EventCalendar() {
  const { user } = useContext(AuthContext);
  const [showEventForm, setShowEventForm] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // "list" or "calendar"
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 3 },
    (_, i) => new Date().getFullYear() + i,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold font-display text-gray-900">
              📅 Event Calendar
            </h1>
            <p className="text-gray-600 mt-1">
              Stay updated with campus events and register instantly
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === "calendar"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Calendar
              </button>
            </div>

            {user && (
              <button
                onClick={() => setShowEventForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Create Event</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
            </div>

            <div className="flex gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Events Display */}
        {viewMode === "list" ? (
          <EventsList
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        ) : (
          <CalendarView
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        )}

        {/* Event Form Modal */}
        {showEventForm && <EventForm onClose={() => setShowEventForm(false)} />}
      </div>
    </div>
  );
}
