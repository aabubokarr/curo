import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Button, Input, Card } from "../../UI";
import { theme } from "../../../constants/theme";

export const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
            `Failed to login: ${error.response.data.error || "Unknown error"}`
          );
        } else {
          setError("Failed to login due to network error.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image/Illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center p-8"
        style={{ backgroundColor: theme.colors.primary.main }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Welcome back
          </h1>
          <div className="flex justify-center">
            <img
              src="/images/patient.png"
              alt="patient"
              className="max-w-md w-full h-auto"
            />
          </div>
          <p className="text-white text-lg mt-6 opacity-90">
            Sign in to continue your healthcare journey
          </p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-[#EFF0F6] to-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card padding="lg" shadow="lg" className="w-full">
            <div className="text-center mb-8">
              <h1
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: theme.colors.primary.main }}
              >
                Login
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "LOGIN"}
                </Button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium hover:underline"
                    style={{ color: theme.colors.primary.main }}
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
