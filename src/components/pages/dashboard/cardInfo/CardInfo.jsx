import React from "react";
import style from "./style.module.css";

import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

const CardInfo = ({ title, value, incrementValue }) => {
  let incrementText;

  if (title === "Moradores A Serem Atendidos") {
    incrementValue = incrementValue * -1;

    incrementText =
      incrementValue < 0
        ? `Acréscimo de ${incrementValue}%`
        : `Redução de ${incrementValue}%`;
  } else {
    incrementText =
      incrementValue > 0
        ? `Acréscimo de ${incrementValue}%`
        : `Redução de ${incrementValue}%`;
  }

  if (title === "Bairros Catalogados")
    incrementText = `Corbertura de ${incrementValue}% dos bairros`;

  let incrementIcon =
    incrementValue > 0 ? (
      <FaCaretUp className="green" />
    ) : (
      <FaCaretDown className="red" />
    );

  return (
    <div className={`${style.card__container}`}>
      <span className="font-s c4">{title}</span>
      <span className={`font-xl c2 ${style.value}`}>{value}</span>

      <div className={`${style.card__increment}`}>
        <span className="font-xs c4">{incrementText}</span>
        {incrementIcon}
      </div>
    </div>
  );
};

export default CardInfo;
