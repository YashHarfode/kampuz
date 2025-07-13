import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  CurrencyRupeeIcon,
  UserIcon,
  CalendarIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { AuthContext } from "../../context/AuthContext";
import { incrementListingViews } from "../../firebase/firestore";

export default function ProductCard({ listing }) {
  const { user } = useContext(AuthContext);

  const handleContact = async () => {
    try {
      await incrementListingViews(listing.id);

      const message = `Hi! I'm interested in your "${listing.title}" listed for ₹${listing.price}. Is it still available?`;
      const whatsappUrl = `https://wa.me/${listing.contact.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case "new":
        return "bg-green-100 text-green-800";
      case "like new":
        return "bg-blue-100 text-blue-800";
      case "good":
        return "bg-yellow-100 text-yellow-800";
      case "fair":
        return "bg-orange-100 text-orange-800";
      case "poor":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {listing.imageURL ? (
          <img
            src={listing.imageURL}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">📷</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(listing.condition)}`}
          >
            {listing.condition}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs bg-white bg-opacity-90 text-gray-700 rounded-full">
            {listing.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Title and Price */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center mt-1">
            <CurrencyRupeeIcon className="w-5 h-5 text-green-600" />
            <span className="text-xl font-bold text-green-600">
              {listing.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {listing.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <UserIcon className="w-4 h-4" />
            <span>{listing.sellerName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(listing.createdAt)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <EyeIcon className="w-4 h-4" />
            <span>{listing.views || 0} views</span>
          </div>
          <div className="text-xs">Listed {formatDate(listing.createdAt)}</div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={handleContact}
            className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>Contact</span>
          </button>

          {user && (
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <HeartIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
