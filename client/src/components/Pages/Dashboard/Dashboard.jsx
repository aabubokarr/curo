import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import { Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faUser, faCalendar, faFilePrescription } from "@fortawesome/free-solid-svg-icons";

Chart.register(...registerables);

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const chartRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !role) return;

    // Admin Dashboard - User Statistics
    if (role === "admin") {
      axios
        .get(`${API_URL}/user/count`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setStats(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching dashboard data:", err);
          setLoading(false);
        });
    }

    // Doctor Dashboard - Appointments and Prescriptions
    if (role === "doctor") {
      Promise.all([
        axios.get(`${API_URL}/list/appointment/doctor`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/list/doctor/prescription`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
        .then(([appointmentsRes, prescriptionsRes]) => {
          setAppointments(appointmentsRes.data || []);
          setPrescriptions(prescriptionsRes.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching doctor data:", err);
          setLoading(false);
        });
    }

    // Patient Dashboard - Prescriptions
    if (role === "patient") {
      axios
        .get(`${API_URL}/list/patient/prescription`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setPrescriptions(res.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching patient data:", err);
          setLoading(false);
        });
    }
  }, [token, role]);

  useEffect(() => {
    if (role === "admin" && stats && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Male Doctors", "Female Doctors", "Male Patients", "Female Patients"],
          datasets: [
            {
              label: "Total",
              data: [stats.doc_male, stats.doc_female, stats.pat_male, stats.pat_female],
              borderWidth: 2,
              backgroundColor: theme.colors.primary.main + "40",
              borderColor: theme.colors.primary.main,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "User Demographics",
              font: { size: 16, weight: "bold" },
              color: theme.colors.text.primary,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: theme.colors.text.secondary },
              grid: { color: theme.colors.border.light },
            },
            x: {
              ticks: { color: theme.colors.text.secondary },
              grid: { color: theme.colors.border.light },
            },
          },
        },
      });

      return () => myChart.destroy();
    }
  }, [stats, role]);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009BA9] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="sticky top-0 flex items-center justify-between bg-[#EFF0F6] z-10 py-4 mb-6 rounded-lg px-4">
          <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: theme.colors.text.primary }}>
            Dashboard
          </h1>
          <Profile />
        </div>

        {/* Admin Dashboard */}
        {role === "admin" && stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Male Doctors", value: stats.doc_male, color: theme.colors.primary.main, icon: faUserDoctor },
                { label: "Female Doctors", value: stats.doc_female, color: theme.colors.primary.light, icon: faUserDoctor },
                { label: "Male Patients", value: stats.pat_male, color: theme.colors.status.info, icon: faUser },
                { label: "Female Patients", value: stats.pat_female, color: theme.colors.status.success, icon: faUser },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card padding="lg" shadow="md" className="h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold" style={{ color: stat.color }}>
                          {stat.value}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stat.color + "20" }}>
                        <FontAwesomeIcon icon={stat.icon} style={{ color: stat.color }} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <Card padding="lg" shadow="lg">
              <h2 className="text-xl font-semibold mb-6" style={{ color: theme.colors.text.primary }}>
                User Statistics
              </h2>
              <div className="w-full h-80 sm:h-96">
                <canvas ref={chartRef}></canvas>
              </div>
            </Card>
          </div>
        )}

        {/* Doctor Dashboard */}
        {role === "doctor" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ y: -5 }}
              >
                <Card padding="lg" shadow="md" className="text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: theme.colors.status.info + "20" }}>
                    <FontAwesomeIcon icon={faCalendar} className="text-2xl" style={{ color: theme.colors.status.info }} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Total Appointments</p>
                  <p className="text-4xl font-bold" style={{ color: theme.colors.primary.main }}>
                    {appointments.length}
                  </p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card padding="lg" shadow="md" className="text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: theme.colors.status.success + "20" }}>
                    <FontAwesomeIcon icon={faFilePrescription} className="text-2xl" style={{ color: theme.colors.status.success }} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Total Prescriptions</p>
                  <p className="text-4xl font-bold" style={{ color: theme.colors.status.success }}>
                    {prescriptions.length}
                  </p>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card padding="lg" shadow="md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.colors.text.primary }}>
                  <FontAwesomeIcon icon={faCalendar} style={{ color: theme.colors.status.info }} />
                  Recent Appointments
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {appointments.slice(0, 5).map((apt, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="font-medium">{apt.patient_name}</p>
                      <p className="text-sm text-gray-600">
                        {apt.appointment_date} at {apt.appointment_time}
                      </p>
                    </div>
                  ))}
                  {appointments.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No appointments yet</p>
                  )}
                </div>
              </Card>

              <Card padding="lg" shadow="md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.colors.text.primary }}>
                  <FontAwesomeIcon icon={faFilePrescription} style={{ color: theme.colors.status.success }} />
                  Recent Prescriptions
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {prescriptions.slice(0, 5).map((pres, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <p className="font-medium">Prescription #{pres.prescription_id}</p>
                      <p className="text-sm text-gray-600">Patient ID: {pres.patient_id}</p>
                    </div>
                  ))}
                  {prescriptions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No prescriptions yet</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Patient Dashboard */}
        {role === "patient" && (
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
            >
              <Card padding="lg" shadow="md" className="text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: theme.colors.primary.main + "20" }}>
                  <FontAwesomeIcon icon={faFilePrescription} className="text-2xl" style={{ color: theme.colors.primary.main }} />
                </div>
                <p className="text-sm text-gray-600 mb-2">Total Prescriptions</p>
                <p className="text-4xl font-bold" style={{ color: theme.colors.primary.main }}>
                  {prescriptions.length}
                </p>
              </Card>
            </motion.div>

            <Card padding="lg" shadow="md">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: theme.colors.text.primary }}>
                <FontAwesomeIcon icon={faFilePrescription} style={{ color: theme.colors.primary.main }} />
                My Prescriptions
              </h3>
              <div className="space-y-3">
                {prescriptions.map((pres, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-medium">Prescription #{pres.prescription_id}</p>
                    <p className="text-sm text-gray-600">Doctor ID: {pres.doctor_id}</p>
                  </motion.div>
                ))}
                {prescriptions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No prescriptions yet</p>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
