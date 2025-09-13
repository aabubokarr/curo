import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ViewPrescription = () => {
  const { prescriptionId } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [error, setError] = useState("");
  const today = new Date();
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  useEffect(() => {
    axios
      .get(`http://localhost:8081/prescription/test/${prescriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPrescription(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch prescription data");
        console.error(err);
      });
  }, [prescriptionId, token, navigate]);

  const handleDownload = (e) => {
    e.preventDefault();
    const downloadPrescription = document.getElementById(
      "downloadPrescription"
    );

    const options = {
      margin: 1,
      filename: "prescription.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(downloadPrescription).set(options).save();
  };

  if (role === "admin") {
    return (
      <div className="text-center">You don't have access to this page</div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">View Prescription</h1>
          <Profile />
        </div>
        {error && (
          <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}

        {prescription ? (
          <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
            <form onSubmit={handleDownload}>
              <div id="downloadPrescription" className="flex flex-col gap-3">
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
                  <h1>Doctor ID : {prescription.doctor_id}</h1>
                  <h1>Patient ID : {prescription.patient_id}</h1>
                  <h1>Patient Name : {prescription.patient_name}</h1>
                </div>
                <div>
                  <h2 className="text-[20px] font-semibold">Medicines:</h2>
                  <div>
                    {prescription.medicines &&
                    prescription.medicines.length > 0 ? (
                      prescription.medicines.map((medicine, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <h1>{medicine}</h1>
                          <div>
                            <div className="flex items-center gap-5">
                              <div className="flex flex-col items-center">
                                <h1>Breakfast</h1>
                                <div className="flex items-center gap-x-1 text-[20px]">
                                  <div className="w-[20px] h-[20px] border-[1px] border-[#c4c4c4]"></div>{" "}
                                  <FontAwesomeIcon icon={faBowlRice} />
                                  <div className="w-[20px] h-[20px] border-[1px] border-[#c4c4c4]"></div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center">
                                <h1>Lunch</h1>
                                <div className="flex items-center gap-x-1 text-[20px]">
                                  <div className="w-[20px] h-[20px] border-[1px] border-[#c4c4c4]"></div>{" "}
                                  <FontAwesomeIcon icon={faBowlRice} />
                                  <div className="w-[20px] h-[20px] border-[1px] border-[#c4c4c4]"></div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center">
                                <h1>Dinner</h1>
                                <div className="flex items-center gap-x-1 text-[20px]">
                                  <div className="w-[20px] h-[20px] border-[1px] border-[#c4c4c4]"></div>{" "}
                                  <FontAwesomeIcon icon={faBowlRice} />
                                  <div className="w-[20px] h-[20px] border-[1px] border-[#c4c4c4]"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No medicines found for this prescription.</p>
                    )}
                  </div>
                </div>

                <u className="font-black text-end">Seal & Signature</u>
              </div>
              <Button name="DOWNLOAD" />
            </form>
          </div>
        ) : (
          <div className="text-center">Loading prescription details...</div>
        )}
      </div>
    </div>
  );
};
