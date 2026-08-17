import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faUserMd,
  faUser,
  faCalendarAlt,
  faClock,
  faPills,
  faPrescription,
  faStethoscope,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faCheckCircle,
  faSyringe,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import { Box } from "@mui/material";
import axios from "axios";

export const ViewPrescription = ({ prescription, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prescriptionRef = useRef(null);

  const today = new Date();
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  const time = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        setLoading(true);
        // Fetch prescription details with related data
        const response = await axios.get(
          `/prescription/${prescription.prescription_id}`
        );

        // The response should include:
        // - Prescription details
        // - Doctor details (from doctor_details table)
        // - Patient details (from patient_details table)
        // - Medicines (from prescription_medicines table)
        // - Treatment plan (from treatment_plan table)

        setPrescriptionData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching prescription:", err);
        setError("Failed to load prescription data");
        // Fallback to provided prescription data if API fails
        setPrescriptionData({
          id: prescription.prescription_id || "N/A",
          doctor: {
            id: prescription.doctor_id || "N/A",
            name: prescription.doctor_name || "Doctor Name Not Available",
            specialization: prescription.doctor_specialization || "N/A",
            phone: prescription.doctor_phone || "N/A",
            email: prescription.doctor_email || "N/A",
            license: prescription.doctor_license || "N/A",
          },
          patient: {
            id: prescription.patient_id || "N/A",
            name: prescription.patient_name || "Patient Name Not Available",
            age: prescription.patient_age || "N/A",
            gender: prescription.patient_gender || "N/A",
            phone: prescription.patient_phone || "N/A",
            email: prescription.patient_email || "N/A",
            address: prescription.patient_address || "N/A",
            blood_group: prescription.blood_group || "N/A",
            dob: prescription.dob || "N/A",
          },
          medicines: prescription.medicines || [],
          diagnosis: prescription.diagnosis || "N/A",
          symptoms: prescription.symptoms || "N/A",
          plan_details: prescription.plan_details || "N/A",
          next_visit: prescription.next_visit || null,
          notes: prescription.notes || null,
        });
      } finally {
        setLoading(false);
      }
    };

    if (prescription) {
      fetchPrescriptionData();
    }
  }, [prescription]);

  const handleDownload = async (e) => {
    e.preventDefault();

    if (isDownloading) return;

    setIsDownloading(true);

    try {
      const element = prescriptionRef.current;

      if (!element) {
        throw new Error("Prescription element not found");
      }

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `prescription_${prescriptionData?.id || "RX"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error downloading prescription:", error);
      alert("Failed to download prescription. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#009BA9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading prescription...</p>
        </div>
      </div>
    );
  }

  if (error && !prescriptionData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-4xl text-red-500 mb-4"
          />
          <p className="text-gray-700 font-semibold">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-[#009BA9] text-white rounded-lg hover:bg-[#008894] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const data = prescriptionData;

  return (
    <div className="flex flex-col gap-4">
      {/* Action Buttons */}
      <div className="flex items-center justify-between pb-5 border-b border-gray-200 print:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-[#009BA9]
              text-white
              font-semibold
              transition-all
              duration-200
              hover:bg-[#008894]
              hover:shadow-lg
              hover:shadow-[#009BA9]/30
              disabled:opacity-60
              disabled:cursor-not-allowed
              flex
              items-center
              gap-2.5
              text-sm
            "
          >
            <FontAwesomeIcon icon={faDownload} />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Prescription Content */}
      <div
        ref={prescriptionRef}
        id="downloadPrescription"
        className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
        style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
      >
        {/* Watermark Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none print:opacity-10">
          <div className="text-9xl font-bold text-[#009BA9] transform -rotate-12 translate-x-1/2 translate-y-1/2">
            PRESCRIPTION
          </div>
        </div>

        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#009BA9] to-[#007A85] p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  flexShrink: 0,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <img src="./images/logo.png" alt="Logo" className="w-12" />
              </Box>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Curo Health Care
                </h1>
                <p className="text-blue-100 text-sm mt-0.5 opacity-90">
                  Excellence in Healthcare
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                  Prescription
                </p>
                <p className="text-sm font-bold">{data?.id || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-blue-100"
                />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-blue-100" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-blue-100"
                />
                <span className="font-medium">Active</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <FontAwesomeIcon icon={faStethoscope} />
              <span>Valid for 30 days</span>
            </div>
          </div>
        </div>

        {/* Doctor & Patient Info */}
        <div className="grid grid-cols-2 gap-0 border-b border-gray-200">
          <div className="p-5 border-r border-gray-200 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#009BA9]/10 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUserMd}
                  className="text-[#009BA9] text-sm"
                />
              </div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Doctor Information
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-base font-bold text-gray-800">
                {data?.doctor?.name || "N/A"}
              </p>
              <p className="text-sm text-[#009BA9] font-medium">
                {data?.doctor?.specialization || "N/A"}
              </p>
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-gray-400 text-xs w-4"
                  />
                  {data?.doctor?.phone || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400 text-xs w-4"
                  />
                  {data?.doctor?.email || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-gray-400 text-xs w-4"
                  />
                  ID: {data?.doctor?.id || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-bl from-gray-50 to-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#009BA9]/10 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[#009BA9] text-sm"
                />
              </div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Patient Information
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-base font-bold text-gray-800">
                {data?.patient?.name || "N/A"}
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                  ID: {data?.patient?.id || "N/A"}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                  {data?.patient?.age || "N/A"} yrs
                </span>
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                  {data?.patient?.gender || "N/A"}
                </span>
                {data?.patient?.blood_group && (
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                    Blood: {data.patient.blood_group}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-gray-400 text-xs w-4"
                  />
                  {data?.patient?.phone || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400 text-xs w-4"
                  />
                  {data?.patient?.email || "N/A"}
                </p>
                {data?.patient?.address && data.patient.address !== "N/A" && (
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-gray-400 text-xs w-4"
                    />
                    {data.patient.address}
                  </p>
                )}
                {data?.patient?.dob && data.patient.dob !== "N/A" && (
                  <p className="flex items-center gap-2 text-xs text-gray-400">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-gray-400 text-xs w-4"
                    />
                    DOB: {data.patient.dob}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Details */}
        {(data?.diagnosis || data?.symptoms || data?.plan_details) && (
          <div className="p-5 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              {data?.diagnosis && data.diagnosis !== "N/A" && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Diagnosis
                  </h3>
                  <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {data.diagnosis}
                  </p>
                </div>
              )}
              {data?.symptoms && data.symptoms !== "N/A" && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Symptoms
                  </h3>
                  <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {data.symptoms}
                  </p>
                </div>
              )}
              {data?.plan_details && data.plan_details !== "N/A" && (
                <div className="col-span-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Treatment Plan
                  </h3>
                  <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {data.plan_details}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medicines Section */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#009BA9]/10 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faPills}
                  className="text-[#009BA9] text-sm"
                />
              </div>
              <h3 className="text-base font-bold text-gray-800">
                Prescribed Medicines
              </h3>
            </div>
            <span className="text-xs text-gray-500">
              {data?.medicines?.length || 0} medicines
            </span>
          </div>

          {data?.medicines && data.medicines.length > 0 ? (
            <div className="space-y-3">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-3 px-3 py-2 bg-gray-50 rounded-lg text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Medicine Name</div>
                <div className="col-span-2 text-center">Dosage</div>
                <div className="col-span-2 text-center">Frequency</div>
                <div className="col-span-2 text-center">Duration</div>
              </div>

              {data.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 px-3 py-3 bg-white rounded-lg border border-gray-200 hover:border-[#009BA9] transition-all duration-200 hover:shadow-md"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#009BA9]">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {typeof medicine === "string"
                          ? medicine
                          : medicine.medicine_name || medicine.name || "N/A"}
                      </p>
                      {typeof medicine === "object" && medicine.quantity && (
                        <p className="text-xs text-gray-400">
                          Qty: {medicine.quantity}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-center">
                    <span className="text-sm text-gray-700">
                      {typeof medicine === "object"
                        ? medicine.dosage || "1 tab"
                        : "1 tab"}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center justify-center">
                    <span className="text-sm text-gray-700">
                      {typeof medicine === "object"
                        ? medicine.frequency || "3x/day"
                        : "3x/day"}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center justify-center">
                    <span className="text-sm text-gray-700">
                      {typeof medicine === "object"
                        ? medicine.duration || "7 days"
                        : "7 days"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <FontAwesomeIcon
                icon={faSyringe}
                className="mr-2 text-gray-400"
              />
              No medicines prescribed for this prescription.
            </p>
          )}

          {/* Additional Notes */}
          {data?.notes && data.notes !== "N/A" && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                <FontAwesomeIcon icon={faPrescription} className="mr-2" />
                Special Instructions
              </p>
              <p className="text-sm text-amber-800">{data.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BA9]"></span>
                Computer-generated prescription
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Valid for 30 days from issue date
              </p>
              {data?.next_visit && (
                <p className="text-xs text-[#009BA9] mt-1 font-medium">
                  Next visit: {data.next_visit}
                </p>
              )}
            </div>

            <div className="text-right">
              <div className="flex flex-col items-end">
                <div className="w-32 h-12 border-b-2 border-gray-400 mb-1"></div>
                <u className="font-bold text-gray-700 text-sm">
                  Seal & Signature
                </u>
                <p className="text-xs text-gray-500 mt-1">
                  {data?.doctor?.name || "Authorized Physician"}
                </p>
                <p className="text-xs text-gray-400">
                  {data?.doctor?.specialization || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Watermark */}
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <p className="text-[10px] text-gray-400 tracking-widest">
              Copyright © {new Date().getFullYear()} Curo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPrescription;
