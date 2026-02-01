import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import style from "./style.module.css";

const RootLayout = () => {
  return (
    <>
      <Navbar />

      <div className={`${style.layout}`}>
        <Sidebar />

        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
