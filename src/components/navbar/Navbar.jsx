import React from "react";
import style from "./style.module.css";

const Navbar = () => {
  return (
    <nav className={`${style.navbar}`}>
      <div className={`${style.navbar__content}`}>
        <div className={`${style.logo__frame}`}>
          <h1 className={`font-logo c12`}>URBANIFY</h1>
          {/* <img
            src="/src/assets/images/logo-white.svg "
            className={`img ${style.logo__img}`}
            alt="image simples"
          /> */}
        </div>
        <div className={`${style.header__perfil}`}>
          <img
            className={`${style.header__perfil__img}`}
            src="/src/assets/images/profile.png"
          />
          <span className={`font-s c12`}>Secretário</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
