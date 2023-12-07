import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import DefaultButton from './Button';

const logo = require("../assets/logo/logo-small.png")

const Footer: React.FC = () => {
  const items = [
    <DefaultButton text="Artworkia" onClick={() => {}} />,
    <DefaultButton text="Điều khoản" onClick={() => {}} />,
    <DefaultButton text="Quyền riêng tư" onClick={() => {}} />,
    <DefaultButton text="Trợ giúp" onClick={() => {}} />,
  ];
  const endItems = [
    [<Image src={logo} alt="Logo" width="100px" style={{padding: "0"}} />]
  ]
  return (
    <footer>
      <Menubar start={items} end={endItems} style={{ width: "100%" }} />
    </footer>
  );
};

export default Footer;