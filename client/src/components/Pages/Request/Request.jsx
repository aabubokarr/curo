import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export const Request = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [request, setRequest] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/request/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch request data.");
      });
  }, [token]);

  const handleAccept = (requestId) => {
    if (window.confirm("Are you sure you want to accept this request?")) {
      axios
        .post(
          `${API_URL}/request/accept/${requestId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setRequest((prevList) =>
            prevList.filter((request) => request.request_id !== requestId)
          );
          alert("Request accepted and transferred successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to accept request.");
        });
    }
  };

  const handleReject = (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios
        .delete(`${API_URL}/request/reject/${requestId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRequest((prevList) =>
            prevList.filter((request) => request.request_id !== requestId)
          );
          alert("Request deleted successfully.");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete request.");
        });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="pl-3 pr-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Requests</h1>
          <Profile />
        </div>
        {role === "admin" ? (
          <div className="bg-[#FAFAFA] rounded-[20px] pt-5">
            <table className="w-full pt-3">
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Accept</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {request.map((request, index) => (
                  <tr
                    key={request.request_id}
                    className={`text-center h-[48px] ${
                      index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td>{request.name}</td>
                    <td>{request.email}</td>
                    <td
                      onClick={() => handleAccept(request.request_id)}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </td>
                    <td
                      onClick={() => handleReject(request.request_id)}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faX} />
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
