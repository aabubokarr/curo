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
  faStethoscope,
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
      return ["Dashboard", "Appointments", "Prescriptions"].includes(
        item.title
      );
    }

    if (role === "patient") {
      return ["Dashboard", "Prescriptions"].includes(item.title);
    }

    return false;
  });

  const getRoleTitle = () => {
    switch (role) {
      case "admin":
        return "Administrator";

      case "doctor":
        return "Medical Professional";

      case "patient":
        return "Patient";

      default:
        return "Guest";
    }
  };

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
      {/* =====================================================
          LOGO
      ====================================================== */}

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
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          }}
        >
          <FontAwesomeIcon
            icon={faStethoscope}
            style={{
              color: theme.colors.primary.main,
              fontSize: "22px",
            }}
          />
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

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

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

      {/* =====================================================
          USER PROFILE
      ====================================================== */}

      <Box
        sx={{
          px: 2,
          pb: 2,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderRadius: "16px",
            backgroundColor: alpha("#ffffff", 0.1),
            border: `1px solid ${alpha("#ffffff", 0.1)}`,
          }}
        >
          <Avatar
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              backgroundColor: "#ffffff",
              color: theme.colors.primary.main,
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {role ? role.charAt(0).toUpperCase() : "G"}
          </Avatar>

          <Box
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "capitalize",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {role || "Guest"}
            </Typography>

            <Typography
              sx={{
                color: alpha("#ffffff", 0.55),
                fontSize: "10px",
                mt: 0.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {getRoleTitle()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
