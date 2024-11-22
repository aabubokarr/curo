import React, { useState, useEffect } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Bill = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [billList, setBillList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/list/bill", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBillList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch bill data.");
      });
  }, [token]);

  const handleDelete = (billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      axios
        .delete(`http://localhost:8081/delete/bill/${billId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setBillList((prevList) =>
            prevList.filter((bill) => bill.bill_id !== billId)
          );
          alert("Bill deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete bill.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Bills</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
          {role === "admin" && (
            <div className="px-5 pb-3">
              <Link
                to="/create-bill"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
          )}
          <table className="w-full pt-3">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Patient ID</th>
                <th> Amount </th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {billList.map((bill, index) => (
                <tr
                  key={bill.bill_id}
                  className={`text-center h-[48px] ${
                    index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td>{bill.bill_id}</td>
                  <td>{bill.patient_id}</td>
                  <td>{bill.amount}</td>
                  <td>
                    <Link>
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                  <td className="cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
