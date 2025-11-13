import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { Button } from "../../UI";
import { theme } from "../../../constants/theme";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 md:py-32 bg-gradient-to-br from-[#EFF0F6] via-white to-[#EFF0F6]"
    >
      <div className="max-w-6xl w-full mx-auto text-center">
        {/* Logo/Icon */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg border-2 border-[#009BA9]">
            <svg
              className="w-10 h-10 md:w-12 md:h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: theme.colors.primary.main }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-[#009BA9] uppercase tracking-wider mb-3">
            Welcome to Curo
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            <span className="block" style={{ color: theme.colors.text.primary }}>
              Your Path to Health,
            </span>
            <span
              className="block mt-1"
              style={{ color: theme.colors.primary.main }}
            >
              Our Commitment to Care
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed px-4"
        >
          Experience comprehensive healthcare management with Curo. Streamline
          appointments, manage patient records, and deliver exceptional care
          with our modern hospital management system.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12"
        >
          <Link to="calculator" smooth={true} offset={-80}>
            <Button size="lg" variant="primary" className="w-full sm:w-auto min-w-[180px]">
              Calculate BMI
            </Button>
          </Link>
          <Link to="contact" smooth={true} offset={-80}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[180px]">
              Contact Us
            </Button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12"
        >
          {[
            {
              icon: "👨‍⚕️",
              title: "Expert Doctors",
              description: "Access to qualified healthcare professionals",
            },
            {
              icon: "📅",
              title: "Easy Appointments",
              description: "Book and manage appointments seamlessly",
            },
            {
              icon: "💊",
              title: "Complete Care",
              description: "Comprehensive healthcare management system",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: theme.colors.text.primary }}>
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
