import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { SubMedicalRecord } from "./SubMedicalRecord";

export const ViewMedicalRecord = () => {
  const { recordId } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [record, setRecord] = useState({});
  const [error, setError] = useState("");
  const [treatment, setTreatment] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [service, setService] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/medical_record/${recordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecord(res.data);
        console.log(res.data);

        axios
          .get(`http://localhost:8081/treatment-plan/${res.data.patient_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((treatRes) => {
            setTreatment(treatRes.data);
            console.log(treatRes.data);

            const serviceReq = axios.get(
              `http://localhost:8081/service/patient/${treatRes.data.treatment_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const testReq = axios.get(
              `http://localhost:8081/test/patient/${treatRes.data.treatment_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            Promise.all([serviceReq, testReq])
              .then((res) => {
                const [serviceRes, testRes] = res;

                const services = Array.isArray(serviceRes.data)
                  ? serviceRes.data
                  : [serviceRes.data];
                const tests = Array.isArray(testRes.data)
                  ? testRes.data
                  : [testRes.data];

                setService(services);
                setTest(tests);

                console.log("Services:", services);
                console.log("Tests:", tests);
              })
              .catch((err) => {
                console.error("Error fetching service or test data:", err);
                setError("Failed to fetch service or test data.");
              });
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
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">View Record</h1>
          <Profile />
        </div>
        {role === "doctor" ? (
          <div className="text-center">You don't have access to this page</div>
        ) : (
          <div className="bg-[#FAFAFA] rounded-[20px] p-5 w-full">
            {error && (
              <div className="bg-red-200 text-red-600 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form>
              <div id="downloadRecord" className="flex flex-col gap-3">
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
                <div>
                  <h1>Doctor: {record.doctor_id}</h1>
                  <h1>Patient: {record.patient_id}</h1>
                </div>
                <div className="flex flex-col gap-3">
                  <SubMedicalRecord />
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold">2. SERVICES</h1>
                    <table className="w-full pt-3">
                      <thead>
                        <tr>
                          <th>Service ID</th>
                          <th>Service Name</th>
                          <th>Service Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {service.map((service, index) => (
                          <tr
                            key={service.service_id}
                            className={`text-center h-[48px] ${
                              index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                            }`}
                          >
                            <td>{service.service_id}</td>
                            <td>{service.service_name}</td>
                            <td>{service.service_cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-[20px] font-semibold">3. TESTS</h1>
                    <table className="w-full pt-3">
                      <thead>
                        <tr>
                          <th>Test ID</th>
                          <th>Test Name</th>
                          <th>Test Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.map((test, index) => (
                          <tr
                            key={test.test_id}
                            className={`text-center h-[48px] ${
                              index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#FAFAFA]"
                            }`}
                          >
                            <td>{test.test_id}</td>
                            <td>{test.test_name}</td>
                            <td>{test.test_cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
