import React, { useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CreatePrescription = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    medicines: [],
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMedicine = () => {
    const medicineId = formData.medicine_id;
    if (medicineId && !formData.medicines.includes(medicineId)) {
      setFormData({
        ...formData,
        medicines: [...formData.medicines, medicineId],
        medicine_id: "",
      });
    } else {
      setError("Please enter a valid medicine name.");
    }
  };

  const handleRemoveMedicine = (medicineId) => {
    setFormData({
      ...formData,
      medicines: formData.medicines.filter((id) => id !== medicineId),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to create this prescription?")) {
      axios
        .post("http://localhost:8081/create/prescription", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Prescription created successfully", res.data);
          alert("Prescription created successfully!");
          navigate("/prescription");
        })
        .catch((error) => {
          console.error("Error creating prescription:", error);
          if (error.response && error.response.data) {
            setError(
              `Failed to create prescription : ${
                error.response.data.error || "Unknown error"
              }`
            );
          } else {
            setError("Failed to create prescription due to network error.");
          }
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Create Prescription</h1>
          <Profile />
        </div>
        {role === "doctor" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] p-5">
            {error && (
              <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                  <label htmlFor="doctor_id">Your ID</label>
                  <input
                    onChange={handleChange}
                    className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    type="number"
                    placeholder="Enter Your ID"
                    name="doctor_id"
                  />
                </div>
                <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                  <label htmlFor="patient_id">Patient ID</label>
                  <input
                    onChange={handleChange}
                    className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    type="number"
                    placeholder="Enter Patient ID"
                    name="patient_id"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="medicine_id">Medicine Name</label>
                <div className="flex items-center gap-3">
                  <input
                    onChange={handleChange}
                    className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    type="text"
                    placeholder="Enter Medicine Name"
                    name="medicine_id"
                    value={formData.medicine_id}
                  />
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="mt-2 bg-[#009BA9] text-white text-[20px] w-[50px] rounded p-2"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              {formData.medicines.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-[#009BA9]">Medicines :</h3>
                  <ul>
                    {formData.medicines.map((medicine, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{medicine}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(medicine)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button name="CREATE" />
            </form>
          </div>
        ) : (
          <div className="text-center">You don't have access to this page</div>
        )}
      </div>
    </div>
  );
};
