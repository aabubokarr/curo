import React, { useState } from "react";
import axios from "axios";

import { API_URL } from "../../../constants/config";

export const CreateAppointment = ({ onSuccess, onCancel }) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    doctor_id: "",
    patient_id: "",
    appointment_date: "",
    appointment_time: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const requiredFields = [
      "doctor_id",
      "patient_id",
      "appointment_date",
      "appointment_time",
    ];

    const isFormComplete = requiredFields.every(
      (field) => String(formData[field]).trim() !== ""
    );

    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!token) {
      setError("Authentication token not found. Please login again.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to create this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/appointment/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Appointment created successfully:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to create appointment."
        );
      } else {
        setError("Failed to create appointment due to network error.");
      }
    } finally {
      setLoading(false);
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

      {/* APPOINTMENT DATE + TIME */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* APPOINTMENT DATE */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Appointment Date <span className="text-red-500">*</span>
          </label>

          <input
            name="appointment_date"
            type="date"
            value={formData.appointment_date}
            onChange={handleChange}
            disabled={loading}
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

        {/* APPOINTMENT TIME */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Appointment Time <span className="text-red-500">*</span>
          </label>

          <select
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            disabled={loading}
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
              cursor-pointer
            "
          >
            <option value="">Select Appointment Time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="11:30 AM">11:30 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="12:30 PM">12:30 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="02:30 PM">02:30 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="03:30 PM">03:30 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="04:30 PM">04:30 PM</option>
            <option value="05:00 PM">05:00 PM</option>
          </select>
        </div>
      </div>

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
          {loading ? "Creating..." : "Create Appointment"}
        </button>
      </div>
    </form>
  );
};

export default CreateAppointment;
