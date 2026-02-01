import React from "react";
import { attendedsUsersByYear } from "../../../../services/metrics";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MinimalistBarChart = ({ useUsers }) => {
  const { users } = useUsers();
  const [dataUsers, setDataUsers] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const response = await attendedsUsersByYear(users);

      setDataUsers(response);
    };

    if (users.length != 0) getData();
  }, [users]);

  const data = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Relatos",
        data: dataUsers,
        backgroundColor: [
          "rgba(142, 150, 255, 0.6)",
          "rgba(120, 200, 255, 0.6)",
          "rgba(210, 125, 100, 0.9)",
          "rgba(120, 180, 255, 0.6)",
          "rgba(180, 220, 255, 0.6)",
          "rgba(120, 220, 180, 0.6)",
          "rgba(200, 150, 255, 0.6)",
          "rgba(255, 180, 120, 0.6)",
          "rgba(255, 120, 200, 0.6)",
          "rgba(180, 255, 150, 0.6)",
          "rgba(100, 100, 255, 0.6)",
          "rgba(255, 220, 120, 0.6)",
        ],
        borderRadius: 2, // Deixa as barras arredondadas
        barThickness: 20, // Define a largura das barras
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Remove legenda para um visual mais clean
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderRadius: 6,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove linhas do grid horizontal
        },
        ticks: {
          color: "#666",
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Grid bem suave
        },
        ticks: {
          color: "#666",
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
          callback: (value) => value / 1000 + "K", // Exibir valores em "K"
        },
      },
    },
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MinimalistBarChart;
