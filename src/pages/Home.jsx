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
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const features = [
    {
      name: "NotesHub",
      description:
        "Upload, download and share study materials with your peers.",
      icon: BookOpenIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      path: "/notes",
    },
    {
      name: "College Bazaar",
      description:
        "Buy and sell used books, gadgets, and more within your campus.",
      icon: ShoppingBagIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      path: "/bazaar",
    },
    {
      name: "Event Calendar",
      description: "Stay updated with campus events and register instantly.",
      icon: CalendarDaysIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      path: "/events",
    },
    {
      name: "Doubt Solver",
      description: "Ask questions and get answers from seniors and peers.",
      icon: QuestionMarkCircleIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      path: "/doubt-solver",
    },
    {
      name: "AI Tools",
      description:
        "Resume builder, assignment helper, grammar checker and more.",
      icon: SparklesIcon,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      path: "/ai-tools",
    },
    {
      name: "Freelance Projects",
      description:
        "Find mini-jobs and project opportunities within your college.",
      icon: BriefcaseIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      path: "/freelance",
    },
  ];

  const testimonials = [
    {
      content:
        "Kampuz made my college life so much easier! I found all my textbooks at great prices and made new friends through study groups.",
      author: "Priya Sharma",
      role: "Computer Science, IIT Delhi",
      rating: 5,
    },
    {
      content:
        "The AI tools are incredible! The resume builder helped me land my first internship. Highly recommend to all students.",
      author: "Arjun Patel",
      role: "Mechanical Engineering, NIT Trichy",
      rating: 5,
    },
    {
      content:
        "Finally, a platform that understands student needs. From notes to events, everything is in one place. Game changer!",
      author: "Sneha Reddy",
      role: "MBA, IIM Bangalore",
      rating: 5,
    },
  ];

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold font-display mb-6"
            >
              Your Campus, <span className="text-gradient">Supercharged</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              The ultimate student platform that brings together notes,
              marketplace, events, AI tools, and more. Built by students, for
              students.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register" className="btn-primary text-lg px-8 py-4">
                Get Started Free
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/dashboard"
                className="text-primary-600 hover:text-primary-700 font-medium text-lg flex items-center"
              >
                View Demo
                <ArrowRightIcon className="w-5 h-5 ml-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                Free for students
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                Trusted by 10k+ students
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                Available 24/7
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-60 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary-100 rounded-full opacity-40 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-100 rounded-full opacity-50 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Everything You Need for{" "}
              <span className="text-gradient">College Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From sharing notes to finding jobs, Kampuz has all the tools you
              need to excel in your academic journey.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={feature.name} variants={itemVariants}>
                <Link to={feature.path} className="block group">
                  <div className="card hover:scale-105 transition-transform duration-300">
                    <div
                      className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center text-primary-600 font-medium">
                      Learn more
                      <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Loved by{" "}
              <span className="text-gradient">Students Everywhere</span>
            </h2>
            <p className="text-xl text-gray-600">
              See what students are saying about Kampuz
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="card">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Transform Your College Experience?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/90 mb-8"
            >
              Join thousands of students who are already using Kampuz to make
              their college life easier and more productive.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Journey
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
