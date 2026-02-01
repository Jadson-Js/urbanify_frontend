import React from "react";
import style from "./style.module.css";
import { ButtonSeverity } from "../../../buttons/ButtonSeverity";
import { filterSeverityEnum } from "../../../../utils/environment";
import { createReport } from "../../../../services/createReport";

const ModalCreateReport = ({ setModalOpen, createReportData }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [severitySelected, setSeveritySelected] = React.useState(1);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  const handleCreateReport = async () => {
    const { address, lat, lon, file } = createReportData;

    /*
      {  "subregion": "São Luís",  "district": "Liberdade",  "street": "Rua Machado De Assis",  "severity": "MODERADO",  "coordinates": {    "latitude": "-2.5326829319191773",    "longitude": "-44.28404809576579"  }}
    */
    const data = {
      subregion: address.city,
      district: address.suburb,
      street: address.road,
      severity:
        severitySelected == filterSeverityEnum.SEVERE ? "GRAVE" : "MODERADO",
      coordinates: { latitude: lat, longitude: lon },
    };

    const response = await createReport({ data, file });
    console.log(response);
  };

  React.useEffect(() => {
    if (
      createReportData.address !== undefined &&
      createReportData.lat &&
      createReportData.lon
    ) {
      setIsLoading(false);
    }
  }, [createReportData]);

  return (
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={style.card}>
        <div className={`${style.card__content}`}>
          <h3 className={`font-l-b c2 mb-1 ${style.card__title}`}>
            Avalie a gravidade do problema
          </h3>

          <p className={`font-s c4 mb-2`}>
            Selecione o nível de gravidade com base no impacto que o buraco
            causa na via
          </p>

          <div className={`font-m c4 mb-2 ${style.card__buttons_top}`}>
            <ButtonSeverity
              severity={filterSeverityEnum.MODERATE}
              severitySelected={severitySelected}
              setSeveritySelected={setSeveritySelected}
            />

            <ButtonSeverity
              severity={filterSeverityEnum.SEVERE}
              severitySelected={severitySelected}
              setSeveritySelected={setSeveritySelected}
            />
          </div>

          <div className={`${style.card__buttons_bottom}`}>
            <button
              className={` font-s btn btn-primary ${style.button}`}
              onClick={handleCreateReport}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={style.spinner} />
                  Carregando...
                </>
              ) : (
                "Enviar"
              )}
            </button>

            <button
              className={` font-s btn btn-outline ${style.button}`}
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateReport;
