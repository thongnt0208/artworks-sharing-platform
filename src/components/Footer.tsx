import React from "react";
import { Menubar } from "primereact/menubar";
import { Image } from "primereact/image";
import DefaultButton from "./Button";
import "./Footer.scss";
import { hideFooterRoutes } from "../const/uiConstants";
import { useLocation } from "react-router-dom";

const logo = require("../assets/logo/logo-small.png");

const Footer: React.FC = () => {
  const location = useLocation();
  const currentUrl = location.pathname + location.search + location.hash;

  const items = [
    <DefaultButton text="Artworkia" icon="" onClick={() => {}} key="logo"/>,
    <DefaultButton text="Điều khoản" icon="" onClick={() => {}} key="dieu-khoan" />,
    <DefaultButton text="Quyền riêng tư" icon="" onClick={() => {}} key="quyen-rieng-tu"/>,
    <DefaultButton text="Trợ giúp" icon="" onClick={() => {}} key="tro-giup"/>,
  ];

  const endItems = [[<Image src={logo} alt="Logo" />]];

  return (
    <footer
      className={`footer ${
        hideFooterRoutes.some((route) => currentUrl.includes(`/${route}`)) ? "hidden" : ""
      }`}
    >
      <Menubar className="menubar" start={items} end={endItems} />
    </footer>
  );
};

export default Footer;
