import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/login", formData)
      .then((res) => {
        console.log("Login successful");
        navigate("/dashboard");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError("Invalid email or password");
        } else {
          console.log(err);
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
          <img src="img/patient.png" alt="patient" />
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
              <button
                type="submit"
                className="mt-2 w-full h-[48px] bg-[#009BA9] flex items-center justify-center text-[16px] text-white font-bold rounded-lg"
              >
                Login
              </button>
              <div className="mt-2 flex items-center justify-between">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-[#009BA9]">
                    Sign Up
                  </Link>
                </p>
                <Link
                  to="/"
                  className="text-[14px] border-[1px] bg-[#009BA9] text-white rounded-lg p-1"
                >
                  Go back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
