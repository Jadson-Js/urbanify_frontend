import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

import CardInfo from "../../components/pages/dashboard/cardInfo/CardInfo";
import MapReports from "../../components/pages/dashboard/mapReports/MapReports";
import Filter from "../../components/filter/Filter";
import Ranking from "../../components/pages/dashboard/ranking/Ranking";

import useUsers from "../../hooks/useUsers";
import useReports from "../../hooks/useReports";
import useResolvedReports from "../../hooks/useResolvedReports";
import {
  filterReports,
  //
  totalReports,
  incrementReports,
  //
  getUniqueDistricts,
  getDistrictsRanking,
  incrementDistrict,
  //
  getUsersServed,
  incrementUsersServed,
  //
  getUsersNotServed,
  incrementUsersNotServed,
} from "../../services/dashboard";

import { ReportStatusEnum } from "../../utils/environment";

const Dashboard = () => {
  const { users } = useUsers();
  const { reports } = useReports();
  const { resolvedReports } = useResolvedReports();

  const [filter, setFilter] = React.useState({
    status: ReportStatusEnum.PENDENTE,
    severity: null,
    date: {
      start: null,
      end: null,
    },
  });

  const [filteredReports, setFilteredReports] = React.useState([]);

  React.useEffect(() => {
    const result = filterReports({ reports, resolvedReports, filter });

    setFilteredReports(result);
  }, [filter, reports, resolvedReports]);

  return (
    <div className={`${style.dashboard}`}>
      <ul>
        <li className={`${style.dash__box__info}`}>
          <Link to="/management">
            <CardInfo
              title={"Total de Ocorrências"}
              value={totalReports(reports)}
              incrementValue={incrementReports(reports)}
            />
          </Link>
        </li>
        <li className={`${style.dash__box__info}`}>
          <Link to="/ranking">
            <CardInfo
              title={"Bairros Catalogados"}
              value={getUniqueDistricts({ reports, resolvedReports }).length}
              incrementValue={incrementDistrict({ reports, resolvedReports })}
            />
          </Link>
        </li>
        <li className={`${style.dash__box__info}`}>
          <Link to="/metrics">
            <CardInfo
              title={"Moradores Atendidos"}
              value={getUsersServed(users)}
              incrementValue={incrementUsersServed(users)}
            />
          </Link>
        </li>
        <li className={`${style.dash__box__info}`}>
          <Link to="/metrics">
            <CardInfo
              title={"Moradores A Serem Atendidos"}
              value={getUsersNotServed(users)}
              incrementValue={incrementUsersNotServed(users)}
            />
          </Link>
        </li>
      </ul>

      <main className={`${style.dash__mapper}`}>
        <Filter filter={filter} setFilter={setFilter} />

        <div className={`${style.map__bg}`}>
          <div className={`${style.map__container}`}>
            <h1 className="font-s c4">
              Mapa De Ocorrências que não foram resolvidas
            </h1>
            <MapReports reports={filteredReports} />
          </div>

          <Ranking
            rank={getDistrictsRanking({
              reports: filteredReports,
            })}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
