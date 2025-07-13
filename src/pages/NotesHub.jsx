import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import UploadNotes from "./Notes/UploadNotes";
import NotesList from "./Notes/NotesList";
import FirebaseSetupBanner from "../components/FirebaseSetupBanner";

export default function NotesHub() {
  const { user } = useContext(AuthContext);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Computer Science",
    "Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Database Management",
    "Web Development",
    "Machine Learning",
  ];

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
              📘 NotesHub
            </h1>
            <p className="text-gray-600 mt-1">
              Upload, download and share study materials with your peers
            </p>
          </div>
          {user && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Upload Notes</span>
            </button>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes by title, subject, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Semesters</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Notes List */}
        <NotesList
          searchTerm={searchTerm}
          selectedSemester={selectedSemester}
          selectedSubject={selectedSubject}
        />

        {/* Upload Modal */}
        {showUploadModal && (
          <UploadNotes onClose={() => setShowUploadModal(false)} />
        )}
      </div>
    </div>
  );
}
