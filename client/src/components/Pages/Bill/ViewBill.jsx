import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import html2pdf from "html2pdf.js";
import Button from "../../Button/Button";

export const ViewBill = () => {
  const { billId } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [bill, setBill] = useState({});
  const [error, setError] = useState("");
  const today = new Date();
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8081/bill/${billId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBill(res.data), console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch bill data");
        console.error(err);
      });
  }, [billId, token, navigate]);

  const handleDownload = (e) => {
    e.preventDefault();
    const downloadBill = document.getElementById("downloadBill");

    const options = {
      margin: 1,
      filename: "bill.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(downloadBill).set(options).save();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">View Bill</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
            {error && (
              <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleDownload}>
              <div id="downloadBill" className="flex flex-col gap-3">
                <div className="flex flex-col items-center justify-between bg-[#009BA9] rounded-lg p-3">
                  <div className="bg-white cursor-pointer w-[60px] h-[50px] rounded-[100px] flex items-center justify-center my-3 border-[.5px] border-[#c4c4c4]">
                    <div className="flex items-center">
                      <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
                      <div className="w-[20px] h-[5px] bg-black"></div>
                      <div className="w-[15px] h-[15px] rounded-[100px] bg-black"></div>
                    </div>
                  </div>
                  <h1 className="text-[28px] text-white font-bold">
                    Patient and Treatment Management
                  </h1>
                  <p className="text-[#e5e5e5]">
                    Plot : 15, Block : B, Bashundhara, Dhaka-1229, Bangladesh
                  </p>
                  <p className="text-[#e5e5e5]">Helpline : 16667</p>
                </div>
                <h1>Date : {date}</h1>
                <div>
                  <h1>Patient : {bill.patient_name}</h1>
                  <h1>Doctor : {bill.doctor_name}</h1>
                </div>
                <table className="w-full my-5">
                  <thead>
                    <tr>
                      <th className="border-[.5px] border-[#c4c4c4]">No.</th>
                      <th className="border-[.5px] border-[#c4c4c4]">Names</th>
                      <th className="border-[.5px] border-[#c4c4c4]">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center h-[48px]">
                      <td className="border-[.5px] border-[#c4c4c4]">1</td>
                      <td className="border-[.5px] border-[#c4c4c4]">
                        {bill.service_names} (Service)
                      </td>
                      <td className="border-[.5px] border-[#c4c4c4]">
                        {bill.total_service_cost}
                      </td>
                    </tr>
                    <tr className="text-center h-[48px]">
                      <td className="border-[.5px] border-[#c4c4c4]">2</td>
                      <td className="border-[.5px] border-[#c4c4c4]">
                        {bill.test_names} (Test)
                      </td>
                      <td className="border-[.5px] border-[#c4c4c4]">
                        {bill.total_test_cost}
                      </td>
                    </tr>
                    <tr className="text-center h-[48px] border-[.5px] border-[#c4c4c4]">
                      <td></td>
                      <td></td>
                      <td className="border-[.5px] border-[#c4c4c4]">
                        <strong>Total : </strong>
                        {bill.total_amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <u className="font-black text-end">Seal & Signature</u>
              </div>
              <Button name="DOWNLOAD" />
            </form>
          </div>
        ) : (
          <div className="text-center">You don't have access to this page</div>
        )}
      </div>
    </div>
  );
};
