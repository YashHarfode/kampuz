import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMarketplaceListings } from "../../firebase/firestore";
import ProductCard from "./ProductCard";

export default function MarketplaceList({
  searchTerm,
  selectedCategory,
  priceRange,
}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (selectedCategory !== "all") {
          filters.category = selectedCategory;
        }

        const listingsData = await getMarketplaceListings(filters);
        setListings(listingsData);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [selectedCategory]);

  // Filter and sort listings
  const filteredListings = listings
    .filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.sellerName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice = () => {
        if (priceRange === "all") return true;
        const price = listing.price;

        switch (priceRange) {
          case "0-500":
            return price <= 500;
          case "500-2000":
            return price > 500 && price <= 2000;
          case "2000-10000":
            return price > 2000 && price <= 10000;
          case "10000+":
            return price > 10000;
          default:
            return true;
        }
      };

      return matchesSearch && matchesPrice() && listing.status === "available";
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt?.seconds * 1000) -
            new Date(a.createdAt?.seconds * 1000)
          );
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
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
          {filteredListings.length} products found
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="recent">Most Recent</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Viewed</option>
        </select>
      </div>

      {/* Products Grid */}
      {filteredListings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== "all" || priceRange !== "all"
              ? "Try adjusting your search or filters"
              : "Be the first to post something for sale!"}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard listing={listing} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
