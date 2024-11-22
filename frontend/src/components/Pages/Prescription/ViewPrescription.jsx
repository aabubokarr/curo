import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";

export const ViewPrescription = () => {
  const { prescriptionId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [service, setPrescription] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:8081/prescription/${prescriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPrescription(res.data), console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch prescription data");
        console.error(err);
      });
  }, [prescriptionId, token, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">View Prescription</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
          {error && (
            <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <div>Hi</div>
        </div>
      </div>
    </div>
  );
};
