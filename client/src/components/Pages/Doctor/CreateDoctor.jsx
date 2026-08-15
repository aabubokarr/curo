import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/config";

export const CreateDoctor = ({ onSuccess, onCancel }) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    password: "",
    gender: "",
    speciality: "",
    dept_id: "",
    role: "doctor",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts editing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validate form
    const requiredFields = [
      "name",
      "email",
      "phone_no",
      "address",
      "password",
      "gender",
      "speciality",
      "dept_id",
    ];

    const isFormComplete = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/doctor/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Doctor created successfully:", response.data);

      // Tell Doctor.jsx that creation was successful
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error creating doctor:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to create doctor."
        );
      } else {
        setError("Failed to create doctor due to network error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter doctor name"
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
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter doctor email"
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
            "
          />
        </div>
      </div>

      {/* Phone + Address */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone_no"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            id="phone_no"
            name="phone_no"
            type="text"
            value={formData.phone_no}
            onChange={handleChange}
            placeholder="Enter phone number"
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
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Address <span className="text-red-500">*</span>
          </label>

          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
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
            "
          />
        </div>
      </div>

      {/* Password + Gender */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password <span className="text-red-500">*</span>
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
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
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>

          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
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
            "
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Speciality + Department */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="speciality"
            className="text-sm font-medium text-gray-700"
          >
            Speciality <span className="text-red-500">*</span>
          </label>

          <select
            id="speciality"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
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
            "
          >
            <option value="">Select Speciality</option>
            <option value="Opthalmologist">Opthalmologist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Radiologist">Radiologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="dept_id"
            className="text-sm font-medium text-gray-700"
          >
            Department <span className="text-red-500">*</span>
          </label>

          <select
            id="dept_id"
            name="dept_id"
            value={formData.dept_id}
            onChange={handleChange}
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
            "
          >
            <option value="">Select Department</option>
            <option value="1">Opthalmology</option>
            <option value="2">Cardiology</option>
            <option value="3">Radiology</option>
            <option value="4">Oncology</option>
            <option value="5">Psychiatry</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
        {/* Cancel */}
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
          focus:outline-none
          focus:ring-2
          focus:ring-gray-200
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        >
          Cancel
        </button>

        {/* Create Doctor */}
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
          {loading ? "Creating..." : "Create Doctor"}
        </button>
      </div>
    </form>
  );
};

export default CreateDoctor;
