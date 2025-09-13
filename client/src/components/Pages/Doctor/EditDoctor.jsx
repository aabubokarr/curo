import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IdCard from "../../Profile/IdCard";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import Button from "../../Button/Button";

export const EditDoctor = () => {
  const { doctorId } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    password: "",
    gender: "",
    speciality: "",
    dept_id: "",
    role: "doctor",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/doctor/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDoctor(res.data), console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch doctor data");
        console.error(err);
      });
  }, [doctorId, token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormComplete = Object.values(formData).some(
      (field) => field !== ""
    );
    if (!isFormComplete) {
      setError("Please fill in at least one required field.");
      return;
    }

    if (window.confirm("Are you sure you want to update info?")) {
      console.log(formData);

      axios
        .patch(`http://localhost:8081/update/doctor/${doctorId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Doctor updated successfully", res.data);
          alert("Doctor updated successfully");
        })
        .catch((error) => {
          console.error("Error updating doctor:", error);
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Edit Doctor</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="flex gap-3">
            <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
              {error && (
                <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="name">Name</label>
                    <input
                      onChange={handleChange}
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                      type="text"
                      placeholder={doctor.name}
                      name="name"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={handleChange}
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                      type="email"
                      placeholder={doctor.email}
                      name="email"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="phone_no">Phone No.</label>
                    <input
                      onChange={handleChange}
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                      type="text"
                      placeholder={doctor.phone_no}
                      name="phone_no"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="address">Address</label>
                    <input
                      onChange={handleChange}
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                      type="text"
                      placeholder={doctor.address}
                      name="address"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={handleChange}
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                      type="password"
                      placeholder="**** ****"
                      name="password"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="gender">Gender</label>
                    <select
                      onChange={handleChange}
                      name="gender"
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    >
                      <option>{doctor.gender}</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="speciality">Speciality</label>
                    <select
                      onChange={handleChange}
                      name="speciality"
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    >
                      <option>{doctor.speciality}</option>
                      <option value="Opthalmologist">Opthalmologist</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Radiologist">Radiologist</option>
                      <option value="Oncologist">Oncologist</option>
                      <option value="Psychiatrist">Psychiatrist</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                    <label htmlFor="dept_id">Department Name</label>
                    <select
                      onChange={handleChange}
                      name="dept_id"
                      className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                    >
                      <option>{doctor.dept_name}</option>
                      <option value="1">Opthalmology</option>
                      <option value="2">Cardiology</option>
                      <option value="3">Radiology</option>
                      <option value="4">Oncology</option>
                      <option value="5">Psychiatry</option>
                    </select>
                  </div>
                </div>
                <Button name="UPDATE" />
              </form>
            </div>
            <IdCard
              name={doctor.name}
              role={doctor.role}
              id={doctor.doctor_id}
              speciality={doctor.speciality}
            />
          </div>
        ) : (
          <div className="text-center">You don't have access to this page</div>
        )}
      </div>
    </div>
  );
};
