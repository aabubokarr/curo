import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";

import Modal from "../../UI/Modals/Modal";
import CreateMedicine from "./CreateMedicine";
import EditMedicine from "./EditMedicine";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faPills,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";

import { motion } from "framer-motion";

export const Medicine = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [medicineList, setMedicineList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/medicine/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMedicineList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch medicine data."
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

    fetchMedicines();
  }, [fetchMedicines, role]);

  const handleEditMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setShowEditModal(true);
  };

  const handleMedicineUpdated = async () => {
    setShowEditModal(false);
    setSelectedMedicine(null);

    await fetchMedicines();
  };

  const handleDelete = async (medicineId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/medicine/delete/${medicineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMedicineList((previousList) =>
        previousList.filter((medicine) => medicine.medicine_id !== medicineId)
      );

      alert("Medicine deleted successfully.");
    } catch (error) {
      console.error("Failed to delete medicine:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete medicine."
      );
    }
  };

  const handleMedicineCreated = async () => {
    setShowMedicineModal(false);

    await fetchMedicines();
  };

  if (role !== "admin") {
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
                icon={faPills}
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
            Medicines
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage and view all available medicines
          </p>
        </div>

        {/* HEADER ACTIONS */}

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowMedicineModal(true)}
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />

            <span className="hidden sm:inline">Add New Medicine</span>

            <span className="sm:hidden">Add</span>
          </Button>

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
              onClick={fetchMedicines}
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

          <p className="text-gray-600">Loading medicines...</p>
        </div>
      ) : medicineList.length === 0 ? (
        /* EMPTY STATE */

        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-8">
            <FontAwesomeIcon
              icon={faPills}
              className="
                text-4xl
                text-gray-400
                mb-4
              "
            />

            <p className="text-lg text-gray-600">No medicines found</p>

            <Button
              variant="primary"
              size="md"
              onClick={() => setShowMedicineModal(true)}
              className="mt-4"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add First Medicine
            </Button>
          </div>
        </Card>
      ) : (
        /* MEDICINE GRID */

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
          {medicineList.map((medicine, index) => (
            <motion.div
              key={medicine.medicine_id}
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
                  {/* MEDICINE ICON */}

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
                      backgroundColor: theme.colors.status.warning + "20",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPills}
                      className="text-xl"
                      style={{
                        color: theme.colors.status.warning,
                      }}
                    />
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2">
                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() => handleEditMedicine(medicine)}
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

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() => handleDelete(medicine.medicine_id)}
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

                {/* MEDICINE INFORMATION */}

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
                    title={medicine.medicine_name}
                  >
                    {medicine.medicine_name}
                  </h3>

                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">ID:</span>{" "}
                      {medicine.medicine_id}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Quantity:</span>{" "}
                      {medicine.medicine_quantity}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Unit Price:</span>{" "}
                      {medicine.medicine_price} TK
                    </p>

                    <p className="text-gray-600 font-semibold">
                      <span className="font-medium">Total:</span>{" "}
                      {medicine.total} TK
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* CREATE MEDICINE MODAL */}

      <Modal
        isOpen={showMedicineModal}
        onClose={() => setShowMedicineModal(false)}
        title="Add New Medicine"
        maxWidth="max-w-2xl"
      >
        <CreateMedicine
          onCancel={() => setShowMedicineModal(false)}
          onSuccess={handleMedicineCreated}
        />
      </Modal>

      {/* EDIT MEDICINE MODAL */}

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedMedicine(null);
        }}
        title="Edit Medicine"
        maxWidth="max-w-2xl"
      >
        {selectedMedicine && (
          <EditMedicine
            medicine={selectedMedicine}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedMedicine(null);
            }}
            onSuccess={handleMedicineUpdated}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Medicine;
