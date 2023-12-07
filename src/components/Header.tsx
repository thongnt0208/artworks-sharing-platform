import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';

import DefaultButton from "./Button";
const logo = require("../assets/logo/logo-small.png");
const avatar = require("../assets/defaultImage/default-avatar.png")

const Header = () => {
  let isLogin = false;
  const startItems = [[<Image src={logo} alt="Logo" width="100px" style={{padding: "0"}} />]];
  const items = [
    {
      label: "Khám phá",
    },
    {
      label: "Thuê",
    },
    {}
  ];

  const endItems = [
    <InputText type="text" placeholder="Search" className="p-inputtext-sm" />,
    <DefaultButton text="Đăng tác phẩm" onClick={() => {}} />,
    <DefaultButton icon="pi pi-inbox" onClick={() => {}} />,
    <DefaultButton icon="pi pi-bell" onClick={() => {}} />,
    <DefaultButton icon="pi pi-user" onClick={() => {}} />,
    <Avatar image={avatar} size="large" />
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Menubar start={() => startItems} model={items} end={endItems} style={{ width: "100%" }} />
    </div>
  );
};

export default Header;
