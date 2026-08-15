import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";

import Modal from "../../UI/Modals/Modal";
import CreatePatient from "./CreatePatient";
import EditPatient from "./EditPatient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";

import { motion } from "framer-motion";

export const Patient = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [patientList, setPatientList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/patient/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatientList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch patients:", error);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch patient data."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (role !== "admin") {
      setLoading(false);
      return;
    }

    fetchPatients();
  }, [fetchPatients, role]);

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handlePatientUpdated = async () => {
    setShowEditModal(false);
    setSelectedPatient(null);

    await fetchPatients();
  };

  const handleDelete = async (patientId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/patient/delete/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatientList((previousList) =>
        previousList.filter((patient) => patient.patient_id !== patientId)
      );

      alert("Patient profile deleted successfully.");
    } catch (error) {
      console.error("Failed to delete patient:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete patient profile."
      );
    }
  };

  const handlePatientCreated = async () => {
    setShowPatientModal(false);

    await fetchPatients();
  };

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
            Patients
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage and view all registered patients
          </p>
        </div>

        {/* Header Actions */}

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowPatientModal(true)}
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />

            <span className="hidden sm:inline">Add New Patient</span>

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
              onClick={fetchPatients}
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

          <p className="text-gray-600">Loading patients...</p>
        </div>
      ) : patientList.length === 0 ? (
        /* Empty State */

        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-8">
            <FontAwesomeIcon
              icon={faUser}
              className="
                text-4xl
                text-gray-400
                mb-4
              "
            />

            <p className="text-lg text-gray-600">No patients found</p>

            <Button
              variant="primary"
              size="md"
              onClick={() => setShowPatientModal(true)}
              className="mt-4"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add First Patient
            </Button>
          </div>
        </Card>
      ) : (
        /* Patient Grid */

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
          {patientList.map((patient, index) => (
            <motion.div
              key={patient.patient_id}
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
                {/* Card Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  {/* Patient Icon */}

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
                      icon={faUser}
                      className="text-xl"
                      style={{
                        color: theme.colors.status.info,
                      }}
                    />
                  </div>

                  {/* Actions */}

                  <div className="flex gap-2">
                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() => handleEditPatient(patient)}
                      className="
                        w-9
                        h-9
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

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() => handleDelete(patient.patient_id)}
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
                  </div>
                </div>

                {/* Patient Information */}

                <div className="space-y-2">
                  <h3
                    className="
                      font-bold
                      text-lg
                      truncate
                    "
                    style={{
                      color: theme.colors.text.primary,
                    }}
                    title={patient.name}
                  >
                    {patient.name}
                  </h3>

                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">ID:</span>{" "}
                      {patient.patient_id}
                    </p>

                    <p className="text-gray-600 truncate" title={patient.email}>
                      <span className="font-medium">Email:</span>{" "}
                      {patient.email}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {patient.phone_no}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Gender:</span>{" "}
                      {patient.gender}
                    </p>

                    {patient.blood_group && (
                      <p className="text-gray-600">
                        <span className="font-medium">Blood Group:</span>{" "}
                        {patient.blood_group}
                      </p>
                    )}

                    {patient.address && (
                      <p
                        className="text-gray-600 truncate"
                        title={patient.address}
                      >
                        <span className="font-medium">Address:</span>{" "}
                        {patient.address}
                      </p>
                    )}

                    {patient.occupation && (
                      <p className="text-gray-600">
                        <span className="font-medium">Occupation:</span>{" "}
                        {patient.occupation}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        title="Add New Patient"
        maxWidth="max-w-3xl"
      >
        <CreatePatient
          onCancel={() => setShowPatientModal(false)}
          onSuccess={handlePatientCreated}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPatient(null);
        }}
        title="Edit Patient"
        maxWidth="max-w-3xl"
      >
        {selectedPatient && (
          <EditPatient
            patient={selectedPatient}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedPatient(null);
            }}
            onSuccess={handlePatientUpdated}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Patient;
