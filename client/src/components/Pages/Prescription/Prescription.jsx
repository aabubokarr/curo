import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";

import Modal from "../../UI/Modals/Modal";
import CreatePrescription from "./CreatePrescription";
import ViewPrescription from "./ViewPrescription";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faPrescription,
  faUserDoctor,
  faUser,
  faFileMedical,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";

import { motion } from "framer-motion";

export const Prescription = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [prescriptionList, setPrescriptionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const fetchPrescriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const api =
        role === "doctor"
          ? `${API_URL}/prescription/doctor`
          : `${API_URL}/prescription/patient`;

      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPrescriptionList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch prescription data."
      );
    } finally {
      setLoading(false);
    }
  }, [token, role]);

  useEffect(() => {
    if (role === "admin") {
      setLoading(false);
      return;
    }

    fetchPrescriptions();
  }, [fetchPrescriptions, role]);

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowViewModal(true);
  };

  const handlePrescriptionCreated = async () => {
    setShowPrescriptionModal(false);
    await fetchPrescriptions();
  };

  if (role === "admin") {
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
                icon={faPrescription}
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
            Prescriptions
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {role === "doctor"
              ? "Manage and view all prescriptions"
              : "View your prescriptions"}
          </p>
        </div>

        {/* HEADER ACTIONS */}

        <div className="flex items-center gap-4">
          {role === "doctor" && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowPrescriptionModal(true)}
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />

              <span className="hidden sm:inline">Add New Prescription</span>

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
              onClick={fetchPrescriptions}
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

          <p className="text-gray-600">Loading prescriptions...</p>
        </div>
      ) : prescriptionList.length === 0 ? (
        /* EMPTY STATE */

        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-8">
            <FontAwesomeIcon
              icon={faPrescription}
              className="
                text-4xl
                text-gray-400
                mb-4
              "
            />

            <p className="text-lg text-gray-600">No prescriptions found</p>

            {role === "doctor" && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowPrescriptionModal(true)}
                className="mt-4"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add First Prescription
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* PRESCRIPTION GRID */

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
          {prescriptionList.map((prescription, index) => (
            <motion.div
              key={prescription.prescription_id}
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
                  {/* PRESCRIPTION ICON */}

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
                      icon={faPrescription}
                      className="text-xl"
                      style={{
                        color: theme.colors.primary.main,
                      }}
                    />
                  </div>

                  {/* ACTIONS */}

                  <button
                    type="button"
                    onClick={() => handleViewPrescription(prescription)}
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
                    title="View Prescription"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>

                {/* PRESCRIPTION INFORMATION */}

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Prescription ID
                    </p>
                    <p
                      className="font-bold text-lg"
                      style={{
                        color: theme.colors.text.primary,
                      }}
                    >
                      #{prescription.prescription_id}
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faUserDoctor}
                      className="text-sm mt-1"
                      style={{
                        color: theme.colors.primary.main,
                      }}
                    />

                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Doctor</p>

                      <p className="text-sm font-medium">
                        {prescription.doctor_name || "N/A"}
                      </p>

                      {prescription.doctor_id && (
                        <p className="text-xs text-gray-400">
                          ID: {prescription.doctor_id}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-sm mt-1"
                      style={{
                        color: theme.colors.status.info,
                      }}
                    />

                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Patient</p>

                      <p className="text-sm font-medium">
                        {prescription.patient_name || "N/A"}
                      </p>

                      {prescription.patient_id && (
                        <p className="text-xs text-gray-400">
                          ID: {prescription.patient_id}
                        </p>
                      )}
                    </div>
                  </div>

                  {prescription.medicines &&
                    prescription.medicines.length > 0 && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">
                          Medicines
                          <span className="ml-2 text-xs bg-[#009BA9]/10 text-[#009BA9] px-2 py-1 rounded-full">
                            {prescription.medicines.length}
                          </span>
                        </p>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {prescription.medicines
                            .slice(0, 3)
                            .map((medicine, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
                              >
                                {medicine}
                              </span>
                            ))}
                          {prescription.medicines.length > 3 && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-400">
                              +{prescription.medicines.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* CREATE PRESCRIPTION MODAL */}

      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        title="Create New Prescription"
        maxWidth="max-w-2xl"
      >
        <CreatePrescription
          onCancel={() => setShowPrescriptionModal(false)}
          onSuccess={handlePrescriptionCreated}
        />
      </Modal>

      {/* VIEW PRESCRIPTION MODAL */}

      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedPrescription(null);
        }}
        title="Prescription Details"
        maxWidth="max-w-4xl"
      >
        {selectedPrescription && (
          <ViewPrescription
            prescription={selectedPrescription}
            onClose={() => {
              setShowViewModal(false);
              setSelectedPrescription(null);
            }}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Prescription;
