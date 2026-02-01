import React from "react";
import style from "./style.module.css";

import { ReportStatusEnum } from "../../../utils/environment";

function Status({ filter, setFilter }) {
  return (
    <div className={`font-m c4 ${style.filter__PR}`}>
      <span
        className={`${filter.status == ReportStatusEnum.PENDENTE && style.selected}`}
        onClick={() =>
          setFilter({ ...filter, status: ReportStatusEnum.PENDENTE })
        }
      >
        Pendentes
      </span>
      <span
        className={`${filter.status == ReportStatusEnum.CONCLUIDO && style.selected}`}
        onClick={() =>
          setFilter({ ...filter, status: ReportStatusEnum.CONCLUIDO })
        }
      >
        Resolvidos
      </span>
    </div>
  );
}

export default Status;
