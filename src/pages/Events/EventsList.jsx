import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getEvents } from "../../firebase/firestore";
import EventCard from "./EventCard";

export default function EventsList({ selectedMonth, selectedYear }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = events
    .filter((event) => {
      if (!event.date) return false;

      const eventDate = event.date.seconds
        ? new Date(event.date.seconds * 1000)
        : new Date(event.date);

      const now = new Date();
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();

      // Filter by selected month/year
      const matchesDateFilter =
        eventMonth === selectedMonth && eventYear === selectedYear;

      // Filter by upcoming/past
      if (filter === "upcoming") {
        return matchesDateFilter && eventDate >= now;
      } else if (filter === "past") {
        return matchesDateFilter && eventDate < now;
      }

      return matchesDateFilter;
    })
    .sort((a, b) => {
      const dateA = a.date.seconds
        ? new Date(a.date.seconds * 1000)
        : new Date(a.date);
      const dateB = b.date.seconds
        ? new Date(b.date.seconds * 1000)
        : new Date(b.date);
      return dateA - dateB;
    });

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="flex">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mr-6"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {["upcoming", "past", "all"].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              filter === filterOption
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No events found
          </h3>
          <p className="text-gray-500">
            {filter === "upcoming"
              ? "No upcoming events for this month"
              : filter === "past"
                ? "No past events for this month"
                : "No events scheduled for this month"}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
