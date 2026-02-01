import React from "react";
import style from "./style.module.css";
import Status from "./status/Status";
import FilterSeverity from "./severity/Severity";
import DateRanger from "./dateRanger/DateRanger";
import Search from "./search/Search";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className={`${style.filter}`}>
      <div className={`${style.top}`}>
        <Status filter={filter} setFilter={setFilter} />
        <FilterSeverity filter={filter} setFilter={setFilter} />
        <DateRanger filter={filter} setFilter={setFilter} />
        {"districtTarget" in filter && (
          <Search filter={filter} setFilter={setFilter} />
        )}
      </div>
    </div>
  );
};

export default Filter;
