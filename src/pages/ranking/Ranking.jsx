import React from "react";
import style from "./style.module.css";
import Header from "../../components/header/Header";
import Control from "../../components/pages/ranking/control/Control";
import Table from "../../components/pages/ranking/table/Table";

import useReports from "../../hooks/useReports";
import useResolvedReports from "../../hooks/useResolvedReports.js";
import { filterReports, formatDistricts } from "../../services/ranking.js";

function Metrics() {
  const [data, setData] = React.useState([]);
  const { reports } = useReports();
  const { resolvedReports } = useResolvedReports();
  const [reportsFiltered, setReportsFiltered] = React.useState([]);
  const [resolvedFiltered, setResolvedFiltered] = React.useState([]);
  const [filter, setFilter] = React.useState({
    date: {
      start: null,
      end: null,
    },
    districtTarget: "",
  });

  React.useEffect(() => {
    if (reports?.length === 0 && resolvedReports?.length === 0) return;

    const filteredReports = filterReports({ data: reports, filter });
    const filteredResolved = filterReports({ data: resolvedReports, filter });

    const formatted = formatDistricts({
      reports: filteredReports,
      resolvedReports: filteredResolved,
    });

    setReportsFiltered(filteredReports);
    setResolvedFiltered(filteredResolved);
    setData(formatted);
  }, [reports, resolvedReports, filter]);

  return (
    <>
      <Header
        title="Ranking"
        text="Visualize os bairros com o mais ocorrências. Identifique rapidamente as áreas que mais necessitam de atenção."
      />

      <main className={`m-1-5 container ${style.main}`}>
        <Control filter={filter} setFilter={setFilter} data={data} />

        <Table data={data} setData={setData} />
      </main>
    </>
  );
}

export default Metrics;
