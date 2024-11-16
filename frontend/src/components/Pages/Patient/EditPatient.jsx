import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import IdCard from "../../Profile/IdCard";

export const EditPatient = () => {
  const { patientId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    password: "",
    gender: "",
    blood_group: "",
    dob: "",
    height: "",
    weight: "",
    occupation: "",
    role: "patient",
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:8081/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPatient(res.data), console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch patient data");
        console.error(err);
      });
  }, [patientId, token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (window.confirm("Are you sure you want to update info?")) {
      axios
        .patch(`http://localhost:8081/update/patient/${patientId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Patient updated successfully", res.data),
            alert("Patient profile updated successfully");
        })
        .catch((error) => {
          console.error("Error updating patient:", error);
        });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-24">
      <div className="my-2">
        <Link to="/patient">
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </Link>
      </div>
      <div className="flex items-start gap-5">
        <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="name">Name</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.name}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.email}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px]                   border-b-[#009BA9] focus:outline-none"
                  type="email"
                  name="email"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="phone_no">Phone No.</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.phone_no}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  name="phone_no"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="address">Address</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.address}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  name="address"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="password">Password</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.password}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="password"
                  name="password"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="gender">Gender</label>
                <select
                  onChange={handleChange}
                  placeholder={patient.gender}
                  name="gender"
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                >
                  <option value="">{patient.gender}</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="blood_group">Blood Group</label>
                <select
                  onChange={handleChange}
                  placeholder={patient.blood_group}
                  name="blood_group"
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                >
                  <option value="">{patient.blood_group}</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.dob}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="date"
                  name="dob"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="height">Height (CM)</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.height}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="number"
                  step="0.01"
                  name="height"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="weight">Weight (KG)</label>
                <input
                  onChange={handleChange}
                  placeholder={patient.weight}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="number"
                  name="weight"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
              <label htmlFor="occupation">Occupation</label>
              <input
                onChange={handleChange}
                placeholder={patient.occupation}
                className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                type="text"
                name="occupation"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full h-[48px] bg-[#009BA9] flex items-center justify-center text-[16px] text-white font-bold rounded-lg"
            >
              Update
            </button>
          </form>
        </div>
        <IdCard
          name={patient.name}
          role={patient.role}
          id={patient.patient_id}
          speciality={patient.occupation}
        />
      </div>
    </div>
  );
};
