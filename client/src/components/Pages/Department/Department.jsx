import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faBuilding, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";
import { motion } from "framer-motion";

export const Department = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/department/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDepartmentList(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch department data.");
        setLoading(false);
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
          alert("Department deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete department.");
        });
    }
  };

  if (role !== "admin") {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Card padding="lg" className="text-center">
            <p className="text-lg text-gray-600">You don't have access to this page</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="sticky top-0 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#EFF0F6] z-10 py-4 mb-6 rounded-lg px-4 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold" style={{ color: theme.colors.text.primary }}>
            Departments
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/create-department">
              <Button variant="primary" size="md" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                <span className="hidden sm:inline">Add New Department</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </Link>
            <Profile />
          </div>
        </div>

        {error && (
          <Card padding="md" className="mb-6 bg-red-50 border border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009BA9] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading departments...</p>
          </div>
        ) : departmentList.length === 0 ? (
          <Card padding="lg" className="text-center">
            <FontAwesomeIcon icon={faBuilding} className="text-4xl text-gray-400 mb-4" />
            <p className="text-lg text-gray-600">No departments found</p>
            <Link to="/create-department" className="mt-4 inline-block">
              <Button variant="primary" size="md">Add First Department</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {departmentList.map((department, index) => (
              <motion.div
                key={department.dept_id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card padding="lg" shadow="md" className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.primary.main + "20" }}>
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="text-xl"
                        style={{ color: theme.colors.primary.main }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/edit-department/${department.dept_id}`}>
                        <button
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                          style={{ color: theme.colors.primary.main }}
                          title="View/Edit"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(department.dept_id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors text-red-500"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg" style={{ color: theme.colors.text.primary }}>
                      {department.dept_name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">ID:</span> {department.dept_id}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
