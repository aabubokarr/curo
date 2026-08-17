import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";

import Modal from "../../UI/Modals/Modal";
import CreateAppointment from "./CreateAppointment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCalendar,
  faPlus,
  faUserDoctor,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

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

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const api =
        role === "admin"
          ? `${API_URL}/appointment/read`
          : `${API_URL}/appointment/doctor`;

      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointmentList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch appointment data."
      );
    } finally {
      setLoading(false);
    }
  }, [token, role]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchAppointments();
  }, [fetchAppointments, token]);

  const handleDelete = async (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/appointment/delete/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointmentList((previousList) =>
        previousList.filter(
          (appointment) => appointment.appointment_id !== appointmentId
        )
      );

      alert("Appointment deleted successfully.");
    } catch (error) {
      console.error("Failed to delete appointment:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete appointment."
      );
    }
  };

  const handleAppointmentCreated = async () => {
    setShowAppointmentModal(false);

    await fetchAppointments();
  };

  if (role !== "admin" && role !== "doctor") {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
          <Card padding="lg" shadow="lg" className="text-center">
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
                icon={faCalendar}
                className="text-3xl text-gray-400"
              />
            </div>

            <p className="text-lg text-gray-600">
              You don't have access to this page
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HEADER */}

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
            Appointments
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {role === "admin"
              ? "Manage and view all appointments"
              : "View your scheduled appointments"}
          </p>
        </div>

        {/* HEADER ACTIONS */}

        <div className="flex items-center gap-4">
          {role === "admin" && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowAppointmentModal(true)}
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />

              <span className="hidden sm:inline">Add New Appointment</span>

              <span className="sm:hidden">Add</span>
            </Button>
          )}

          <Profile />
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <Card
          padding="md"
          className="
            mb-6
            bg-red-50
            border
            border-red-200
          "
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchAppointments}
              className="
                text-sm
                font-medium
                text-red-700
                hover:underline
              "
            >
              Try Again
            </button>
          </div>
        </Card>
      )}

      {/* LOADING */}

      {loading ? (
        <div className="text-center py-12">
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

          <p className="text-gray-600">Loading appointments...</p>
        </div>
      ) : appointmentList.length === 0 ? (
        /* EMPTY STATE */

        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-8">
            <FontAwesomeIcon
              icon={faCalendar}
              className="
                text-4xl
                text-gray-400
                mb-4
              "
            />

            <p className="text-lg text-gray-600">No appointments found</p>

            {role === "admin" && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowAppointmentModal(true)}
                className="mt-4"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add First Appointment
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* APPOINTMENT GRID */

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-5
          "
        >
          {appointmentList.map((appointment, index) => (
            <motion.div
              key={appointment.appointment_id}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <Card
                padding="lg"
                shadow="md"
                className="
                  h-full
                  hover:shadow-lg
                  transition-shadow
                  duration-300
                "
              >
                {/* CARD HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  {/* APPOINTMENT ICON */}

                  <div
                    className="
                      w-12
                      h-12
                      rounded-full
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      backgroundColor: theme.colors.status.info + "20",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="text-xl"
                      style={{
                        color: theme.colors.status.info,
                      }}
                    />
                  </div>

                  {/* ACTIONS */}

                  {role === "admin" && (
                    <button
                      type="button"
                      onClick={() => handleDelete(appointment.appointment_id)}
                      className="
                        w-9
                        h-9
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        hover:bg-red-50
                        transition-colors
                        text-red-500
                        cursor-pointer
                      "
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>

                {/* APPOINTMENT INFORMATION */}

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Appointment ID</p>
                    <p
                      className="font-bold text-lg"
                      style={{
                        color: theme.colors.text.primary,
                      }}
                    >
                      #{appointment.appointment_id}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faUserDoctor}
                      className="text-sm"
                      style={{
                        color: theme.colors.primary.main,
                      }}
                    />

                    <div>
                      <p className="text-md text-gray-500">
                        <span className="text-gray-500 font-medium">
                          Doctor:
                        </span>{" "}
                        {appointment.doctor_name || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-sm"
                      style={{
                        color: theme.colors.status.info,
                      }}
                    />

                    <div className="mt-1 mb-2">
                      <p className="text-md text-gray-500">
                        <span className="text-gray-500 font-medium">
                          Patient:
                        </span>{" "}
                        {appointment.patient_name || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>

                      <p className="text-sm font-medium">
                        {appointment.appointment_date || "N/A"} (
                        {appointment.appointment_time || "N/A"})
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* CREATE APPOINTMENT MODAL */}

      <Modal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        title="Add New Appointment"
        maxWidth="max-w-2xl"
      >
        <CreateAppointment
          onCancel={() => setShowAppointmentModal(false)}
          onSuccess={handleAppointmentCreated}
        />
      </Modal>
    </Layout>
  );
};

export default Appointment;
