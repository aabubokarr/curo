import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export const Medicine = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/list/medicine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMedicineList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch medicine data.");
      });
  }, [token]);

  const handleDelete = (medicineId) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      axios
        .delete(`http://localhost:8081/delete/medicine/${medicineId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMedicineList((prevList) =>
            prevList.filter((medicine) => medicine.medicine_id !== medicineId)
          );
          alert("Medicine deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete medicine.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Medicine</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
          {role === "admin" && (
            <div className="px-5 pb-3">
              <Link
                to="/create-medicine"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
          )}
          <table className="w-full pt-3">
            <thead>
              <tr>
                <th>Medicine ID</th>
                <th>Medicine Name</th>
                <th>Medicine Quantity</th>
                <th>Medicine Price</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {medicineList.map((medicine, index) => (
                <tr
                  key={medicine.medicine_id}
                  className={`text-center h-[48px] ${
                    index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td>{medicine.medicine_id}</td>
                  <td>{medicine.medicine_name}</td>
                  <td>{medicine.medicine_quantity}</td>
                  <td>{medicine.medicine_price} TK</td>
                  <td>
                    <Link to={`/edit-medicine/${medicine.medicine_id}`}>
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                  <td
                    onClick={() => handleDelete(medicine.medicine_id)}
                    className="cursor-pointer"
                  >
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
