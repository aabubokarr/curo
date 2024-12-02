import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../Button/Button";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isFormComplete = Object.values(formData).every(
      (field) => field !== ""
    );
    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      return;
    }

    axios
      .post("http://localhost:8081/register", formData)
      .then((res) => {
        console.log("Created successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error registering:", error);
        if (error.response && error.response.data) {
          setError(
            `Failed to register : ${
              error.response.data.error || "Unknown error"
            }`
          );
        } else {
          setError("Failed to register due to network error.");
        }
      });
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-full md:w-[50vw] h-full p-10 flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-center text-[#009BA9] text-[50px] font-bold">
            Register
          </h1>
          {error && (
            <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form className="flex flex-col gap-3" onSubmit={handleRegister}>
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="name">Name</label>
                <input
                  onChange={handleChange}
                  value={formData.name}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#EFF0F6] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  className="p-3 w-full h-[48px] rounded-[8px] bg-[#EFF0F6] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                value={formData.password}
                className="p-3 w-full h-[48px] rounded-[8px] bg-[#EFF0F6] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                type="password"
                placeholder="Enter Your Password"
                name="password"
              />
            </div>
            <div>
              <Button name="REGISTER" />
              <p className="mt-2">
                Already have an account?{" "}
                <Link to="/" className="text-[#009BA9]">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-[50vw] h-[100vh] bg-[#009BA9] flex items-center justify-center">
        <div>
          <h1 className="text-white text-[40px] font-bold text-center">
            Welcome
          </h1>
          <img src="img/doctor.png" alt="doctor" />
        </div>
      </div>
    </div>
  );
};
