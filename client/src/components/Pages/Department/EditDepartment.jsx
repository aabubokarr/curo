import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../../constants/config";

export const EditDepartment = ({ department, onSuccess, onCancel }) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    dept_name: "",
  });

  useEffect(() => {
    if (!department) {
      return;
    }

    setFormData({
      dept_name: department.dept_name || "",
    });
  }, [department]);

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

    if (!department?.dept_id) {
      setError("Department information is missing.");
      return;
    }

    setError("");

    const departmentName = formData.dept_name.trim();

    if (!departmentName) {
      setError("Please enter a department name.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to update this department?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${API_URL}/department/update/${department.dept_id}`,
        {
          dept_name: departmentName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Department updated successfully:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error updating department:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to update department."
        );
      } else {
        setError("Failed to update department due to network error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* ERROR */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* DEPARTMENT NAME */}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Department Name <span className="text-red-500">*</span>
        </label>

        <input
          name="dept_name"
          type="text"
          value={formData.dept_name}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter department name"
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
          {loading ? "Updating..." : "Update Department"}
        </button>
      </div>
    </form>
  );
};

export default EditDepartment;
