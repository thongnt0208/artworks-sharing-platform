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
    <DefaultButton text="Artworkia" icon="" onClick={() => { }} key="logo" />,
    <DefaultButton text="Điều khoản" icon="" onClick={() => { }} key="dieu-khoan" />,
    <DefaultButton text="Quyền riêng tư" icon="" onClick={() => { }} key="quyen-rieng-tu" />,
    <DefaultButton text="Trợ giúp" icon="" onClick={() => { }} key="tro-giup" />,
  ];

  const items1 = [
    { label: 'Artworkia', icon: '' },
    { label: 'Điều khoản', icon: '' },
    { label: 'Quyền riêng tư', icon: '' },
    { label: 'Trợ giúp', icon: '' },
  ];
  const endItems = [[<Image src={logo} alt="Logo" height="28" />]];

  return (
    <footer
      className={`footer h-3rem ${hideFooterRoutes.some((route) => currentUrl.includes(`/${route}`)) ? "hidden" : ""}`}
    >
      <Menubar className="menubar fixed w-full bottom-0" model={items1} end={endItems} />
    </footer>
  );
};

export default Footer;
