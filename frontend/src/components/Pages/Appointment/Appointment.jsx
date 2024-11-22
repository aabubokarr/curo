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
    const api =
      role === "admin"
        ? "http://localhost:8081/list/appointment"
        : "http://localhost:8081/list/appointment/doctor";

    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppointmentList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching initial data:", err);
      });
  }, [token, role]);

  const handleDelete = (appId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete(`http://localhost:8081/delete/appointment/${appId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAppointmentList((prevList) =>
            prevList.filter(
              (appointment) => appointment.appointment_id !== appId
            )
          );
          alert("Appointment deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete appointment.");
        });
    }
  };

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
              <Link
                to="/create-appointment"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
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
                {role === "admin" && <th>Delete</th>}
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
                  {role === "admin" && (
                    <td
                      onClick={() => handleDelete(appointment.appointment_id)}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
