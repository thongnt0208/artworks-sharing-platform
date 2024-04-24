import React from "react";
import { Menubar } from "primereact/menubar";
import { Image } from "primereact/image";
import "./Footer.scss";
import { hideFooterRoutes } from "../const/uiConstants";
import { useLocation } from "react-router-dom";

const logo = require("../assets/logo/logo-small.png");

const Footer: React.FC = () => {
  const location = useLocation();
  const currentUrl = location.pathname + location.search + location.hash;

  const items1 = [
    { label: 'Artworkia', icon: '' },
    { label: 'Điều khoản', icon: '', url: '/policy' },
    { label: 'Quyền riêng tư', icon: '', url: '/policy' },
    { label: 'Trợ giúp', icon: '', url: '/policy' },
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
