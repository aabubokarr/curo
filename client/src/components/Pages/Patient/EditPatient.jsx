import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/config";

export const EditPatient = ({ patient, onSuccess, onCancel }) => {
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
    blood_group: "",
    dob: "",
    height: "",
    weight: "",
    occupation: "",
    role: "patient",
  });

  useEffect(() => {
    if (!patient) return;

    setFormData({
      name: patient.name || "",
      email: patient.email || "",
      phone_no: patient.phone_no || "",
      address: patient.address || "",
      password: "",
      gender: patient.gender || "",
      blood_group: patient.blood_group || "",
      dob: patient.dob ? String(patient.dob).split("T")[0] : "",
      height:
        patient.height !== null && patient.height !== undefined
          ? String(patient.height)
          : "",
      weight:
        patient.weight !== null && patient.weight !== undefined
          ? String(patient.weight)
          : "",
      occupation: patient.occupation || "",
      role: patient.role || "patient",
    });
  }, [patient]);

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

    if (!patient?.patient_id) {
      setError("Patient information is missing.");
      return;
    }

    setError("");

    const requiredFields = [
      "name",
      "email",
      "phone_no",
      "address",
      "gender",
      "blood_group",
      "dob",
      "height",
      "weight",
      "occupation",
    ];

    const isFormComplete = requiredFields.every(
      (field) => String(formData[field]).trim() !== ""
    );

    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    const dataToUpdate = {
      name: formData.name,
      email: formData.email,
      phone_no: formData.phone_no,
      address: formData.address,
      gender: formData.gender,
      blood_group: formData.blood_group,
      dob: formData.dob,
      height: formData.height,
      weight: formData.weight,
      occupation: formData.occupation,
      role: formData.role,
    };

    // Password is optional when editing
    if (formData.password.trim() !== "") {
      dataToUpdate.password = formData.password;
    }

    const confirmed = window.confirm(
      "Are you sure you want to update this patient?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${API_URL}/patient/update/${patient.patient_id}`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Patient updated successfully:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error updating patient:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to update patient."
        );
      } else {
        setError("Failed to update patient due to network error.");
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
          <label className="text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>

          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter patient name"
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
              disabled:bg-gray-100
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter patient email"
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
              disabled:bg-gray-100
            "
          />
        </div>
      </div>

      {/* Phone + Address */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>

          <input
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
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:bg-gray-100
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>

          <input
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
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:bg-gray-100
            "
          />
        </div>
      </div>

      {/* Password + Gender */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>

          <input
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
              focus:border-[#009BA9]
              focus:ring-2
              focus:ring-[#009BA9]/20
              disabled:bg-gray-100
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>

          <select
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
              disabled:bg-gray-100
            "
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Blood Group + DOB */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Blood Group <span className="text-red-500">*</span>
          </label>

          <select
            name="blood_group"
            value={formData.blood_group}
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
              disabled:bg-gray-100
            "
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <input
            name="dob"
            type="date"
            value={formData.dob}
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
              disabled:bg-gray-100
            "
          />
        </div>
      </div>

      {/* Height + Weight */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Height (CM) <span className="text-red-500">*</span>
          </label>

          <input
            name="height"
            type="number"
            step="0.01"
            value={formData.height}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter height"
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
              disabled:bg-gray-100
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Weight (KG) <span className="text-red-500">*</span>
          </label>

          <input
            name="weight"
            type="number"
            step="0.01"
            value={formData.weight}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter weight"
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
              disabled:bg-gray-100
            "
          />
        </div>
      </div>

      {/* Occupation */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Occupation <span className="text-red-500">*</span>
        </label>

        <input
          name="occupation"
          type="text"
          value={formData.occupation}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter occupation"
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
            disabled:bg-gray-100
          "
        />
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
          {loading ? "Updating..." : "Update Patient"}
        </button>
      </div>
    </form>
  );
};

export default EditPatient;
