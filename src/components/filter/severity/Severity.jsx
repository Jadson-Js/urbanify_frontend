import React from "react";
import style from "./style.module.css";
import { filterSeverityEnum } from "../../../utils/environment";

const FilterServerity = ({ filter, setFilter }) => {
  return (
    <ul className={`${style.filter__list}`}>
      <li
        className={`font-xs  ${style.list__item}  ${filter.severity == null && style.select}`}
        onClick={() => setFilter({ ...filter, severity: null })}
      >
        Todos
      </li>
      <li
        className={`font-xs  ${style.list__item} ${filter.severity === filterSeverityEnum.SEVERE && style.select}`}
        onClick={() =>
          setFilter({ ...filter, severity: filterSeverityEnum.SEVERE })
        }
      >
        Graves
      </li>
      <li
        className={`font-xs  ${style.list__item} ${filter.severity === filterSeverityEnum.MODERATE && style.select}`}
        onClick={() =>
          setFilter({ ...filter, severity: filterSeverityEnum.MODERATE })
        }
      >
        Moderados
      </li>
    </ul>
  );
};

export default FilterServerity;
