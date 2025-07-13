import React from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  downloadNoteFile,
  incrementDownloadCount,
} from "../../firebase/firestore";

export default function NotesCard({ note }) {
  const handleDownload = async () => {
    try {
      await downloadNoteFile(note.fileURL, note.title);
      await incrementDownloadCount(note.id);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Error downloading file. Please try again.");
    }
  };

  const handlePreview = () => {
    window.open(note.fileURL, "_blank");
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold ${
              note.subject === "Computer Science" ||
              note.subject === "Data Structures"
                ? "bg-blue-500"
                : note.subject === "Mathematics"
                  ? "bg-green-500"
                  : note.subject === "Physics"
                    ? "bg-purple-500"
                    : "bg-gray-500"
            }`}
          >
            {note.semester}
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {note.subject}
          </span>
        </div>
        <DocumentTextIcon className="w-6 h-6 text-gray-400" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {note.title}
      </h3>

      {/* Description */}
      {note.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {note.description}
        </p>
      )}

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded-full"
            >
              <TagIcon className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <UserIcon className="w-4 h-4" />
          <span>{note.uploaderName || "Anonymous"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{formatDate(note.createdAt)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>{note.downloads || 0} downloads</span>
        </div>
        <div className="text-xs text-gray-400">
          PDF • {Math.round(Math.random() * 5 + 1)}MB
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={handlePreview}
          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <EyeIcon className="w-4 h-4" />
          <span>Preview</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </motion.div>
  );
}
