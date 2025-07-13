import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  PhotoIcon,
  LinkIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import { createEvent } from "../../firebase/firestore";

export default function EventForm({ onClose }) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    registerLink: "",
    category: "",
    maxParticipants: "",
  });
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [creating, setCreating] = useState(false);

  const categories = [
    "Academic",
    "Tech Talk",
    "Workshop",
    "Seminar",
    "Competition",
    "Cultural",
    "Sports",
    "Social",
    "Career",
    "Others",
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPoster(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setCreating(true);
    try {
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);

      const eventData = {
        ...formData,
        date: eventDateTime,
        maxParticipants: formData.maxParticipants
          ? parseInt(formData.maxParticipants)
          : null,
        organizer: user.uid,
        organizerName: user.displayName || user.email,
        organizerEmail: user.email,
      };

      await createEvent(poster, eventData);
      alert("Event created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Create Event</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Event Poster */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Poster (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {posterPreview ? (
                  <div className="relative">
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="mx-auto h-48 w-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPoster(null);
                        setPosterPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <label className="text-primary-600 hover:text-primary-700 cursor-pointer">
                      Click to upload poster
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePosterChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Tech Talk: AI in Education"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Auditorium, Room 101, Online"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    name="registerLink"
                    value={formData.registerLink}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="https://forms.google.com/..."
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe the event, what attendees can expect, agenda, speakers, etc."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
