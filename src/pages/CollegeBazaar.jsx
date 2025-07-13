import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import PostAdForm from "./Bazaar/PostAdForm";
import MarketplaceList from "./Bazaar/MarketplaceList";

export default function CollegeBazaar() {
  const { user } = useContext(AuthContext);
  const [showPostModal, setShowPostModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const categories = [
    "Books",
    "Electronics",
    "Gadgets",
    "Furniture",
    "Clothing",
    "Sports Equipment",
    "Musical Instruments",
    "Stationery",
    "Others",
  ];

  const priceRanges = [
    { label: "Under ₹500", value: "0-500" },
    { label: "₹500 - ₹2000", value: "500-2000" },
    { label: "₹2000 - ₹10000", value: "2000-10000" },
    { label: "Above ₹10000", value: "10000+" },
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
              🛍️ College Bazaar
            </h1>
            <p className="text-gray-600 mt-1">
              Buy and sell used books, gadgets, and more within your campus
            </p>
          </div>
          {user && (
            <button
              onClick={() => setShowPostModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Post Ad</span>
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
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by title, description, or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Marketplace Grid */}
        <MarketplaceList
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          priceRange={priceRange}
        />

        {/* Post Ad Modal */}
        {showPostModal && (
          <PostAdForm onClose={() => setShowPostModal(false)} />
        )}
      </div>
    </div>
  );
}
