import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlRice,
  faDownload,
  faPrint,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";

export const ViewPrescription = ({ prescription, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const today = new Date();
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  /* =========================================================
     HANDLE DOWNLOAD PDF
  ========================================================== */

  const handleDownload = (e) => {
    e.preventDefault();
    setIsDownloading(true);

    const downloadPrescription = document.getElementById(
      "downloadPrescription"
    );

    const options = {
      margin: 1,
      filename: `prescription_${prescription.prescription_id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(downloadPrescription)
      .set(options)
      .save()
      .then(() => {
        setIsDownloading(false);
      });
  };

  /* =========================================================
     HANDLE PRINT
  ========================================================== */

  const handlePrint = () => {
    window.print();
  };

  /* =========================================================
     RENDER
  ========================================================== */

  return (
    <div className="flex flex-col gap-4">
      {/* Action Buttons */}

      <div className="flex items-center justify-between pb-3 border-b border-gray-200 print:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="
              px-4
              py-2
              rounded-lg
              bg-[#009BA9]
              text-white
              font-semibold
              transition
              hover:bg-[#008894]
              disabled:opacity-60
              disabled:cursor-not-allowed
              flex
              items-center
              gap-2
            "
          >
            <FontAwesomeIcon icon={faDownload} />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="
              px-4
              py-2
              rounded-lg
              border
              border-gray-300
              bg-white
              text-gray-700
              font-semibold
              transition
              hover:bg-gray-50
              flex
              items-center
              gap-2
            "
          >
            <FontAwesomeIcon icon={faPrint} />
            Print
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            w-9
            h-9
            rounded-lg
            flex
            items-center
            justify-center
            hover:bg-gray-100
            transition-colors
            text-gray-500
          "
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* Prescription Content */}

      <div
        id="downloadPrescription"
        className="bg-white rounded-lg p-6 print:p-4"
      >
        {/* Header */}

        <div className="bg-[#009BA9] rounded-lg p-4 mb-6 text-white text-center">
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-3 shadow-lg">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-black"></div>
                <div className="w-5 h-1.5 bg-black"></div>
                <div className="w-4 h-4 rounded-full bg-black"></div>
              </div>
            </div>

            <h1 className="text-2xl font-bold">
              Curo Health Care
            </h1>

            <p className="text-blue-100 text-sm mt-1">
              Plot: 15, Block: B, Bashundhara, Dhaka-1229, Bangladesh
            </p>

            <p className="text-blue-100 text-sm">Helpline: 16667</p>
          </div>
        </div>

        {/* Prescription Info */}

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              Prescription #{prescription.prescription_id}
            </h2>
            <p className="text-sm text-gray-500">Date: {date}</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-600 font-semibold">Active</span>
            </p>
          </div>
        </div>

        {/* Doctor & Patient Info */}

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Doctor Information
            </h3>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              ID: {prescription.doctor_id}
            </p>
            <p className="text-sm text-gray-600">
              {prescription.doctor_name || "Doctor Name Not Available"}
            </p>
          </div>

          <div>
            <h3 className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Patient Information
            </h3>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              ID: {prescription.patient_id}
            </p>
            <p className="text-sm text-gray-600">
              {prescription.patient_name || "Patient Name Not Available"}
            </p>
          </div>
        </div>

        {/* Medicines */}

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Medicines Prescribed
          </h3>

          {prescription.medicines && prescription.medicines.length > 0 ? (
            <div className="space-y-2">
              {prescription.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-[#009BA9] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-gray-800">
                      {medicine}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Breakfast */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500">Breakfast</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                        <FontAwesomeIcon
                          icon={faBowlRice}
                          className="text-gray-600 text-sm"
                        />
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      </div>
                    </div>

                    {/* Lunch */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500">Lunch</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                        <FontAwesomeIcon
                          icon={faBowlRice}
                          className="text-gray-600 text-sm"
                        />
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      </div>
                    </div>

                    {/* Dinner */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500">Dinner</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                        <FontAwesomeIcon
                          icon={faBowlRice}
                          className="text-gray-600 text-sm"
                        />
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No medicines found for this prescription.
            </p>
          )}
        </div>

        {/* Footer */}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">
                This is a computer-generated prescription.
              </p>
              <p className="text-xs text-gray-400">
                Valid for 30 days from the date of issue.
              </p>
            </div>

            <div className="text-right">
              <u className="font-bold text-gray-700 block">Seal & Signature</u>
              <p className="text-xs text-gray-500 mt-1">Authorized Physician</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPrescription;
