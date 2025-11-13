import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Button, Input, Card } from "../../UI";
import { theme } from "../../../constants/theme";

export const Register = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const isFormComplete = Object.values(formData).every(
      (field) => field !== ""
    );
    if (!isFormComplete) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    axios
      .post(`${API_URL}/auth/register`, formData)
      .then((res) => {
        console.log("Created successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering:", error);
        if (error.response && error.response.data) {
          setError(
            `Failed to register: ${
              error.response.data.error || "Unknown error"
            }`
          );
        } else {
          setError("Failed to register due to network error.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-[#EFF0F6] to-white order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
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
                Register
              </h1>
              <p className="text-gray-600">Create your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="role"
                  className="text-base font-medium"
                  style={{ color: theme.colors.primary.main }}
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#009BA9] focus:ring-[#009BA9] transition-all duration-300"
                  style={{
                    backgroundColor: theme.colors.background.paper,
                    color: theme.colors.text.primary,
                  }}
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Registering..." : "REGISTER"}
                </Button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium hover:underline"
                    style={{ color: theme.colors.primary.main }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div
        className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center p-8 order-1 lg:order-2"
        style={{ backgroundColor: theme.colors.primary.main }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Welcome
          </h1>
          <div className="flex justify-center">
            <img
              src="/images/doctor.png"
              alt="doctor"
              className="max-w-md w-full h-auto"
            />
          </div>
          <p className="text-white text-lg mt-6 opacity-90">
            Join us and start managing healthcare efficiently
          </p>
        </motion.div>
      </div>
    </div>
  );
};
