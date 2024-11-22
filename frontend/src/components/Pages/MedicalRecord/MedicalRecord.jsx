import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const MedicalRecord = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/list/medical_record", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecordList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch medical record data.");
      });
  }, [token]);

  const handleDelete = (recordId) => {
    if (window.confirm("Are you sure you want to delete this medical record?")) {
      axios
        .delete(`http://localhost:8081/delete/medical_record/${recordId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRecordList((prevList) =>
            prevList.filter((record) => record.record_id !== recordId)
          );
          alert("Medical record profile deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete medical record profile.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Medical Record</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
          {role === "admin" && (
            <div className="px-5 pb-3">
              <Link
                to="/create-record"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
          )}
          <table className="w-full pt-3">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {recordList.map((record, index) => (
                <tr
                  key={record.record_id}
                  className={`text-center h-[48px] ${
                    index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td>{record.record_id}</td>
                  <td>{record.patient_id}</td>
                  <td>{record.doctor_id}</td>
                  <td>
                    <Link to={`/edit-record/${record.record_id}`}>
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                  <td
                    onClick={() => handleDelete(record.record_id)}
                    className="cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
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
