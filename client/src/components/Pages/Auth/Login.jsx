import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../Button/Button";

export const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/auth/login`, formData)
      .then((res) => {
        console.log("Login successful");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        const role = localStorage.getItem("role");

        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "doctor") {
          navigate("/appointment");
        } else {
          navigate("/prescription");
        }
      })
      .catch((error) => {
        console.error("Error while login:", error);
        if (error.response && error.response.data) {
          setError(
            `Failed to login : ${error.response.data.error || "Unknown error"}`
          );
        } else {
          setError("Failed to login due to network error.");
        }
      });
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-[50vw] h-[100vh] bg-[#009BA9] flex items-center justify-center">
        <div>
          <h1 className="text-white text-[40px] font-bold text-center">
            Welcome back
          </h1>
          <img src="images/patient.png" alt="patient" />
        </div>
      </div>
      <div className="w-[50vw] h-[100vh] p-10 flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-center text-[#009BA9] text-[50px] font-bold">
            Login
          </h1>
          {error && (
            <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
              <Button name="LOGIN" />
              <p className="mt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#009BA9]">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
