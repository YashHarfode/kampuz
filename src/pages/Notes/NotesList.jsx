import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getNotes } from "../../firebase/firestore";
import NotesCard from "./NotesCard";

export default function NotesList({
  searchTerm,
  selectedSemester,
  selectedSubject,
}) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const notesData = await getNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Filter and sort notes
  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.tags &&
          note.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ));

      const matchesSemester =
        selectedSemester === "all" || note.semester === selectedSemester;
      const matchesSubject =
        selectedSubject === "all" || note.subject === selectedSubject;

      return matchesSearch && matchesSemester && matchesSubject;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt?.seconds * 1000) -
            new Date(a.createdAt?.seconds * 1000)
          );
        case "popular":
          return (b.downloads || 0) - (a.downloads || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Sort Options */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Showing {filteredNotes.length} notes
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Downloaded</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No notes found
          </h3>
          <p className="text-gray-500">
            {searchTerm ||
            selectedSemester !== "all" ||
            selectedSubject !== "all"
              ? "Try adjusting your search or filters"
              : "Be the first to upload notes!"}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NotesCard note={note} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
