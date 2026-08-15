import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";
import axios from "axios";

import Modal from "../../UI/Modals/Modal";
import CreateDoctor from "./CreateDoctor";
import EditDoctor from "./EditDoctor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faUserDoctor,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";
import { motion } from "framer-motion";

export const Doctor = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // FETCH DOCTORS

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/doctor/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctorList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch doctor data."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  // LOAD DOCTORS

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // UPDATE DOCTOR

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowEditModal(true);
  };

  const handleDoctorUpdated = async () => {
    setShowEditModal(false);
    setSelectedDoctor(null);

    await fetchDoctors();
  };

  // DELETE DOCTOR

  const handleDelete = async (doctorId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/doctor/delete/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctorList((previousList) =>
        previousList.filter((doctor) => doctor.doctor_id !== doctorId)
      );

      alert("Doctor profile deleted successfully.");
    } catch (error) {
      console.error("Failed to delete doctor:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete doctor profile."
      );
    }
  };

  // DOCTOR CREATED SUCCESSFULLY

  const handleDoctorCreated = async () => {
    setShowDoctorModal(false);

    // Refresh doctor list
    await fetchDoctors();
  };

  // ACCESS CONTROL

  if (role !== "admin") {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
          <Card padding="lg" shadow="lg" className="text-center">
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
      {/* Header */}

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
        {/* Page Title */}
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{
              color: theme.colors.text.primary,
            }}
          >
            Doctors
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage doctors and medical professionals
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowDoctorModal(true)}
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />

            <span className="hidden sm:inline">Add New Doctor</span>

            <span className="sm:hidden">Add</span>
          </Button>

          <Profile />
        </div>
      </div>

      {/* Error */}

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
              onClick={fetchDoctors}
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

      {/* Loading */}

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

          <p className="text-gray-600">Loading doctors...</p>
        </div>
      ) : doctorList.length === 0 ? (
        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-8">
            <FontAwesomeIcon
              icon={faUserDoctor}
              className="
                text-4xl
                text-gray-400
                mb-4
              "
            />

            <p className="text-lg text-gray-600">No doctors found</p>

            <Button
              variant="primary"
              size="md"
              onClick={() => setShowDoctorModal(true)}
              className="mt-4"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add First Doctor
            </Button>
          </div>
        </Card>
      ) : (
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
          {doctorList.map((doctor, index) => (
            <motion.div
              key={doctor.doctor_id}
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
                {/* Card Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  {/* Doctor Icon */}
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
                      backgroundColor: theme.colors.primary.main + "20",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUserDoctor}
                      className="text-xl"
                      style={{
                        color: theme.colors.primary.main,
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-between">
                    <button
                      type="button"
                      onClick={() => handleEditDoctor(doctor)}
                      className="
                          w-7
                          h-7
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          hover:bg-gray-100
                          transition-colors
                          cursor-pointer
                        "
                      style={{
                        color: theme.colors.primary.main,
                      }}
                      title="View/Edit"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(doctor.doctor_id)}
                      className="
                        w-7
                        h-7
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
                  </div>
                </div>

                {/* Doctor Information */}

                <div className="space-y-2">
                  <h3
                    className="font-bold text-lg"
                    style={{
                      color: theme.colors.text.primary,
                    }}
                  >
                    {doctor.name}
                  </h3>

                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">ID:</span>{" "}
                      {doctor.doctor_id}
                    </p>

                    <p
                      className="
                        text-gray-600
                        truncate
                      "
                      title={doctor.email}
                    >
                      <span className="font-medium">Email:</span> {doctor.email}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {doctor.phone_no}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Gender:</span>{" "}
                      {doctor.gender}
                    </p>

                    {doctor.speciality && (
                      <p className="text-gray-600">
                        <span className="font-medium">Speciality:</span>{" "}
                        {doctor.speciality}
                      </p>
                    )}

                    {doctor.dept_name && (
                      <p className="text-gray-600">
                        <span className="font-medium">Department:</span>{" "}
                        {doctor.dept_name}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Doctor Modal */}

      <Modal
        isOpen={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        title="Add New Doctor"
        maxWidth="max-w-3xl"
      >
        <CreateDoctor
          onCancel={() => setShowDoctorModal(false)}
          onSuccess={handleDoctorCreated}
        />
      </Modal>

      {/* Edit Doctor Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedDoctor(null);
        }}
        title="Edit Doctor"
        maxWidth="max-w-3xl"
      >
        {selectedDoctor && (
          <EditDoctor
            doctor={selectedDoctor}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedDoctor(null);
            }}
            onSuccess={handleDoctorUpdated}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Doctor;
