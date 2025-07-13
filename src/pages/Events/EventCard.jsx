import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
  LinkIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { incrementEventRegistrations } from "../../firebase/firestore";

export default function EventCard({ event }) {
  const [timeUntilEvent, setTimeUntilEvent] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const eventDate = event.date.seconds
        ? new Date(event.date.seconds * 1000)
        : new Date(event.date);

      const now = new Date();
      const timeDiff = eventDate - now;

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeUntilEvent(`${days}d ${hours}h`);
        } else if (hours > 0) {
          setTimeUntilEvent(`${hours}h ${minutes}m`);
        } else {
          setTimeUntilEvent(`${minutes}m`);
        }
      } else {
        setTimeUntilEvent("Event started");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [event.date]);

  const handleRegister = async () => {
    if (event.registerLink) {
      try {
        await incrementEventRegistrations(event.id);
        window.open(event.registerLink, "_blank");
      } catch (error) {
        console.error("Error opening registration:", error);
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = timestamp.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timestamp) => {
    const date = timestamp.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "bg-blue-100 text-blue-800",
      "Tech Talk": "bg-purple-100 text-purple-800",
      Workshop: "bg-green-100 text-green-800",
      Seminar: "bg-orange-100 text-orange-800",
      Competition: "bg-red-100 text-red-800",
      Cultural: "bg-pink-100 text-pink-800",
      Sports: "bg-yellow-100 text-yellow-800",
      Social: "bg-indigo-100 text-indigo-800",
      Career: "bg-teal-100 text-teal-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const isEventPast = () => {
    const eventDate = event.date.seconds
      ? new Date(event.date.seconds * 1000)
      : new Date(event.date);
    return eventDate < new Date();
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card group hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Event Poster */}
        <div className="lg:w-64 flex-shrink-0">
          {event.posterURL ? (
            <img
              src={event.posterURL}
              alt={event.title}
              className="w-full h-48 lg:h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-48 lg:h-40 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-primary-600">
                <CalendarDaysIcon className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm font-medium">Event</div>
              </div>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)}`}
              >
                {event.category}
              </span>
              {!isEventPast() && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                  {timeUntilEvent}
                </span>
              )}
              {isEventPast() && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  Past Event
                </span>
              )}
            </div>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              {isBookmarked ? (
                <BookmarkIconSolid className="w-5 h-5 text-yellow-500" />
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

          {/* Event Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4" />
              <span>{formatTime(event.date)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4" />
              <span>{event.organizerName}</span>
            </div>
          </div>

          {/* Event Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <UsersIcon className="w-4 h-4" />
                <span>{event.registrations || 0} registered</span>
              </div>
              {event.maxParticipants && (
                <span>• Max: {event.maxParticipants}</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {event.registerLink && !isEventPast() && (
                <button
                  onClick={handleRegister}
                  className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Register</span>
                </button>
              )}

              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
