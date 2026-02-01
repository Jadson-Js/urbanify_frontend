import React from "react";
import style from "./style.module.css";

import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineControl } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { GoTrophy } from "react-icons/go";

const Sidebar = () => {
  return (
    <nav className={`${style.nav}`}>
      <ul className={`${style.nav__list}`}>
        <NavLink
          className={({ isActive }) =>
            `${style.nav__link} ${isActive ? style.active : ""}`
          }
          to="/dashboard"
        >
          <li className={`${style.nav__item}`}>
            <AiOutlineDashboard
              className={`c2 ${style.item__icon}`}
              size={14}
            />
            <span className={`font-xs c2 ${style.nav__text}`}>Dashboard</span>
          </li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${style.nav__link} ${isActive ? style.active : ""}`
          }
          to="/management"
        >
          <li className={`${style.nav__item}`}>
            <AiOutlineControl className={`c2 ${style.item__icon}`} size={14} />
            <span className={`font-xs c2 ${style.nav__text}`}>
              Gestão de reparos
            </span>
          </li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${style.nav__link} ${isActive ? style.active : ""}`
          }
          to="/metrics"
        >
          <li className={`${style.nav__item}`}>
            <VscGraph className={`c2 ${style.item__icon}`} size={14} />
            <span className={`font-xs c2 ${style.nav__text}`}>
              Análises de ocorrência
            </span>
          </li>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${style.nav__link} ${isActive ? style.active : ""}`
          }
          to="/ranking"
        >
          <li className={`${style.nav__item}`}>
            <GoTrophy className={`c2 ${style.item__icon}`} size={14} />
            <span className={`font-xs c2 ${style.nav__text}`}>Ranking</span>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Sidebar;
