import React, { useEffect, useState } from "react";
import style from "./style.module.css";

import { ReportContext } from "../../../../context/reportContext";

import Pagination from "../../../pagination/Pagination";
import { getReportStatusName } from "../../../../utils/environment";
import { countSeveritiesReport } from "../../../../utils/countSeveritiesReport";
import { gravityIndex } from "../../../../utils/gravityIndex";
import { sortData } from "../../../../utils/sortData";

const Table = ({ reports = [] }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState({ column: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [reportIndex, setReportIndex] = useState(0);
  const { setModalData } = React.useContext(ReportContext);

  const headerColumns = [
    { title: "Bairro", column: "district" },
    { title: "Rua", column: "street" },
    { title: "Status", column: "status" },
    { title: "Relatos", column: "reports" },
    { title: "Relatos Graves", column: "severeReports" },
    { title: "Relatos Moderados", column: "moderateReports" },
    { title: "Índice De Gravidade", column: "gravityIndex" },
    { title: "Data", column: "date" },
  ];

  const reportsPerPage = 7;
  const totalPages = Math.ceil(data.length / reportsPerPage);
  const start = (currentPage - 1) * reportsPerPage;
  const end = start + reportsPerPage;
  const paginatedReports = data.slice(start, end);

  useEffect(() => {
    if (reports.length > 0) {
      const formattedReports = reports.map((report) => ({
        ...report,
        status: getReportStatusName(report.status),
        reports: report.childrens.length,
        severeReports: countSeveritiesReport(report).severe,
        moderateReports: countSeveritiesReport(report).moderate,
        gravityIndex: gravityIndex(report),
        date: new Date(report.created_at).getTime(),
      }));

      setData(formattedReports);
    }
  }, [reports]);

  const getIconeOrdenacao = (column) => {
    if (order.column === column) {
      return order.direction === "asc" ? "▲" : "▼";
    }
    return "⇅";
  };

  const changeReportIndex = async ({ report, index }) => {
    setReportIndex(index);
    setModalData(report);
  };

  return (
    <div className={style.tableContainer}>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead className={style.table__header}>
            <tr className={style.header__list}>
              {headerColumns.map((item, index) => (
                <th
                  key={index}
                  className="font-s c2"
                  onClick={() =>
                    sortData({
                      column: item.column,
                      order,
                      setOrder,
                      data,
                      setData,
                    })
                  }
                >
                  <span>{item.title}</span>
                  <div>{getIconeOrdenacao(item.column)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={style.table__body}>
            {paginatedReports.map((item, index) => {
              const date = new Date(item.created_at);
              return (
                <tr
                  key={index}
                  className={`${style.body__list} ${index === reportIndex && style.body__list_select}`}
                  onClick={() => {
                    changeReportIndex({ report: item, index });
                  }}
                >
                  <td className="font-s c4">{item.district}</td>
                  <td className="font-s c4">{item.street}</td>
                  <td className="font-s c4">{item.status}</td>
                  <td className="font-s c4">{item.reports}</td>
                  <td className="font-s c4">{item.severeReports}</td>
                  <td className="font-s c4">{item.moderateReports}</td>
                  <td className="font-s c4">{item.gravityIndex}%</td>
                  <td className="font-s c4">
                    {`${String(date.getDate()).padStart(2, "0")}/${String(
                      date.getMonth() + 1,
                    ).padStart(2, "0")}/${date.getFullYear()}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Table;
