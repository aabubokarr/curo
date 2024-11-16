import React from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";

export const Prescription = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Prescription</h1>
          <Profile />
        </div>
       <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
          {role === "admin" && (
            <div className="px-5 pb-3">
              <Link
                to="/create-prescription"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
          )}
          <table className="w-full pt-3">
            <thead>
              <tr>
                <th>Prescription ID</th>
                <th>Name</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {prescriptionList.map((prescription, index) => (
                <tr
                  key={prescription.prescription_id}
                  className={`text-center h-[48px] ${
                    index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                  }`}
                >
                  <td>{prescription.prescription_id}</td>
                  <td>{prescription.prescription_name}</td>
                  <td>
                    <Link to={`/edit-prescription/${prescription.prescription_id}`}>
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                  <td
                    onClick={() => handleDelete(prescription.prescription_id)}
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
