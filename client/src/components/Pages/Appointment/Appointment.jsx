import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCalendar, faPlus, faUserDoctor, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";
import { motion } from "framer-motion";

export const Appointment = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const api =
      role === "admin"
        ? `${API_URL}/appointment/read`
        : `${API_URL}/list/appointment/doctor`;

    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppointmentList(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointment data.");
        setLoading(false);
      });
  }, [token, role]);

  const handleDelete = (appId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete(`${API_URL}/appointment/delete/${appId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAppointmentList((prevList) =>
            prevList.filter(
              (appointment) => appointment.appointment_id !== appId
            )
          );
          alert("Appointment deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete appointment.");
        });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="sticky top-0 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#EFF0F6] z-10 py-4 mb-6 rounded-lg px-4 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: theme.colors.text.primary }}>
            Appointments
          </h1>
          <div className="flex items-center gap-4">
            {role === "admin" && (
              <Link to="/create-appointment">
                <Button variant="primary" size="md" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  <span className="hidden sm:inline">Add New Appointment</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </Link>
            )}
            <Profile />
          </div>
        </div>

        {error && (
          <Card padding="md" className="mb-6 bg-red-50 border border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009BA9] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        ) : appointmentList.length === 0 ? (
          <Card padding="lg" className="text-center">
            <FontAwesomeIcon icon={faCalendar} className="text-4xl text-gray-400 mb-4" />
            <p className="text-lg text-gray-600">No appointments found</p>
            {role === "admin" && (
              <Link to="/create-appointment" className="mt-4 inline-block">
                <Button variant="primary" size="md">Add First Appointment</Button>
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {appointmentList.map((appointment, index) => (
              <motion.div
                key={appointment.appointment_id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card padding="lg" shadow="md" className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.status.info + "20" }}>
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-xl"
                        style={{ color: theme.colors.status.info }}
                      />
                    </div>
                    {role === "admin" && (
                      <button
                        onClick={() => handleDelete(appointment.appointment_id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors text-red-500"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Appointment ID</p>
                      <p className="font-bold text-lg" style={{ color: theme.colors.text.primary }}>
                        #{appointment.appointment_id}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faUserDoctor}
                        className="text-sm mt-1"
                        style={{ color: theme.colors.primary.main }}
                      />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Doctor</p>
                        <p className="text-sm font-medium">{appointment.doctor_name || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-sm mt-1"
                        style={{ color: theme.colors.status.info }}
                      />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Patient</p>
                        <p className="text-sm font-medium">{appointment.patient_name || "N/A"}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="text-sm font-medium">{appointment.appointment_date || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        <p className="text-sm font-medium">{appointment.appointment_time || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
