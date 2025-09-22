import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export const Test = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/test/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTestList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch test data.");
      });
  }, [token]);

  const handleDelete = (testId) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      axios
        .delete(`${API_URL}/test/delete/${testId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTestList((prevList) =>
            prevList.filter((test) => test.test_id !== testId)
          );
          alert("Test deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete test.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Tests</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
            <div className="px-5 pb-3">
              <Link
                to="/create-test"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
            <table className="w-full pt-3">
              <thead>
                <tr>
                  <th>Treatment ID</th>
                  <th>Test Name</th>
                  <th>Test Cost</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {testList.map((test, index) => (
                  <tr
                    key={test.test_id}
                    className={`text-center h-[48px] ${
                      index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td>{test.treatment_id}</td>
                    <td>{test.test_name}</td>
                    <td>{test.test_cost}</td>
                    <td>
                      <Link to={`/edit-test/${test.test_id}`}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </td>
                    <td
                      onClick={() => handleDelete(test.test_id)}
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
