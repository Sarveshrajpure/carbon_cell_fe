import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FallingLines } from "react-loader-spinner";

const Graph = () => {
  const [graphData, setGraphData] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "USA Population Chart",
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          color: "#3E3E3E",
        },
      },
      x: {
        grid: {
          drawBorder: false,
          lineWidth: 0,
        },
      },
    },
  };

  useEffect(() => {
    const getGrpahData = async () => {
      try {
        setError("");
        let response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        let data = response.data?.data.reverse();

        let graphData = {
          labels: data.map((item) => item.Year),
          datasets: [
            {
              data: data.map((data) => data.Population),
              borderColor: "#2AB42A",
            },
          ],
        };

        setGraphData(graphData);
      } catch (err) {
        setError(err.message);
      }
    };
    getGrpahData();
  }, []);

  return (
    <div className="pt-20 ml-10">
      {loader ? (
        <div className="flex justify-center">
          <FallingLines height="50" width="50" />
        </div>
      ) : (
        <div className="w-[90%]  lg:w-[70%] p-4 bg-[#1A1E1C] rounded-md ">
          {error ? <p className="text-red-400">Error ! - {error}</p> : ""}
          {graphData ? <Line data={graphData} options={options} /> : ""}
        </div>
      )}
    </div>
  );
};

export default Graph;
