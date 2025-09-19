import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Patient = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [patientList, setPatientList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/patient/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPatientList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch patient data.");
      });
  }, [token]);

  const handleDelete = (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      axios
        .delete(`${API_URL}/patient/delete/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPatientList((prevList) =>
            prevList.filter((patient) => patient.patient_id !== patientId)
          );
          alert("Patient profile deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete patient profile.");
        });
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="pl-3 pr-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Patients</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
            {role === "admin" && (
              <div className="px-5 pb-3">
                <Link
                  to="/create-patient"
                  className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
                >
                  Add New
                </Link>
              </div>
            )}
            <table className="w-full pt-3">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {patientList.map((patient, index) => (
                  <tr
                    key={patient.patient_id}
                    className={`text-center h-[48px] ${
                      index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td>{patient.patient_id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phone_no}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.address}</td>
                    <td>
                      <Link to={`/edit-patient/${patient.patient_id}`}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </td>
                    <td
                      onClick={() => handleDelete(patient.patient_id)}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">You don't have access to this page</div>
        )}
      </div>
    </div>
  );
};
