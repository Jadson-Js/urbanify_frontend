import React from "react";
import style from "./style.module.css";

import { filterSeverityEnum } from "../../utils/environment";
import { GoAlertFill } from "react-icons/go";

export const ButtonSeverity = ({
  severitySelected,
  setSeveritySelected,
  severity,
}) => {
  const handleSeverityClick = () => {
    if (severity == filterSeverityEnum.SEVERE) {
      setSeveritySelected(filterSeverityEnum.SEVERE);
    } else {
      setSeveritySelected(filterSeverityEnum.MODERATE);
    }
  };

  return (
    <button
      onClick={() => handleSeverityClick()}
      className={`btn font-s c2  ${style.button} ${severity == filterSeverityEnum.SEVERE ? style.button__severe : style.button__moderate} 
        ${severitySelected == filterSeverityEnum.SEVERE && severity == filterSeverityEnum.SEVERE ? style.bg__severe : ""}
        ${severitySelected == filterSeverityEnum.MODERATE && severity == filterSeverityEnum.MODERATE ? style.bg__moderate : ""}`}
    >
      <div
        className={`font-m   ${style.button__icon} ${severity == filterSeverityEnum.SEVERE ? style.button__icon__severe : style.button__icon__moderate}
          `}
      >
        <GoAlertFill />
      </div>
      {severity == filterSeverityEnum.SEVERE ? "Grave " : "Moderado"}
    </button>
  );
};
