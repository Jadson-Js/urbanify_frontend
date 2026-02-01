import React from "react";
import style from "./style.module.css";

import { ReportContext } from "../../context/reportContext";

import useReports from "../../hooks/useReports";
import useResolvedReports from "../../hooks/useResolvedReports";

import Header from "../../components/header/Header";
import Filter from "../../components/filter/Filter";
import Table from "../../components/pages/management/table/Table";
import Modal from "../../components/pages/management/modal/Modal";

import {
  getUrlsReport,
  getUrlsResolvedReport,
} from "../../services/getUrlsReport";
import { filterReports } from "../../services/dashboard";

import { ReportStatusEnum } from "../../utils/environment";

function Management() {
  const { modalData, setModalData } = React.useContext(ReportContext);
  const [urls, setUrls] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const { reports } = useReports();
  const { resolvedReports } = useResolvedReports();

  const [filter, setFilter] = React.useState({
    status: ReportStatusEnum.PENDENTE,
    severity: null,
    date: {
      start: null,
      end: null,
    },
    districtTarget: "",
  });
  const [filteredReports, setFilteredReports] = React.useState([]);

  React.useEffect(() => {
    const result = filterReports({ reports, resolvedReports, filter });

    setFilteredReports(result);
  }, [filter, reports]);

  React.useEffect(() => {
    if (!modalData) return;

    const getUrls = async () => {
      const data =
        filter.status == ReportStatusEnum.PENDENTE
          ? await getUrlsReport(modalData)
          : await getUrlsResolvedReport(modalData);

      setUrls(data);
    };
    getUrls();

    setModalOpen(true);
  }, [modalData]);

  return (
    <>
      <Header
        title="Gestão de reparos"
        text="Gerenciamento e monitoramento de reparos. Acompanhe as ocorrências reportadas pelos cidadãos desde a abertura até a conclusão."
      />

      <main className={`bg-12 m-1-5 ${style.main}`}>
        <Filter filter={filter} setFilter={setFilter} />

        <div className={style.content}>
          <Table reports={filteredReports} setModalData={setModalData} />
        </div>

        {modalOpen && (
          <Modal
            modalData={modalData}
            setModalData={setModalData}
            urls={urls}
            setUrls={setUrls}
            setModalOpen={setModalOpen}
          />
        )}
      </main>
    </>
  );
}

export default Management;
