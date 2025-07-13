import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  BriefcaseIcon,
  BellIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function ComingSoon({ feature }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const featureInfo = {
    NotesHub: {
      icon: BookOpenIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description:
        "Upload, download and share study materials with your peers. Organize notes by subject, semester, and difficulty level.",
      features: [
        "Smart categorization",
        "Peer reviews",
        "Download tracking",
        "Mobile app",
      ],
    },
    "College Bazaar": {
      icon: ShoppingBagIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description:
        "Buy and sell used books, gadgets, and more within your campus. Safe transactions with student verification.",
      features: [
        "Verified sellers",
        "In-campus delivery",
        "Price comparison",
        "Secure payments",
      ],
    },
    "Event Calendar": {
      icon: CalendarDaysIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description:
        "Stay updated with campus events and register instantly. Never miss important deadlines or exciting activities.",
      features: [
        "Smart notifications",
        "One-click registration",
        "Calendar sync",
        "Event reminders",
      ],
    },
    "Doubt Solver": {
      icon: QuestionMarkCircleIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description:
        "Ask questions and get answers from seniors and peers. Create study groups and collaborative learning sessions.",
      features: [
        "Expert answers",
        "Study groups",
        "Video explanations",
        "Subject-wise filtering",
      ],
    },
    "AI Tools": {
      icon: SparklesIcon,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description:
        "Resume builder, assignment helper, grammar checker and more. Powered by advanced AI to boost your productivity.",
      features: [
        "Resume builder",
        "Assignment help",
        "Grammar checker",
        "Interview prep",
      ],
    },
    "Freelance Projects": {
      icon: BriefcaseIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description:
        "Find mini-jobs and project opportunities within your college. Build your portfolio while earning money.",
      features: [
        "Skill-based matching",
        "Secure payments",
        "Portfolio building",
        "Peer networking",
      ],
    },
  };

  const currentFeature = featureInfo[feature] || featureInfo["NotesHub"];

  const handleNotify = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          {/* Feature Icon */}
          <motion.div variants={itemVariants} className="mb-8">
            <div
              className={`w-24 h-24 ${currentFeature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <currentFeature.icon
                className={`w-12 h-12 ${currentFeature.color}`}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              {feature} is <span className="text-gradient">Coming Soon</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {currentFeature.description}
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {currentFeature.features.map((featureItem, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-left"
                >
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{featureItem}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progress indicator */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Development Progress
                </span>
                <span className="text-sm font-medium text-primary-600">
                  75%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Expected launch: Next month
              </p>
            </div>
          </motion.div>

          {/* Notification signup */}
          <motion.div variants={itemVariants} className="card max-w-md mx-auto">
            {!isSubscribed ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <BellIcon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
                <p className="text-gray-600 mb-6">
                  Be the first to know when {feature} launches. We'll send you
                  an update as soon as it's ready!
                </p>
                <form onSubmit={handleNotify} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    required
                  />
                  <button type="submit" className="w-full btn-primary">
                    Notify Me When Ready
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">
                  You're All Set!
                </h3>
                <p className="text-gray-600">
                  We'll notify you as soon as {feature} is ready to use.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Back to dashboard */}
          <motion.div variants={itemVariants} className="mt-12">
            <motion.a
              href="/dashboard"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ← Back to Dashboard
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
