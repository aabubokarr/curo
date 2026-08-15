import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../../constants/config";

export const EditMedicine = ({ medicine, onSuccess, onCancel }) => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    medicine_name: "",
    medicine_quantity: "",
    medicine_price: "",
  });

  useEffect(() => {
    if (!medicine) {
      return;
    }

    setFormData({
      medicine_name: medicine.medicine_name || "",

      medicine_quantity:
        medicine.medicine_quantity !== null &&
        medicine.medicine_quantity !== undefined
          ? String(medicine.medicine_quantity)
          : "",

      medicine_price:
        medicine.medicine_price !== null &&
        medicine.medicine_price !== undefined
          ? String(medicine.medicine_price)
          : "",
    });
  }, [medicine]);

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

    if (!medicine?.medicine_id) {
      setError("Medicine information is missing.");
      return;
    }

    setError("");

    const requiredFields = [
      "medicine_name",
      "medicine_quantity",
      "medicine_price",
    ];

    const isFormComplete = requiredFields.every(
      (field) => String(formData[field]).trim() !== ""
    );

    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    const dataToUpdate = {
      medicine_name: formData.medicine_name,
      medicine_quantity: formData.medicine_quantity,
      medicine_price: formData.medicine_price,
    };

    const confirmed = window.confirm(
      "Are you sure you want to update this medicine?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `${API_URL}/medicine/update/${medicine.medicine_id}`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Medicine updated successfully:", response.data);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Error updating medicine:", error);

      if (error.response?.data) {
        setError(
          error.response.data.error ||
            error.response.data.message ||
            "Failed to update medicine."
        );
      } else {
        setError("Failed to update medicine due to network error.");
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

      {/* MEDICINE NAME */}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Medicine Name <span className="text-red-500">*</span>
        </label>

        <input
          name="medicine_name"
          type="text"
          value={formData.medicine_name}
          onChange={handleChange}
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
      </div>

      {/* MEDICINE QUANTITY + MEDICINE PRICE */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* MEDICINE QUANTITY */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Medicine Quantity <span className="text-red-500">*</span>
          </label>

          <input
            name="medicine_quantity"
            type="number"
            value={formData.medicine_quantity}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter quantity"
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

        {/* MEDICINE PRICE */}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Medicine Price (TK) <span className="text-red-500">*</span>
          </label>

          <input
            name="medicine_price"
            type="number"
            step="0.01"
            value={formData.medicine_price}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter price"
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
          {loading ? "Updating..." : "Update Medicine"}
        </button>
      </div>
    </form>
  );
};

export default EditMedicine;
