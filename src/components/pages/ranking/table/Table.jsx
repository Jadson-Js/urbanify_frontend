import React from "react";
import style from "./style.module.css";

import Pagination from "../../../pagination/Pagination";
import { sortData } from "../../../../utils/sortData";

const Table = ({ data, setData }) => {
  const [order, setOrder] = React.useState({ column: null, direction: "asc" });
  const [currentPage, setCurrentPage] = React.useState(1);

  const reportsPerPage = 7; // Número de itens por página
  const totalPages = Math.ceil(data.length / reportsPerPage);

  const headerColumns = [
    { title: "Bairro", column: "district" },
    { title: "Moradores Atendidos", column: "attendeds" },
    { title: "Moradores A Serem Atendidos", column: "notAttendeds" },
    { title: "N° Relatos Graves", column: "severeReports" },
    { title: "N° Relatos Moderados", column: "moderateReports" },
    { title: "Índice De Gravidade", column: "severesIndex" },
    { title: "Reparos Realizados", column: "repairs" },
    { title: "Reparos Pendentes", column: "notRepaireds" },
    { title: "Índice De Reparos", column: "repairedsIndex" },
  ];

  // Calculando os índices para paginação
  const start = (currentPage - 1) * reportsPerPage;
  const end = start + reportsPerPage;
  const paginatedReports = data.slice(start, end);

  const getIconeOrdenacao = (column) => {
    if (order.column === column) {
      return order.direction === "asc" ? "▲" : "▼";
    }
    return "⇅";
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
              return (
                <tr key={index} className={`${style.body__list}`}>
                  <td className="font-s c4">{item.district}</td>
                  <td className="font-s c4">{item.attendeds}</td>
                  <td className="font-s c4">{item.notAttendeds}</td>
                  <td className="font-s c4">{item.severeReports}</td>
                  <td className="font-s c4">{item.moderateReports}</td>
                  <td className="font-s c4">{item.severeIndex}</td>
                  <td className="font-s c4">{item.repairs}</td>
                  <td className="font-s c4">{item.notRepaireds}</td>
                  <td className="font-s c4">{item.repairedsIndex}</td>
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
