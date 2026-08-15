import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../../constants/config";

export const EditTest = ({ test, onSuccess, onCancel }) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    treatment_id: "",
    test_name: "",
    test_cost: "",
  });

  useEffect(() => {
    if (!test) {
      return;
    }

    setFormData({
      treatment_id:
        test.treatment_id !== null && test.treatment_id !== undefined
          ? String(test.treatment_id)
          : "",

      test_name: test.test_name || "",

      test_cost:
        test.test_cost !== null && test.test_cost !== undefined
          ? String(test.test_cost)
          : "",
    });
  }, [test]);

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

    if (!test?.test_id) {
      setError("Test information is missing.");
      return;
    }

    setError("");

    const requiredFields = ["treatment_id", "test_name", "test_cost"];

    const isFormComplete = requiredFields.every(
      (field) => String(formData[field]).trim() !== ""
    );

    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    const dataToUpdate = {
      treatment_id: formData.treatment_id,
      test_name: formData.test_name,
      test_cost: formData.test_cost,
    };

    const confirmed = window.confirm(
      "Are you sure you want to update this test?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${API_URL}/test/update/${test.test_id}`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Test updated successfully:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error updating test:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to update test."
        );
      } else {
        setError("Failed to update test due to network error.");
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

      {/* TREATMENT ID */}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Treatment ID <span className="text-red-500">*</span>
        </label>

        <input
          name="treatment_id"
          type="number"
          value={formData.treatment_id}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter treatment ID"
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

      {/* TEST NAME + TEST COST */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* TEST NAME */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Test Name <span className="text-red-500">*</span>
          </label>

          <input
            name="test_name"
            type="text"
            value={formData.test_name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter test name"
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

        {/* TEST COST */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Test Cost <span className="text-red-500">*</span>
          </label>

          <input
            name="test_cost"
            type="number"
            step="0.01"
            value={formData.test_cost}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter test cost"
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
          {loading ? "Updating..." : "Update Test"}
        </button>
      </div>
    </form>
  );
};

export default EditTest;
