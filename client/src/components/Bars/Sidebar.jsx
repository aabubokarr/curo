import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserDoctor,
  faUser,
  faCalendar,
  faBuilding,
  faFlask,
  faBriefcase,
  faPills,
  faFilePrescription,
  faEnvelope,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import bData from "./barData.json";
import { theme } from "../../constants/theme";

// Icon mapping for sidebar items
const iconMap = {
  Dashboard: faHome,
  Doctors: faUserDoctor,
  Patients: faUser,
  Appointments: faCalendar,
  Departments: faBuilding,
  Tests: faFlask,
  Services: faBriefcase,
  Medicines: faPills,
  Prescriptions: faFilePrescription,
  Requests: faEnvelope,
};

export const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleActive = (link) => {
    setActive(link);
    setIsMobileOpen(false);
  };

  const routes = bData.filter((b) => {
    if (role === "admin") {
      return (
        b.title === "Dashboard" ||
        b.title === "Doctors" ||
        b.title === "Patients" ||
        b.title === "Appointments" ||
        b.title === "Departments" ||
        b.title === "Tests" ||
        b.title === "Services" ||
        b.title === "Medicines" ||
        b.title === "Requests"
      );
    } else if (role === "doctor") {
      return (
        b.title === "Dashboard" ||
        b.title === "Appointments" ||
        b.title === "Prescriptions"
      );
    } else if (role === "patient") {
      return (
        b.title === "Dashboard" ||
        b.title === "Prescriptions"
      );
    } else {
      return false;
    }
  });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-16 left-4 z-50 p-2.5 rounded-lg shadow-xl transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: theme.colors.primary.main,
          color: theme.colors.text.white,
        }}
        aria-label="Toggle sidebar"
      >
        <FontAwesomeIcon
          icon={isMobileOpen ? faTimes : faBars}
          className="w-5 h-5"
        />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen z-50 w-64 lg:w-72 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundColor: theme.colors.primary.main,
        }}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-4 lg:p-6 border-b border-white border-opacity-20">
            <Link
              to="/dashboard"
              className="flex flex-col items-center gap-3 group"
              onClick={() => handleActive("/dashboard")}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl"
                style={{
                  backgroundColor: theme.colors.background.paper,
                }}
              >
                <span
                  className="text-2xl font-extrabold"
                  style={{ color: theme.colors.primary.main }}
                >
                  C
                </span>
              </motion.div>
              <h2
                className="text-lg font-bold tracking-wide"
                style={{ color: theme.colors.text.white }}
              >
                Curo
              </h2>
              <p
                className="text-xs opacity-75 text-center"
                style={{ color: theme.colors.text.white }}
              >
                Healthcare Management
              </p>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-2">
              {routes.map((b, index) => {
                const isActive = active === b.link;
                const icon = iconMap[b.title] || faHome;

                return (
                  <motion.div
                    key={b.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={b.link}
                      onClick={() => handleActive(b.link)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? "bg-white shadow-lg"
                          : "hover:bg-white hover:bg-opacity-10"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-opacity-10"
                            : "group-hover:bg-white group-hover:bg-opacity-10"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? theme.colors.primary.main
                            : "transparent",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={icon}
                          className="text-lg transition-colors duration-300"
                          style={{
                            color: isActive
                              ? theme.colors.primary.main
                              : theme.colors.text.white,
                          }}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors duration-300 flex-1 ${
                          isActive ? "" : "text-white"
                        }`}
                        style={{
                          color: isActive
                            ? theme.colors.primary.main
                            : theme.colors.text.white,
                        }}
                      >
                        {b.title}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: theme.colors.primary.main }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </nav>

          {/* User Info Section */}
          <div className="p-4 border-t border-white border-opacity-20">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white bg-opacity-10">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  backgroundColor: theme.colors.background.paper,
                  color: theme.colors.primary.main,
                }}
              >
                {role ? role.charAt(0).toUpperCase() : "G"}
              </div>
              <div className="flex-1">
                <p
                  className="text-sm font-semibold capitalize"
                  style={{ color: theme.colors.text.white }}
                >
                  {role || "Guest"}
                </p>
                <p
                  className="text-xs opacity-75"
                  style={{ color: theme.colors.text.white }}
                >
                  {role === "admin"
                    ? "Administrator"
                    : role === "doctor"
                    ? "Medical Professional"
                    : role === "patient"
                    ? "Patient"
                    : "Visitor"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
