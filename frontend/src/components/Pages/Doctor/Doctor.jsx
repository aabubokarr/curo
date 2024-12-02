import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Doctor = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/list/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDoctorList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch doctor data.");
      });
  }, [token]);

  const handleDelete = (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      axios
        .delete(`http://localhost:8081/delete/doctor/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDoctorList((prevList) =>
            prevList.filter((doctor) => doctor.doctor_id !== doctorId)
          );
          alert("Doctor profile deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete doctor profile.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="pl-3 pr-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Doctors</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
            <div className="px-5 pb-3">
              <Link
                to="/create-doctor"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
            <table className="w-full pt-3">
              <thead>
                <tr>
                  <th>Doctor ID</th>
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
                {doctorList.map((doctor, index) => (
                  <tr
                    key={doctor.doctor_id}
                    className={`text-center h-[48px] ${
                      index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td>{doctor.doctor_id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone_no}</td>
                    <td>{doctor.gender}</td>
                    <td>{doctor.address}</td>
                    <td>
                      <Link to={`/edit-doctor/${doctor.doctor_id}`}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </td>
                    <td
                      onClick={() => handleDelete(doctor.doctor_id)}
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
