import React, { useEffect, useRef } from "react";
import { Sidebar } from "../../Bars/Sidebar";
import { Profile } from "../../Profile/Profile";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart;
    axios
      .get("http://localhost:8081/user/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (chartRef.current) {
          const ctx = chartRef.current.getContext("2d");
          myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: [
                "Male Doctors",
                "Female Doctors",
                "Male Patients",
                "Female Patients",
              ],
              datasets: [
                {
                  label: "Number of users",
                  data: [
                    res.data.doc_male,
                    res.data.doc_female,
                    res.data.pat_male,
                    res.data.pat_female,
                  ],
                  borderWidth: 1,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="px-3 w-full">
        <div className="top-0 flex items-center justify-between sticky bg-[#EFF0F6] z-10 py-3">
          <h1 className="text-[28px] font-semibold">Dashboard</h1>
          <Profile />
        </div>
        <div className="bg-[#FAFAFA] rounded-[20px] p-5">
          <canvas ref={chartRef} id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
};
