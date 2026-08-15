import React, { useEffect, useRef, useState } from "react";
import Layout from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";

import { Chart, registerables } from "chart.js";
import axios from "axios";

import { Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faUser,
  faCalendar,
  faFilePrescription,
  faClock,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

Chart.register(...registerables);

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Time zones
  const [timeZones, setTimeZones] = useState({
    bd: "",
    china: "",
    uk: "",
  });

  // Update time zones every second
  useEffect(() => {
    const updateTimeZones = () => {
      const now = new Date();
      setTimeZones({
        bd: now.toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
        china: now.toLocaleString("en-US", {
          timeZone: "Asia/Shanghai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
        uk: now.toLocaleString("en-US", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      });
    };

    updateTimeZones();
    const interval = setInterval(updateTimeZones, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!token || !role) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        if (role === "admin") {
          const response = await axios.get(`${API_URL}/user/count`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setStats(response.data);
        }

        if (role === "doctor") {
          const [appointmentsRes, prescriptionsRes] = await Promise.all([
            axios.get(`${API_URL}/list/appointment/doctor`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            axios.get(`${API_URL}/list/doctor/prescription`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

          setAppointments(appointmentsRes.data || []);
          setPrescriptions(prescriptionsRes.data || []);
        }

        /* ================= PATIENT ================= */

        if (role === "patient") {
          const response = await axios.get(
            `${API_URL}/list/patient/prescription`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setPrescriptions(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, role]);

  useEffect(() => {
    if (role !== "admin" || !stats || !chartRef.current) {
      return;
    }

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const total =
      (stats.doc_male || 0) +
      (stats.doc_female || 0) +
      (stats.pat_male || 0) +
      (stats.pat_female || 0);

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Male Doctors",
          "Female Doctors",
          "Male Patients",
          "Female Patients",
        ],
        datasets: [
          {
            data: [
              stats.doc_male || 0,
              stats.doc_female || 0,
              stats.pat_male || 0,
              stats.pat_female || 0,
            ],
            backgroundColor: ["#009BA9", "#4FC3F7", "#66BB6A", "#A5D6A7"],
            borderColor: "#ffffff",
            borderWidth: 3,
            hoverOffset: 15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "55%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              usePointStyle: true,
              pointStyle: "circle",
              font: {
                size: 12,
                weight: "500",
              },
              color: "#374151",
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                const percentage =
                  total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [stats, role]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
          <div className="text-center">
            <div
              className="
                animate-spin
                rounded-full
                h-12
                w-12
                border-b-2
                border-[#009BA9]
                mx-auto
                mb-4
              "
            />

            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-4
          mb-8
        "
      >
        {/* PAGE TITLE */}

        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{
              color: theme.colors.text.primary,
            }}
          >
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Overview of your healthcare management system
          </p>
        </div>

        {/* PROFILE */}

        <Profile />
      </div>

      {role === "admin" && stats && (
        <div className="space-y-6">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
              md:gap-6
            "
          >
            {[
              {
                label: "Male Doctors",
                value: stats.doc_male || 0,
                color: theme.colors.primary.main,
                icon: faUserDoctor,
                bg: "bg-[#009BA9]/10",
              },
              {
                label: "Female Doctors",
                value: stats.doc_female || 0,
                color: theme.colors.primary.light,
                icon: faUserDoctor,
                bg: "bg-[#4FC3F7]/10",
              },
              {
                label: "Male Patients",
                value: stats.pat_male || 0,
                color: theme.colors.status.info,
                icon: faUser,
                bg: "bg-[#66BB6A]/10",
              },
              {
                label: "Female Patients",
                value: stats.pat_female || 0,
                color: theme.colors.status.success,
                icon: faUser,
                bg: "bg-[#A5D6A7]/10",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card
                  padding="lg"
                  shadow="md"
                  className="
                    h-full
                    hover:shadow-xl
                    transition-all
                    duration-300
                    rounded-xl
                    border
                    border-gray-50
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {stat.label}
                      </p>

                      <p
                        className="text-3xl font-bold"
                        style={{
                          color: stat.color,
                        }}
                      >
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`
                        w-12
                        h-12
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${stat.bg}
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      `}
                    >
                      <FontAwesomeIcon
                        icon={stat.icon}
                        style={{
                          color: stat.color,
                        }}
                        className="text-lg"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-row gap-6 mt-6">
            {/* Pie Chart - Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex-1"
            >
              <Card
                padding="lg"
                shadow="lg"
                className="
                  hover:shadow-xl
                  transition-shadow
                  duration-300
                  rounded-xl
                  border
                  border-gray-50
                "
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-xl font-semibold flex items-center gap-2"
                    style={{
                      color: theme.colors.text.primary,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faGlobe}
                      className="text-[#009BA9]"
                    />
                    User Demographics
                  </h2>
                  <div className="px-3 py-1 bg-[#009BA9]/10 rounded-full">
                    <span className="text-xs font-semibold text-[#009BA9]">
                      Total: {Object.values(stats).reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                </div>

                <div className="w-full h-80">
                  <canvas ref={chartRef} />
                </div>
              </Card>
            </motion.div>

            {/* Time Zones - Right (Flex Column) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-4 w-64 flex-shrink-0"
            >
              {/* Bangladesh */}
              <Card
                padding="md"
                shadow="md"
                className="
                  hover:shadow-xl
                  transition-all
                  duration-300
                  rounded-xl
                  border
                  border-gray-50
                  bg-gradient-to-br
                  from-green-50
                  to-emerald-50
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500">
                      Bangladesh
                    </p>
                    <p className="text-lg font-bold text-gray-800 font-mono">
                      {timeZones.bd || "Loading..."}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-green-500 text-sm flex-shrink-0"
                  />
                </div>
              </Card>

              {/* China */}
              <Card
                padding="md"
                shadow="md"
                className="
                  hover:shadow-xl
                  transition-all
                  duration-300
                  rounded-xl
                  border
                  border-gray-50
                  bg-gradient-to-br
                  from-red-50
                  to-rose-50
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500">China</p>
                    <p className="text-lg font-bold text-gray-800 font-mono">
                      {timeZones.china || "Loading..."}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-red-500 text-sm flex-shrink-0"
                  />
                </div>
              </Card>

              {/* United Kingdom */}
              <Card
                padding="md"
                shadow="md"
                className="
                  hover:shadow-xl
                  transition-all
                  duration-300
                  rounded-xl
                  border
                  border-gray-50
                  bg-gradient-to-br
                  from-blue-50
                  to-indigo-50
                "
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500">
                      United Kingdom
                    </p>
                    <p className="text-lg font-bold text-gray-800 font-mono">
                      {timeZones.uk || "Loading..."}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-blue-500 text-sm flex-shrink-0"
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      )}

      {role === "doctor" && (
        <div className="space-y-6">
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
              md:gap-6
            "
          >
            {/* APPOINTMENTS */}

            <motion.div
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <Card
                padding="lg"
                shadow="md"
                className="
                  text-center
                  hover:shadow-xl
                  transition-all
                  duration-300
                  rounded-xl
                  border
                  border-gray-50
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-4
                  "
                  style={{
                    backgroundColor: theme.colors.status.info + "20",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-2xl"
                    style={{
                      color: theme.colors.status.info,
                    }}
                  />
                </div>

                <p className="text-sm font-medium text-gray-500 mb-2">
                  Total Appointments
                </p>

                <p
                  className="text-4xl font-bold"
                  style={{
                    color: theme.colors.primary.main,
                  }}
                >
                  {appointments.length}
                </p>
              </Card>
            </motion.div>

            {/* PRESCRIPTIONS */}

            <motion.div
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.1,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <Card
                padding="lg"
                shadow="md"
                className="
                  text-center
                  hover:shadow-xl
                  transition-all
                  duration-300
                  rounded-xl
                  border
                  border-gray-50
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-4
                  "
                  style={{
                    backgroundColor: theme.colors.status.success + "20",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFilePrescription}
                    className="text-2xl"
                    style={{
                      color: theme.colors.status.success,
                    }}
                  />
                </div>

                <p className="text-sm font-medium text-gray-500 mb-2">
                  Total Prescriptions
                </p>

                <p
                  className="text-4xl font-bold"
                  style={{
                    color: theme.colors.status.success,
                  }}
                >
                  {prescriptions.length}
                </p>
              </Card>
            </motion.div>
          </div>

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-6
              mt-6
            "
          >
            {/* APPOINTMENTS */}

            <Card
              padding="lg"
              shadow="md"
              className="rounded-xl border border-gray-50"
            >
              <h3
                className="
                  text-lg
                  font-semibold
                  mb-4
                  flex
                  items-center
                  gap-2
                "
                style={{
                  color: theme.colors.text.primary,
                }}
              >
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{
                    color: theme.colors.status.info,
                  }}
                />
                Recent Appointments
                <span className="ml-auto text-xs bg-[#009BA9]/10 text-[#009BA9] px-2 py-1 rounded-full">
                  {appointments.length}
                </span>
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {appointments.slice(0, 5).map((apt, index) => (
                  <motion.div
                    key={apt.appointment_id || index}
                    initial={{
                      y: 10,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="
                      p-4
                      bg-gray-50
                      rounded-lg
                      hover:bg-gray-100
                      hover:shadow-sm
                      transition-all
                      duration-200
                      cursor-pointer
                      border
                      border-transparent
                      hover:border-[#009BA9]/20
                    "
                  >
                    <p className="font-medium text-gray-800">
                      {apt.patient_name || "Patient"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {apt.appointment_date || "Date not available"}

                      {apt.appointment_time
                        ? ` at ${apt.appointment_time}`
                        : ""}
                    </p>
                  </motion.div>
                ))}

                {appointments.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-gray-400 text-2xl"
                      />
                    </div>
                    <p className="text-gray-500">No appointments yet</p>
                  </div>
                )}
              </div>
            </Card>

            {/* PRESCRIPTIONS */}

            <Card
              padding="lg"
              shadow="md"
              className="rounded-xl border border-gray-50"
            >
              <h3
                className="
                  text-lg
                  font-semibold
                  mb-4
                  flex
                  items-center
                  gap-2
                "
                style={{
                  color: theme.colors.text.primary,
                }}
              >
                <FontAwesomeIcon
                  icon={faFilePrescription}
                  style={{
                    color: theme.colors.status.success,
                  }}
                />
                Recent Prescriptions
                <span className="ml-auto text-xs bg-[#66BB6A]/10 text-[#66BB6A] px-2 py-1 rounded-full">
                  {prescriptions.length}
                </span>
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {prescriptions.slice(0, 5).map((pres, index) => (
                  <motion.div
                    key={pres.prescription_id || index}
                    initial={{
                      y: 10,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="
                      p-4
                      bg-gray-50
                      rounded-lg
                      hover:bg-gray-100
                      hover:shadow-sm
                      transition-all
                      duration-200
                      cursor-pointer
                      border
                      border-transparent
                      hover:border-[#66BB6A]/20
                    "
                  >
                    <p className="font-medium text-gray-800">
                      Prescription #{pres.prescription_id}
                    </p>

                    <p className="text-sm text-gray-500">
                      Patient ID: {pres.patient_id}
                    </p>
                  </motion.div>
                ))}

                {prescriptions.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <FontAwesomeIcon
                        icon={faFilePrescription}
                        className="text-gray-400 text-2xl"
                      />
                    </div>
                    <p className="text-gray-500">No prescriptions yet</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {role === "patient" && (
        <div className="space-y-6">
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            whileHover={{
              y: -5,
            }}
          >
            <Card
              padding="lg"
              shadow="md"
              className="
                text-center
                hover:shadow-xl
                transition-all
                duration-300
                rounded-xl
                border
                border-gray-50
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-4
                "
                style={{
                  backgroundColor: theme.colors.primary.main + "20",
                }}
              >
                <FontAwesomeIcon
                  icon={faFilePrescription}
                  className="text-2xl"
                  style={{
                    color: theme.colors.primary.main,
                  }}
                />
              </div>

              <p className="text-sm font-medium text-gray-500 mb-2">
                Total Prescriptions
              </p>

              <p
                className="text-4xl font-bold"
                style={{
                  color: theme.colors.primary.main,
                }}
              >
                {prescriptions.length}
              </p>
            </Card>
          </motion.div>

          <Card
            padding="lg"
            shadow="md"
            className="rounded-xl border border-gray-50 mt-6"
          >
            <h3
              className="
                text-lg
                font-semibold
                mb-4
                flex
                items-center
                gap-2
              "
              style={{
                color: theme.colors.text.primary,
              }}
            >
              <FontAwesomeIcon
                icon={faFilePrescription}
                style={{
                  color: theme.colors.primary.main,
                }}
              />
              My Prescriptions
              <span className="ml-auto text-xs bg-[#009BA9]/10 text-[#009BA9] px-2 py-1 rounded-full">
                {prescriptions.length}
              </span>
            </h3>

            <div className="space-y-3">
              {prescriptions.map((pres, index) => (
                <motion.div
                  key={pres.prescription_id || index}
                  initial={{
                    y: 10,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="
                    p-4
                    bg-gray-50
                    rounded-lg
                    hover:bg-gray-100
                    hover:shadow-sm
                    transition-all
                    duration-200
                    border
                    border-transparent
                    hover:border-[#009BA9]/20
                  "
                >
                  <p className="font-medium text-gray-800">
                    Prescription #{pres.prescription_id}
                  </p>

                  <p className="text-sm text-gray-500">
                    Doctor ID: {pres.doctor_id}
                  </p>
                </motion.div>
              ))}

              {prescriptions.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon
                      icon={faFilePrescription}
                      className="text-gray-400 text-3xl"
                    />
                  </div>
                  <p className="text-gray-500 text-lg">No prescriptions yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Visit a doctor to get your first prescription
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {!["admin", "doctor", "patient"].includes(role) && (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
          <Card
            padding="lg"
            shadow="lg"
            className="text-center rounded-xl border border-gray-50"
          >
            <div
              className="
                w-20
                h-20
                rounded-full
                mx-auto
                mb-5
                flex
                items-center
                justify-center
                bg-gray-100
              "
            >
              <FontAwesomeIcon
                icon={faUser}
                className="text-3xl text-gray-400"
              />
            </div>

            <p className="text-lg text-gray-600">
              You don't have access to this dashboard
            </p>
          </Card>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #009ba9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #007a85;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
