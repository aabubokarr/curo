import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHome,
  faUserDoctor,
  faUser,
  faCalendarDays,
  faBuilding,
  faFlask,
  faBriefcase,
  faPills,
  faFilePrescription,
  faEnvelope,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { Box, Typography, Divider, Avatar } from "@mui/material";
import { alpha } from "@mui/material/styles";

import bData from "./barData.json";
import { theme } from "../../constants/theme";

const SIDEBAR_WIDTH = 280;

const iconMap = {
  Dashboard: faHome,
  Doctors: faUserDoctor,
  Patients: faUser,
  Appointments: faCalendarDays,
  Departments: faBuilding,
  Tests: faFlask,
  Services: faBriefcase,
  Medicines: faPills,
  Prescriptions: faFilePrescription,
  Requests: faEnvelope,
};

export const Sidebar = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const routes = bData.filter((item) => {
    if (role === "admin") {
      return [
        "Dashboard",
        "Doctors",
        "Patients",
        "Appointments",
        "Departments",
        "Tests",
        "Services",
        "Medicines",
        "Requests",
      ].includes(item.title);
    }

    if (role === "doctor") {
      return ["Appointments", "Prescriptions"].includes(
        item.title
      );
    }

    if (role === "patient") {
      return ["Prescriptions"].includes(item.title);
    }

    return false;
  });

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: `${SIDEBAR_WIDTH}px`,
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: `linear-gradient(
          180deg,
          ${theme.colors.primary.main} 0%,
          #008c99 100%
        )`,
        color: "#ffffff",
        borderRight: `1px solid ${alpha("#ffffff", 0.08)}`,
        boxShadow: "8px 0 30px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexShrink: 0,
        }}
      >
        {/* Logo Icon */}

        <Box
          sx={{
            width: 50,
            height: 50,
            flexShrink: 0,
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          }}
        >
          <img src="./images/logo.png" alt="Logo" className="w-10" />
        </Box>

        {/* Brand */}

        <Box>
          <Typography
            sx={{
              color: "#ffffff",
              fontSize: "21px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.4px",
            }}
          >
            Curo
          </Typography>

          <Typography
            sx={{
              color: alpha("#ffffff", 0.65),
              fontSize: "10px",
              fontWeight: 500,
              mt: 0.5,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Healthcare
          </Typography>
        </Box>
      </Box>

      <Box
        component="nav"
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          "&::-webkit-scrollbar": {
            width: "4px",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha("#ffffff", 0.15),
            borderRadius: "10px",
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          {routes.map((item, index) => {
            const isActive = location.pathname === item.link;
            const icon = iconMap[item.title] || faHome;

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.04,
                  duration: 0.25,
                }}
              >
                <Link
                  to={item.link}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      minHeight: 52,
                      px: 1.2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      borderRadius: "14px",
                      cursor: "pointer",
                      backgroundColor: isActive ? "#ffffff" : "transparent",
                      color: isActive
                        ? theme.colors.primary.main
                        : alpha("#ffffff", 0.8),

                      transition: "all 0.25s ease",

                      "&:hover": {
                        transform: "translateX(3px)",

                        backgroundColor: isActive
                          ? "#ffffff"
                          : alpha("#ffffff", 0.09),

                        color: isActive ? theme.colors.primary.main : "#ffffff",
                      },
                    }}
                  >
                    {/* Icon */}

                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "11px",
                        backgroundColor: isActive
                          ? alpha(theme.colors.primary.main, 0.1)
                          : alpha("#ffffff", 0.07),
                        transition: "all 0.25s ease",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={icon}
                        style={{
                          fontSize: "15px",
                        }}
                      />
                    </Box>

                    {/* Text */}

                    <Typography
                      sx={{
                        flex: 1,
                        color: "inherit",
                        fontSize: "13.5px",
                        fontWeight: isActive ? 700 : 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* Active Indicator */}

                    {isActive && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: -5,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          style={{
                            fontSize: "10px",
                          }}
                        />
                      </motion.div>
                    )}
                  </Box>
                </Link>
              </motion.div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
