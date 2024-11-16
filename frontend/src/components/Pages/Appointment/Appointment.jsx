import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export const Appointment = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/list/appointment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppointmentList(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="pl-3 pr-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Appointments</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
          {role === "admin" && (
            <div className="px-5 pb-3">
              <div className="w-[120px] h-[48px] bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white">
                Add New
              </div>
            </div>
          )}
          <table className="w-full pt-3">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Doctor Name</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.map((appointment, index) => (
                <tr
                  key={appointment.appointment_id}
                  className={`text-center h-[48px] ${
                    index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td>{appointment.appointment_id}</td>
                  <td>{appointment.doctor_name}</td>
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_time}</td>
                  <td>
                    <Link>
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                  <td className="cursor-pointer">
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
