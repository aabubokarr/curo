import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Department = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/department/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDepartmentList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch department data.");
      });
  }, [token]);

  const handleDelete = (deptId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios
        .delete(`${API_URL}/department/delete/${deptId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDepartmentList((prevList) =>
            prevList.filter((department) => department.dept_id !== deptId)
          );
          alert("Department profile deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete department profile.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="pl-3 pr-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Departments</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
            <div className="px-5 pb-3">
              <Link
                to="/create-department"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
            <table className="w-full pt-3">
              <thead>
                <tr>
                  <th>Department ID</th>
                  <th>Name</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {departmentList.map((department, index) => (
                  <tr
                    key={department.dept_id}
                    className={`text-center h-[48px] ${
                      index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td>{department.dept_id}</td>
                    <td>{department.dept_name}</td>
                    <td>
                      <Link to={`/edit-department/${department.dept_id}`}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </td>
                    <td
                      onClick={() => handleDelete(department.dept_id)}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">You don't have access to this page</div>
        )}
      </div>
    </div>
  );
};
