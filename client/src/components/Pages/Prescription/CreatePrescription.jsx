import React, { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../../../constants/config";

export const CreatePrescription = ({ onSuccess, onCancel }) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    medicines: [],
    medicine_input: "",
  });

  /* =========================================================
     HANDLE CHANGE
  ========================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =========================================================
     ADD MEDICINE
  ========================================================== */

  const handleAddMedicine = () => {
    const medicineName = formData.medicine_input.trim();

    if (!medicineName) {
      setError("Please enter a medicine name.");
      return;
    }

    if (formData.medicines.includes(medicineName)) {
      setError("This medicine is already added.");
      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      medicines: [...previousData.medicines, medicineName],
      medicine_input: "",
    }));

    setError("");
  };

  /* =========================================================
     REMOVE MEDICINE
  ========================================================== */

  const handleRemoveMedicine = (medicineName) => {
    setFormData((previousData) => ({
      ...previousData,
      medicines: previousData.medicines.filter((m) => m !== medicineName),
    }));
  };

  /* =========================================================
     HANDLE SUBMIT
  ========================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const requiredFields = ["patient_id", "doctor_id"];

    const isFormComplete = requiredFields.every(
      (field) => String(formData[field]).trim() !== ""
    );

    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.medicines.length === 0) {
      setError("Please add at least one medicine.");
      return;
    }

    if (!token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to create this prescription?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        patient_id: formData.patient_id,
        doctor_id: formData.doctor_id,
        medicines: formData.medicines,
      };

      const response = await axios.post(
        `${API_URL}/create/prescription`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Prescription created successfully:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error creating prescription:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to create prescription."
        );
      } else {
        setError("Failed to create prescription due to network error.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     HANDLE KEY PRESS
  ========================================================== */

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddMedicine();
    }
  };

  /* =========================================================
     FORM
  ========================================================== */

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* ERROR */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* DOCTOR ID + PATIENT ID */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* DOCTOR ID */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Doctor ID <span className="text-red-500">*</span>
          </label>

          <input
            name="doctor_id"
            type="number"
            value={formData.doctor_id}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter doctor ID"
            className="
              h-11
              w-full
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              text-sm
              text-gray-800
              outline-none
              transition
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:bg-gray-100
            "
          />
        </div>

        {/* PATIENT ID */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Patient ID <span className="text-red-500">*</span>
          </label>

          <input
            name="patient_id"
            type="number"
            value={formData.patient_id}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter patient ID"
            className="
              h-11
              w-full
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              text-sm
              text-gray-800
              outline-none
              transition
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:bg-gray-100
            "
          />
        </div>
      </div>

      {/* MEDICINE INPUT */}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Add Medicines <span className="text-red-500">*</span>
          <span className="text-xs text-gray-400 ml-2">
            (Press Enter or click Add)
          </span>
        </label>

        <div className="flex items-center gap-3">
          <input
            name="medicine_input"
            type="text"
            value={formData.medicine_input}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Enter medicine name"
            className="
              h-11
              w-full
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              text-sm
              text-gray-800
              outline-none
              transition
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:bg-gray-100
            "
          />

          <button
            type="button"
            onClick={handleAddMedicine}
            disabled={loading}
            className="
              h-11
              px-4
              rounded-lg
              bg-[#009BA9]
              text-white
              font-semibold
              transition
              hover:bg-[#008894]
              disabled:opacity-60
              disabled:cursor-not-allowed
              flex
              items-center
              gap-2
            "
          >
            <FontAwesomeIcon icon={faPlus} />
            Add
          </button>
        </div>
      </div>

      {/* MEDICINE LIST */}

      {formData.medicines.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Added Medicines ({formData.medicines.length})
          </h4>

          <div className="flex flex-wrap gap-2">
            {formData.medicines.map((medicine, index) => (
              <span
                key={index}
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white
                  px-3
                  py-1.5
                  rounded-full
                  text-sm
                  text-gray-700
                  border
                  border-gray-200
                  shadow-sm
                "
              >
                {medicine}

                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(medicine)}
                  disabled={loading}
                  className="
                    text-red-500
                    hover:text-red-700
                    transition-colors
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* BUTTONS */}

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="
            rounded-lg
            border
            border-gray-300
            bg-white
            px-5
            py-2.5
            text-sm
            font-medium
            text-gray-700
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-lg
            bg-[#009BA9]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#008894]
            focus:outline-none
            focus:ring-2
            focus:ring-[#009BA9]/30
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Creating..." : "Create Prescription"}
        </button>
      </div>
    </form>
  );
};

export default CreatePrescription;
