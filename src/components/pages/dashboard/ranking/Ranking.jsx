import React from "react";
import style from "./style.module.css";

import { Link } from "react-router-dom";

const Ranking = ({ rank }) => {
  // ORDENA E MOSTA OS 10 PRIMEIROS DO RANK
  const topBairros = rank
    .sort((a, b) => b.quanti_registrada - a.quanti_registrada)
    .slice(0, 10);

  return (
    <section>
      <h3 className={`font-s mb-1-5 c4`}>Bairros mais reportados</h3>

      <Link to="/ranking">
        <ul className={style.ranking}>
          {topBairros.map((bairro, index) => (
            <li key={index} className={style.rankink__item}>
              <div className={style.rankin__left}>
                <span className={`font-xs ${style.ranking__position}`}>
                  {index + 1}
                </span>
                <span className={`font-s c2 ${style.ranking__text}`}>
                  {bairro.nome_bairro}
                </span>
              </div>

              <span className="c2">{bairro.quanti_registrada}</span>
            </li>
          ))}
        </ul>
      </Link>
    </section>
  );
};

export default Ranking;
