import React from "react";
import { Image } from "primereact/image";

const logo = require("../../../assets/logo/logo-small.png");

type CollectionInformationProps = {
  collectionInfo: {
    id: string;
    createdBy: string;
    collectionName: string;
    privacy: string;
    creationDate: string;
  };
  // artworkCounter: number;
};

const CollectionInformationSection: React.FC<CollectionInformationProps> = ({
  collectionInfo,
}: CollectionInformationProps) => {
  const { id, createdBy, collectionName, privacy, creationDate } =
    collectionInfo;

  return (
    <div>
      <Image src={logo} alt="Logo" />
      <h1>{collectionName}</h1>
      <p>
        Mot bo suu tap boi <strong>{createdBy}</strong>{" "}
      </p>
      {/* <p>{artworkCounter} tac pham</p> */}
      <button>Chinh sua</button>
    </div>
  );
};


export default CollectionInformationSection;
