import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const Prescription = () => {
  const token = localStorage.getItem("token");
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch prescriptions for the logged-in doctor
    axios
      .get("http://localhost:8081/list/prescription", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPrescriptionList(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch prescription data.");
      });
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Prescription</h1>
          <Profile />
        </div>
        {error && <div className="bg-red-200 text-red-600 p-2 rounded mb-4">{error}</div>}
        <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
          <div className="px-5 pb-3">
            <Link
              to="/create-prescription"
              className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
            >
              Add New
            </Link>
          </div>
          <table className="w-full pt-3">
            <thead>
              <tr>
                <th>Prescription ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {prescriptionList.map((prescription, index) => (
                <tr
                  key={prescription.prescription_id}
                  className={`text-center h-[48px] ${
                    index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td>{prescription.prescription_id}</td>
                  <td>{prescription.patient_id}</td>
                  <td>{prescription.doctor_id}</td>
                  <td>
                    <Link
                      to={`/edit-prescription/${prescription.prescription_id}`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
