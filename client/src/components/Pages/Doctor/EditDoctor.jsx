import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/config";

export const EditDoctor = ({ doctor, onSuccess, onCancel }) => {
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

  // Load doctor information into the form
  useEffect(() => {
    if (!doctor) return;

    setFormData({
      name: doctor.name || "",
      email: doctor.email || "",
      phone_no: doctor.phone_no || "",
      address: doctor.address || "",
      password: "",
      gender: doctor.gender || "",
      speciality: doctor.speciality || "",
      dept_id: doctor.dept_id ? String(doctor.dept_id) : "",
      role: doctor.role || "doctor",
    });
  }, [doctor]);

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

    if (!doctor?.doctor_id) {
      setError("Doctor information is missing.");
      return;
    }

    setError("");

    // Password is optional while editing.
    const dataToUpdate = {
      name: formData.name,
      email: formData.email,
      phone_no: formData.phone_no,
      address: formData.address,
      gender: formData.gender,
      speciality: formData.speciality,
      dept_id: formData.dept_id,
      role: formData.role,
    };

    // Only send password if the admin entered a new one
    if (formData.password.trim() !== "") {
      dataToUpdate.password = formData.password;
    }

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phone_no",
      "address",
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

      const response = await axios.patch(
        `${API_URL}/doctor/update/${doctor.doctor_id}`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Doctor updated successfully:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error updating doctor:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to update doctor."
        );
      } else {
        setError("Failed to update doctor due to network error.");
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
          <label
            htmlFor="edit-doctor-name"
            className="text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>

          <input
            id="edit-doctor-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter doctor name"
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-doctor-email"
            className="text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>

          <input
            id="edit-doctor-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter doctor email"
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
            "
          />
        </div>
      </div>

      {/* Phone + Address */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-doctor-phone"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
            id="edit-doctor-phone"
            name="phone_no"
            type="tel"
            value={formData.phone_no}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter phone number"
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-doctor-address"
            className="text-sm font-medium text-gray-700"
          >
            Address <span className="text-red-500">*</span>
          </label>

          <input
            id="edit-doctor-address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter address"
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
            "
          />
        </div>
      </div>

      {/* Password + Gender */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-doctor-password"
            className="text-sm font-medium text-gray-700"
          >
            New Password
          </label>

          <input
            id="edit-doctor-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            placeholder="Leave blank to keep current password"
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-doctor-gender"
            className="text-sm font-medium text-gray-700"
          >
            Gender <span className="text-red-500">*</span>
          </label>

          <select
            id="edit-doctor-gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={loading}
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
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
            htmlFor="edit-doctor-speciality"
            className="text-sm font-medium text-gray-700"
          >
            Speciality <span className="text-red-500">*</span>
          </label>

          <select
            id="edit-doctor-speciality"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            disabled={loading}
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
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
            htmlFor="edit-doctor-department"
            className="text-sm font-medium text-gray-700"
          >
            Department <span className="text-red-500">*</span>
          </label>

          <select
            id="edit-doctor-department"
            name="dept_id"
            value={formData.dept_id}
            onChange={handleChange}
            disabled={loading}
            className="
              h-11 w-full rounded-lg
              border border-gray-300
              bg-white px-3
              text-sm text-gray-800
              outline-none
              transition
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-100
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
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="
            rounded-lg
            border border-gray-300
            bg-white
            px-5 py-2.5
            text-sm font-medium
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
            px-5 py-2.5
            text-sm font-semibold
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
          {loading ? "Updating..." : "Update Doctor"}
        </button>
      </div>
    </form>
  );
};

export default EditDoctor;
