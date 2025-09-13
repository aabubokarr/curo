import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export const Service = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/list/service", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setServiceList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch service data.");
      });
  }, [token]);

  const handleDelete = (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      axios
        .delete(`http://localhost:8081/delete/service/${serviceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setServiceList((prevList) =>
            prevList.filter((service) => service.service_id !== serviceId)
          );
          alert("Service deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete service.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Services</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
            <div className="px-5 pb-3">
              <Link
                to="/create-service"
                className="w-[120px] h-[48px] cursor-pointer bg-[#009BA9] text-[18px] font-normal rounded-[8px] flex items-center justify-center text-white"
              >
                Add New
              </Link>
            </div>
            <table className="w-full pt-3">
              <thead>
                <tr>
                  <th>Treatment ID</th>
                  <th>Service Name</th>
                  <th>Service cost</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {serviceList.map((service, index) => (
                  <tr
                    key={service.service_id}
                    className={`text-center h-[48px] ${
                      index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td>{service.treatment_id}</td>
                    <td>{service.service_name}</td>
                    <td>{service.service_cost}</td>
                    <td>
                      <Link to={`/edit-service/${service.service_id}`}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </td>
                    <td
                      onClick={() => handleDelete(service.service_id)}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">You don't have access to this page</div>
        )}
      </div>
    </div>
  );
};
