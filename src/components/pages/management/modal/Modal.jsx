import React from "react";
import style from "./style.module.css";

import { ReportContext } from "../../../../context/reportContext";

import LazyImage from "../../../loadings/LazyImage";

import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Card = ({ setModalOpen, urls, setUrls }) => {
  const { modalData, setModalData } = React.useContext(ReportContext);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? urls.length - 1 : prevIndex - 1,
    );
  };

  const reportDate = () => {
    const created_at = new Date(modalData.created_at);

    return (
      <span className="font-m">
        {String(created_at.getDate()).padStart(2, "0")}/
        {String(created_at.getMonth() + 1).padStart(2, "0")}/
        {String(created_at.getFullYear())}
      </span>
    );
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
      setModalData(undefined);
      setUrls([]);
    }
  };

  return (
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={style.card}>
        <div className={style.card__frame}>
          <GrFormPrevious
            className={`font-xl c12 ${style.prev}`}
            onClick={handlePrev}
          />
          <GrFormNext
            className={`font-xl c12 ${style.next}`}
            onClick={handleNext}
          />

          <LazyImage
            src="https://photos.wikimapia.org/p/00/02/25/32/83_big.jpg"
            alt="Exemplo"
          />
        </div>

        <div className={`${style.card__content}`}>
          <h3 className={`font-l-b c2 mb-1 ${style.card__title}`}>
            Confirmação de Reparo
          </h3>

          <p className={`font-m-b c2 mb-05`}>
            LOCAL:{" "}
            <span className={`font-m c4`}>
              {modalData.street}, {modalData.district} - {modalData.subregion}
            </span>
            .
          </p>
          <p className={`font-m-b c2 mb-1`}>
            TOTAL DE RELATOS:{" "}
            <span className={`font-m c4`}>
              {modalData.childrens.length} desde {reportDate()}.{" "}
            </span>
          </p>

          <p className={`font-s c4 mb-2`}>
            Ao confirmar o reparo, todos os cidadãos que reportaram serão
            notificados de que a ocorrência será incluída no plano de reparos.
          </p>

          <div className={`font-m c4  ${style.card__buttons}`}>
            <button
              className={`font-s btn-outline ${style.card__button}`}
              onClick={handleOverlayClick}
            >
              Cancelar
            </button>

            <button
              className={`font-s btn-primary ${style.card__button}`}
              onClick={() => handleOverlayClick()}
            >
              Confirmar reparo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
