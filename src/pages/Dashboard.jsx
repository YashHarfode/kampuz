import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  BriefcaseIcon,
  ChartBarIcon,
  BellIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const quickAccess = [
    {
      name: "NotesHub",
      description: "Access study materials",
      icon: BookOpenIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      path: "/notes",
      stats: "1.2k notes",
    },
    {
      name: "College Bazaar",
      description: "Browse marketplace",
      icon: ShoppingBagIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      path: "/bazaar",
      stats: "500+ items",
    },
    {
      name: "Events",
      description: "Upcoming events",
      icon: CalendarDaysIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      path: "/events",
      stats: "12 this week",
    },
    {
      name: "Doubt Solver",
      description: "Ask & answer questions",
      icon: QuestionMarkCircleIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      path: "/doubt-solver",
      stats: "50 active",
    },
    {
      name: "AI Tools",
      description: "Smart assistance",
      icon: SparklesIcon,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      path: "/ai-tools",
      stats: "6 tools",
    },
    {
      name: "Freelance",
      description: "Find projects",
      icon: BriefcaseIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      path: "/freelance",
      stats: "25 projects",
    },
  ];

  const stats = [
    {
      name: "Notes Downloaded",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: ArrowTrendingUpIcon,
    },
    {
      name: "Questions Answered",
      value: "23",
      change: "+8%",
      changeType: "increase",
      icon: QuestionMarkCircleIcon,
    },
    {
      name: "Events Attended",
      value: "8",
      change: "+4%",
      changeType: "increase",
      icon: CalendarDaysIcon,
    },
    {
      name: "Items Sold",
      value: "5",
      change: "+2%",
      changeType: "increase",
      icon: ShoppingBagIcon,
    },
  ];

  const recentActivity = [
    {
      action: "Downloaded",
      item: "Data Structures Notes - Chapter 5",
      time: "2 hours ago",
      type: "notes",
    },
    {
      action: "Answered",
      item: "Question about React Hooks",
      time: "4 hours ago",
      type: "doubt",
    },
    {
      action: "Registered for",
      item: "Tech Talk: AI in Education",
      time: "1 day ago",
      type: "event",
    },
    {
      action: "Listed",
      item: "iPhone 12 for sale",
      time: "2 days ago",
      type: "bazaar",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold font-display text-gray-900">
                Welcome back, Student! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening in your campus today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">S</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.name} variants={itemVariants}>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-green-600 text-sm font-medium">
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    from last month
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Access */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-2"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold mb-6"
            >
              Quick Access
            </motion.h2>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {quickAccess.map((item, index) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link to={item.path} className="block group">
                    <div className="card hover:scale-105 transition-all duration-300 hover:shadow-xl">
                      <div
                        className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mb-4`}
                      >
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {item.stats}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold mb-6"
            >
              Recent Activity
            </motion.h2>
            <motion.div variants={itemVariants} className="card">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "notes"
                          ? "bg-blue-500"
                          : activity.type === "doubt"
                            ? "bg-orange-500"
                            : activity.type === "event"
                              ? "bg-purple-500"
                              : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span>{" "}
                        {activity.item}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="#"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                  >
                    View all activity
                    <ChartBarIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/notes"
                  className="block w-full btn-primary text-center text-sm py-2"
                >
                  Upload Notes
                </Link>
                <Link
                  to="/bazaar"
                  className="block w-full btn-secondary text-center text-sm py-2"
                >
                  Post Item for Sale
                </Link>
                <Link
                  to="/doubt-solver"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Ask a Question
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
