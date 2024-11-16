import React from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export const Treatment = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [treatmentList, setTreatmentList] = useState([]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Treatment</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
          {role === "admin" && (
            <div className="px-5 pb-3">
              <Link
                to="/create-treatment"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
          )}
          <table className="w-full pt-3">
            <thead>
              <tr>
                <th>Treatment ID</th>
                <th>Diagnosis</th>
                <th>Medications</th>
                <th>Plan Details</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {treatmentList.map((treatment, index) => (
                <tr
                  key={treatment.treatment_id}
                  className={`text-center h-[48px] ${
                    index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td>{treatment.treatment_id}</td>
                  <td>{treatment.diagnosis}</td>
                  <td>{treatment.medications}</td>
                  <td>{treatment.plan_details}</td>
                  <td>
                    <Link >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                  <td
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
