import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fixedsXnotFixedes } from "../../../../services/metrics";

// Registrar componentes necessários
ChartJS.register(ArcElement, Tooltip, Legend);

const StylishPieChart = ({ useReports, useResolvedReports }) => {
  const { reports } = useReports();
  const { resolvedReports } = useResolvedReports();
  const [dataReports, setDataReports] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fixedsXnotFixedes({ reports, resolvedReports });

      setDataReports(response);
    };

    if (reports.length != 0 && resolvedReports.length != 0) getData();
  }, [reports, resolvedReports]);

  const data = {
    labels: ["Reparados", "Pendentes"], // Legendas dos dados
    datasets: [
      {
        label: "Proporção",
        data: dataReports, // Valores dos dados
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)", // Azul elegante
          "rgba(255, 99, 132, 0.8)", // Vermelho moderno
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 2, // Bordas mais suaves
        hoverOffset: 10, // Destaque ao passar o mouse
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right", // Legenda alinhada à direita para um layout mais elegante
        labels: {
          color: "#333", // Cor dos rótulos
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderRadius: 6,
        padding: 12,
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div style={{ height: "300px", width: "300px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default StylishPieChart;
