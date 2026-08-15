import React, { useEffect, useState } from "react";
import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

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

  /* =========================================================
     FETCH PATIENTS
  ========================================================== */

  useEffect(() => {
    if (role !== "admin") {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/patient/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPatientList(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch patients:", err);
        setError("Failed to fetch patient data.");
        setLoading(false);
      });
  }, [token, role]);

  /* =========================================================
     DELETE PATIENT
  ========================================================== */

  const handleDelete = (patientId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmed) {
      return;
    }

    axios
      .delete(`${API_URL}/patient/delete/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setPatientList((prevList) =>
          prevList.filter((patient) => patient.patient_id !== patientId)
        );

        alert("Patient profile deleted successfully.");
      })
      .catch((err) => {
        console.error("Failed to delete patient:", err);
        alert("Failed to delete patient profile.");
      });
  };

  /* =========================================================
     ACCESS DENIED
  ========================================================== */

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

  /* =========================================================
     MAIN PAGE
  ========================================================== */

  return (
    <Layout>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
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
            className="
              text-3xl
              font-bold
              tracking-tight
            "
            style={{
              color: theme.colors.text.primary,
            }}
          >
            Patients
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and view all registered patients
          </p>
        </div>

        {/* Header Actions */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <Link to="/create-patient">
            <Button
              variant="primary"
              size="md"
              className="
                flex
                items-center
                gap-2
                whitespace-nowrap
              "
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />

              <span className="hidden sm:inline">Add New Patient</span>

              <span className="sm:hidden">Add</span>
            </Button>
          </Link>

          <Profile />
        </div>
      </header>

      {/* =====================================================
          ERROR
      ====================================================== */}

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
          <p className="text-red-600 text-sm">{error}</p>
        </Card>
      )}

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-24
          "
        >
          <div
            className="
              animate-spin
              rounded-full
              h-12
              w-12
              border-4
              border-gray-200
              border-t-[#009BA9]
              mb-4
            "
          />

          <p className="text-gray-500">Loading patients...</p>
        </div>
      ) : patientList.length === 0 ? (
        /* ===================================================
           EMPTY STATE
        ==================================================== */

        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-12">
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
                className="
                  text-3xl
                  text-gray-400
                "
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No patients found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first patient.
            </p>

            <Link to="/create-patient" className="mt-6 inline-block">
              <Button variant="primary" size="md">
                Add First Patient
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* ===================================================
           PATIENT GRID
        ==================================================== */

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
                  hover:shadow-xl
                  transition-shadow
                  duration-300
                "
              >
                {/* ==========================================
                    CARD HEADER
                =========================================== */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    mb-5
                  "
                >
                  {/* Patient Avatar */}

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
                    {/* View / Edit */}

                    <Link to={`/edit-patient/${patient.patient_id}`}>
                      <button
                        type="button"
                        className="
                          w-9
                          h-9
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          hover:bg-gray-100
                          transition-colors
                        "
                        style={{
                          color: theme.colors.primary.main,
                        }}
                        title="View/Edit"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </Link>

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
                      "
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                {/* ==========================================
                    PATIENT INFORMATION
                =========================================== */}

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

                  <div
                    className="
                      space-y-1.5
                      text-sm
                    "
                  >
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">ID:</span>{" "}
                      {patient.patient_id}
                    </p>

                    <p
                      className="
                        text-gray-600
                        truncate
                      "
                      title={patient.email}
                    >
                      <span className="font-medium text-gray-700">Email:</span>{" "}
                      {patient.email}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Phone:</span>{" "}
                      {patient.phone_no}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Gender:</span>{" "}
                      {patient.gender}
                    </p>

                    {patient.address && (
                      <p
                        className="
                          text-gray-600
                          truncate
                        "
                        title={patient.address}
                      >
                        <span className="font-medium text-gray-700">
                          Address:
                        </span>{" "}
                        {patient.address}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Patient;
