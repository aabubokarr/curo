import React, { useEffect, useState } from "react";
import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { Card, Button } from "../../UI";
import { theme } from "../../../constants/theme";

import { motion } from "framer-motion";

export const Request = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH REQUESTS
  ========================================================== */

  useEffect(() => {
    if (role !== "admin") {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/request/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequest(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch requests:", err);
        setError("Failed to fetch request data.");
        setLoading(false);
      });
  }, [API_URL, token, role]);

  /* =========================================================
     ACCEPT REQUEST
  ========================================================== */

  const handleAccept = (requestId) => {
    const confirmed = window.confirm(
      "Are you sure you want to accept this request?"
    );

    if (!confirmed) {
      return;
    }

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
      .then(() => {
        setRequest((prevList) =>
          prevList.filter((item) => item.request_id !== requestId)
        );

        alert("Request accepted and transferred successfully.");
      })
      .catch((err) => {
        console.error("Failed to accept request:", err);
        alert("Failed to accept request.");
      });
  };

  /* =========================================================
     REJECT REQUEST
  ========================================================== */

  const handleReject = (requestId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this request?"
    );

    if (!confirmed) {
      return;
    }

    axios
      .delete(`${API_URL}/request/reject/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setRequest((prevList) =>
          prevList.filter((item) => item.request_id !== requestId)
        );

        alert("Request rejected successfully.");
      })
      .catch((err) => {
        console.error("Failed to reject request:", err);
        alert("Failed to reject request.");
      });
  };

  /* =========================================================
     ACCESS DENIED
  ========================================================== */

  if (role !== "admin") {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
          <Card padding="lg" shadow="lg" className="text-center">
            <div className="py-8">
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-gray-100
                  mx-auto
                  mb-4
                  flex
                  items-center
                  justify-center
                "
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-2xl text-gray-400"
                />
              </div>

              <p className="text-lg text-gray-600">
                You don't have access to this page
              </p>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================== */

  return (
    <Layout>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className="
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-4
          mb-8
        "
      >
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              color: theme.colors.text.primary,
            }}
          >
            Requests
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage registration and account requests
          </p>
        </div>

        <Profile />
      </header>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <Card
          padding="md"
          className="
            mb-6
            bg-red-50
            border
            border-red-200
          "
        >
          <p className="text-red-600 text-sm">{error}</p>
        </Card>
      )}

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-24
          "
        >
          <div
            className="
              animate-spin
              rounded-full
              h-12
              w-12
              border-4
              border-gray-200
              border-t-[#009BA9]
              mb-4
            "
          />

          <p className="text-gray-500">Loading requests...</p>
        </div>
      ) : request.length === 0 ? (
        /* ===================================================
           EMPTY STATE
        ==================================================== */

        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-12">
            <div
              className="
                w-20
                h-20
                rounded-full
                mx-auto
                mb-5
                flex
                items-center
                justify-center
                bg-gray-100
              "
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="
                  text-3xl
                  text-gray-400
                "
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No requests found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no pending requests.
            </p>
          </div>
        </Card>
      ) : (
        /* ===================================================
           REQUEST TABLE
        ==================================================== */

        <Card
          padding="none"
          shadow="md"
          className="
            overflow-hidden
            border
            border-gray-100
          "
        >
          {/* Table Header */}

          <div
            className="
              px-6
              py-5
              border-b
              border-gray-100
              flex
              items-center
              justify-between
            "
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Pending Requests
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {request.length} {request.length === 1 ? "request" : "requests"}{" "}
                waiting for review
              </p>
            </div>

            <div
              className="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
              "
              style={{
                backgroundColor: theme.colors.primary.main + "15",
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  color: theme.colors.primary.main,
                }}
              />
            </div>
          </div>

          {/* Responsive Table Container */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    #
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Name
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Email
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-center
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Accept
                  </th>

                  <th
                    className="
                      px-6
                      py-4
                      text-center
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Reject
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {request.map((item, index) => (
                  <motion.tr
                    key={item.request_id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="
                        hover:bg-gray-50
                        transition-colors
                      "
                  >
                    {/* Serial */}

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{index + 1}</span>
                    </td>

                    {/* Name */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                              w-10
                              h-10
                              rounded-full
                              flex
                              items-center
                              justify-center
                              flex-shrink-0
                            "
                          style={{
                            backgroundColor: theme.colors.primary.main + "15",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{
                              color: theme.colors.primary.main,
                            }}
                          />
                        </div>

                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {item.email}
                      </span>
                    </td>

                    {/* Accept */}

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleAccept(item.request_id)}
                        className="
                            w-10
                            h-10
                            rounded-xl
                            inline-flex
                            items-center
                            justify-center
                            bg-green-50
                            text-green-600
                            hover:bg-green-100
                            hover:scale-105
                            transition-all
                            duration-200
                          "
                        title="Accept request"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </td>

                    {/* Reject */}

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleReject(item.request_id)}
                        className="
                            w-10
                            h-10
                            rounded-xl
                            inline-flex
                            items-center
                            justify-center
                            bg-red-50
                            text-red-500
                            hover:bg-red-100
                            hover:scale-105
                            transition-all
                            duration-200
                          "
                        title="Reject request"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </Layout>
  );
};

export default Request;
