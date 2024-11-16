import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const EditDepartment = () => {
  const { deptId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [department, setDepartment] = useState({});
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    dept_name: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:8081/department/${deptId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDepartment(res.data), console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch department data");
        console.error(err);
      });
  }, [deptId, token, navigate]);

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
        .patch(`http://localhost:8081/update/department/${deptId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Department updated successfully", res.data);
          alert("Department updated successfully");
        })
        .catch((error) => {
          console.error("Error updating department:", error);
        });
    }
  };

  return (
    <div className="px-24">
      <div className="my-2">
        <Link to="/department">
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </Link>
      </div>
      <div className="flex items-start gap-5">
        <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
          {error && (
            <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full">
              <label htmlFor="dept_name">Department Name</label>
              <input
                onChange={handleChange}
                className="p-3 w-full h-[48px] rounded-[8px] bg-[#FAFAFA] border-l-[1px] border-l-[#009BA9] border-b-[1px] border-b-[#009BA9] focus:outline-none"
                type="text"
                placeholder={department.dept_name}
                name="dept_name"
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
      </div>
    </div>
  );
};
