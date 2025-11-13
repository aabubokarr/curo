import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../UI";
import { theme } from "../../constants/theme";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";

  const navLinks = [
    { to: "hero", label: "Home", show: isHomePage },
    { to: "calculator", label: "Calculator", show: isHomePage },
    { to: "contact", label: "Contact", show: isHomePage },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-[#FAF9F6]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <RouterLink
            to="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: theme.colors.background.paper,
                border: `2px solid ${theme.colors.primary.main}`,
              }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: theme.colors.primary.main }}
              >
                C
              </span>
            </div>
            <span
              className="hidden sm:block text-lg font-bold"
              style={{ color: theme.colors.text.primary }}
            >
              Curo
            </span>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {isHomePage &&
              navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  className="text-sm font-medium cursor-pointer transition-colors duration-300 hover:opacity-80"
                  style={{ color: theme.colors.text.primary }}
                >
                  {link.label}
                </Link>
              ))}
            <RouterLink to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </RouterLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: theme.colors.text.primary }}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-3 space-y-3">
              {isHomePage &&
                navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    offset={-80}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-medium py-2 transition-colors duration-300"
                    style={{ color: theme.colors.text.primary }}
                  >
                    {link.label}
                  </Link>
                ))}
              <RouterLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" fullWidth>
                  Login
                </Button>
              </RouterLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
