import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const SubMedicalRecord = () => {
  const { recordId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/medical_record/${recordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(
            `http://localhost:8081/treatment-plan/patient/${res.data.patient_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((treatRes) => {
            const treatmentPlans = Array.isArray(treatRes.data)
              ? treatRes.data
              : [treatRes.data];

            console.log("Treatment Plans: ", treatmentPlans);

            setTreatments(treatmentPlans);
          })
          .catch((err) => {
            console.error("Error fetching treatment data:", err);
            setError("Failed to fetch treatment data.");
          });
      })
      .catch((err) => {
        console.error("Error fetching record data:", err);
        setError("Failed to fetch medical record data.");
      });
  }, [recordId, token, navigate]);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[20px] font-semibold">1. PLANS</h1>
      <table className="w-full pt-3">
        <thead>
          <tr>
            <th>Treatment ID</th>
            <th>Doctor ID</th>
            <th>Diagnosis</th>
            <th>Medications</th>
            <th>Plan Details</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((treatment, index) => (
            <tr
              key={treatment.treatment_id}
              className={`text-center h-[48px] ${
                index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
              }`}
            >
              <td>{treatment.treatment_id}</td>
              <td>{treatment.doctor_id}</td>
              <td>{treatment.diagnosis}</td>
              <td>{treatment.medications}</td>
              <td>{treatment.plan_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
