import React from "react";
import style from "./style.module.css";

const Header = ({ title, text }) => {
  return (
    <header className={style.header}>
      <h1 className={`font-l mb-1 c2 ${style.header__title}`}>{title}</h1>
      <p className={`font-s c4 ${style.text}`}>{text}</p>
    </header>
  );
};

export default Header;
