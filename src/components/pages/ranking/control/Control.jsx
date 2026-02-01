import React from "react";
import style from "./style.module.css";
import DateRanger from "../../../filter/dateRanger/DateRanger";
import Search from "../../../filter/search/Search";

import { generateExcel } from "../../../../utils/generateExcel";

const Control = ({ filter, setFilter, data }) => {
  const handleDownload = () => {
    generateExcel(data);
  };

  return (
    <div className={`${style.control}`}>
      <div className={`${style.left}`}>
        <Search filter={filter} setFilter={setFilter} />
        <DateRanger filter={filter} setFilter={setFilter} />
      </div>

      <button
        className={`font-xs c4 btn-primary ${style.button}`}
        onClick={handleDownload}
      >
        Baixa planilha
      </button>
    </div>
  );
};

export default Control;
