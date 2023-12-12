import React from 'react';
import { Image } from 'primereact/image';

const logo = require('../../../assets/logo/logo-small.png');

const CollectionInformationSection: React.FC= () => {
  return (
    <div>   
        <Image src={logo} alt="Logo" />
        <h1>Collection 1</h1>
        <p>Mot bo suu tap boi <strong>Nguyen Trung Thong</strong> </p>
        <p>1 tac pham</p>
        <button>Chinh sua</button>
    </div>
  );
};

export default CollectionInformationSection;
