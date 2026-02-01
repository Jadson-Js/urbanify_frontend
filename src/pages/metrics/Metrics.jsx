import React from "react";
import style from "./style.module.css";
import Header from "../../components/header/Header";
import Card from "../../components/pages/metrics/card/Card";
import { ChartEnum } from "../../utils/environment";

function Metrics() {
  return (
    <>
      <Header
        title="Análises De Ocorrência"
        text="Acompanhe o desempenho da cidade através de gráficos. A ação tomada com base em dados potencializa a eficiência da gestão."
      />

      <main className={`m-1-5 ${style.main}`}>
        <div className={`mb-1 ${style.grid2x1}`}>
          <Card data={ChartEnum.REPORTS__YEAR} />
          <Card data={ChartEnum.REPORTS__MONTH} />
        </div>

        <div className={`mb-1 ${style.grid3x1}`}>
          <Card data={ChartEnum.ATTENDED__NOT_ATTENDED} />
          <Card data={ChartEnum.FIX__FIXED} />
          <Card data={ChartEnum.SEVERE__MODERATE} />
        </div>

        <div className={`${style.grid2x1}`}>
          <Card data={ChartEnum.ATTENDEDS__MONTH} />
          <Card data={ChartEnum.USERS__YEAR} />
        </div>
      </main>
    </>
  );
}

export default Metrics;
