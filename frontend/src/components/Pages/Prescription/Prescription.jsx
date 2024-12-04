import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const Prescription = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const api =
      role === "doctor"
        ? "http://localhost:8081/list/doctor/prescription"
        : "http://localhost:8081/list/patient/prescription";

    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPrescriptionList(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch prescription data.");
      });
  }, [token, role, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Prescription</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="text-center">You don't have access to this page</div>
        ) : (
          <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
            {role === "doctor" && (
              <div className="px-5 pb-3">
                <Link
                  to="/create-prescription"
                  className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
                >
                  Add New
                </Link>
              </div>
            )}

            {prescriptionList.length === 0 && !error ? (
              <div className="text-center text-gray-500 p-5">
                No prescriptions found.
              </div>
            ) : (
              <table className="w-full pt-3">
                <thead>
                  <tr>
                    <th scope="col">Prescription ID</th>
                    <th scope="col">Patient ID</th>
                    <th scope="col">Doctor ID</th>
                    <th scope="col">View</th>
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
                      <td>{prescription.prescription_id || "N/A"}</td>
                      <td>{prescription.patient_id || "N/A"}</td>
                      <td>{prescription.doctor_id || "N/A"}</td>
                      <td>
                        <Link
                          to={`/view-prescription/${prescription.prescription_id}`}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
