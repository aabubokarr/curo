import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Layout } from "../../Layout/Layout";
import { Profile } from "../../Profile/Profile";

import Modal from "../../UI/Modals/Modal";
import CreateTest from "./CreateTest";
import EditTest from "./EditTest";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faFlask,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Button, Card } from "../../UI";
import { theme } from "../../../constants/theme";
import { API_URL } from "../../../constants/config";

import { motion } from "framer-motion";

export const Test = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [testList, setTestList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showTestModal, setShowTestModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedTest, setSelectedTest] = useState(null);

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/test/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTestList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch tests:", error);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch test data."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (role !== "admin") {
      setLoading(false);
      return;
    }

    fetchTests();
  }, [fetchTests, role]);

  const handleEditTest = (test) => {
    setSelectedTest(test);
    setShowEditModal(true);
  };

  const handleTestUpdated = async () => {
    setShowEditModal(false);
    setSelectedTest(null);

    await fetchTests();
  };

  const handleDelete = async (testId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this test?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/test/delete/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTestList((previousList) =>
        previousList.filter((test) => test.test_id !== testId)
      );

      alert("Test deleted successfully.");
    } catch (error) {
      console.error("Failed to delete test:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete test."
      );
    }
  };

  const handleTestCreated = async () => {
    setShowTestModal(false);

    await fetchTests();
  };

  if (role !== "admin") {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
          <Card padding="lg" shadow="lg" className="text-center">
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
                icon={faFlask}
                className="text-3xl text-gray-400"
              />
            </div>

            <p className="text-lg text-gray-600">
              You don't have access to this page
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HEADER */}

      <div
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
        {/* PAGE TITLE */}

        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{
              color: theme.colors.text.primary,
            }}
          >
            Tests
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage and view all available medical tests
          </p>
        </div>

        {/* HEADER ACTIONS */}

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowTestModal(true)}
            className="flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />

            <span className="hidden sm:inline">Add New Test</span>

            <span className="sm:hidden">Add</span>
          </Button>

          <Profile />
        </div>
      </div>

      {/* ERROR */}

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
          <div className="flex items-center justify-between gap-4">
            <p className="text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchTests}
              className="
                text-sm
                font-medium
                text-red-700
                hover:underline
              "
            >
              Try Again
            </button>
          </div>
        </Card>
      )}

      {/* LOADING */}

      {loading ? (
        <div className="text-center py-12">
          <div
            className="
              animate-spin
              rounded-full
              h-12
              w-12
              border-b-2
              border-[#009BA9]
              mx-auto
              mb-4
            "
          />

          <p className="text-gray-600">Loading tests...</p>
        </div>
      ) : testList.length === 0 ? (
        /* EMPTY STATE */

        <Card padding="lg" shadow="md" className="text-center">
          <div className="py-8">
            <FontAwesomeIcon
              icon={faFlask}
              className="
                text-4xl
                text-gray-400
                mb-4
              "
            />

            <p className="text-lg text-gray-600">No tests found</p>

            <Button
              variant="primary"
              size="md"
              onClick={() => setShowTestModal(true)}
              className="mt-4"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add First Test
            </Button>
          </div>
        </Card>
      ) : (
        /* TEST GRID */

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-5
          "
        >
          {testList.map((test, index) => (
            <motion.div
              key={test.test_id}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <Card
                padding="lg"
                shadow="md"
                className="
                  h-full
                  hover:shadow-lg
                  transition-shadow
                  duration-300
                "
              >
                {/* CARD HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  {/* TEST ICON */}

                  <div
                    className="
                      w-12
                      h-12
                      rounded-full
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      backgroundColor: theme.colors.status.info + "20",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFlask}
                      className="text-xl"
                      style={{
                        color: theme.colors.status.info,
                      }}
                    />
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2">
                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() => handleEditTest(test)}
                      className="
                        w-9
                        h-9
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        transition-colors
                        cursor-pointer
                      "
                      style={{
                        color: theme.colors.primary.main,
                      }}
                      title="View/Edit"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() => handleDelete(test.test_id)}
                      className="
                        w-9
                        h-9
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        hover:bg-red-50
                        transition-colors
                        text-red-500
                        cursor-pointer
                      "
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                {/* TEST INFORMATION */}

                <div className="space-y-2">
                  <h3
                    className="
                      font-bold
                      text-lg
                      truncate
                    "
                    style={{
                      color: theme.colors.text.primary,
                    }}
                    title={test.test_name}
                  >
                    {test.test_name}
                  </h3>

                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">ID:</span> {test.test_id}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Treatment ID:</span>{" "}
                      {test.treatment_id}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-medium">Cost:</span>{" "}
                      {test.test_cost} TK
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* CREATE TEST MODAL */}

      <Modal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        title="Add New Test"
        maxWidth="max-w-2xl"
      >
        <CreateTest
          onCancel={() => setShowTestModal(false)}
          onSuccess={handleTestCreated}
        />
      </Modal>

      {/* EDIT TEST MODAL */}

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTest(null);
        }}
        title="Edit Test"
        maxWidth="max-w-2xl"
      >
        {selectedTest && (
          <EditTest
            test={selectedTest}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedTest(null);
            }}
            onSuccess={handleTestUpdated}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Test;
