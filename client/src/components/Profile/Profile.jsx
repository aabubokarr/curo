import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../constants/config";
import { theme } from "../../constants/theme";

export const Profile = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    
    axios
      .get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setName(res.data.user.name);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }
        console.error("Error fetching user:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
        style={{ backgroundColor: theme.colors.secondary.main }}
      >
        <span className="text-sm font-semibold" style={{ color: theme.colors.text.secondary }}>
          ...
        </span>
      </div>
    );
  }

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="relative">
      <button
        onClick={() => setProfileMenu(!profileMenu)}
        onMouseEnter={() => setProfileMenu(true)}
        onMouseLeave={() => setProfileMenu(false)}
        className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: theme.colors.primary.main,
          color: theme.colors.text.white,
        }}
        aria-label="Profile menu"
      >
        <span className="text-sm font-semibold">{initials}</span>
      </button>

      <AnimatePresence>
        {profileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setProfileMenu(true)}
            onMouseLeave={() => setProfileMenu(false)}
            className="absolute right-0 top-14 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[150px] z-50"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
                {name || "User"}
              </div>
              <Link
                to="/edit-profile"
                onClick={() => setProfileMenu(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
              >
                Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
