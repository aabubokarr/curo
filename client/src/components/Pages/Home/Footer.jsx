import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { theme } from "../../../constants/theme";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full py-12 md:py-16 mt-20"
      style={{ backgroundColor: theme.colors.background.dark }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4" style={{ backgroundColor: theme.colors.background.light }}>
              <span className="text-2xl font-bold" style={{ color: theme.colors.text.primary }}>
                C
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Curo</h3>
            <p className="text-gray-400 text-sm">
              Your path to health, our commitment to care. Comprehensive
              healthcare management system.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#calculator"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  BMI Calculator
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@curo.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Healthcare St, Medical City</li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 text-sm">
            Copyright © {year} Curo. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
