import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import ArtworkCard, { ArtworkProps } from "./ArtworkCard";
import SavePopup from "./SavePopup";
import "./Gallery.scss";
import { awDetailStateToolsType } from "../layout/HomeScreen/HomeScreen";
import ArtworkDetailDialog from "../layout/ArtworkDetailScreen/ArtworkDetailDialog";

type ArtworksProps = {
  artworks: ArtworkProps[];
  awDetailStateTools: awDetailStateToolsType;
};

const Gallery: React.FC<ArtworksProps> = ({ artworks, awDetailStateTools }) => {
  const { setSelectingAw } = awDetailStateTools;
  const [isShowSaveDialog, setIsShowSaveDialog] = useState<boolean>(false);
  const [selectedArtworks, setSelectedArtworks] = useState<string>("");
  const [isShowDetailDialog, setIsShowDetailDialog] = useState(false);

  const openDialog = (artworkId: string) => {
    setIsShowSaveDialog(true);
    setSelectedArtworks(artworkId);
  };

  const closeDialog = () => {
    setTimeout(() => {
      setIsShowSaveDialog(false);
    }, 2000);
  };

  return (
    <>
      <div className="gallery w-full p-0 flex flex-wrap justify-content-center">
        {artworks.map((artwork) => (
          <div
            className="gallery__item flex flex-row flex-wrap justify-content-center"
            key={artwork.id}
            onClick={() => {
              setIsShowDetailDialog(true);
              setSelectingAw(artwork);
            }}
          >
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              createdBy={artwork.createdBy}
              creatorFullName={artwork.creatorFullName}
              thumbnail={artwork.thumbnail}
              likeCount={artwork.likeCount}
              viewCount={artwork.viewCount}
              viewHandler={() => {}}
              saveHandler={() => openDialog(artwork.id)}
            />
          </div>
        ))}
        <Dialog
          className="save-popup-dialog"
          visible={isShowSaveDialog}
          showHeader={false}
          dismissableMask={true}
          contentClassName="save-popup-dialog"
          modal
          closable={false}
          onHide={closeDialog}
        >
          <SavePopup artworkId={selectedArtworks} closeDialog={closeDialog} />
        </Dialog>
      </div>
      <ArtworkDetailDialog
        visible={isShowDetailDialog}
        setVisible={setIsShowDetailDialog}
        awDetailStateTools={awDetailStateTools}
      />
    </>
  );
};

export default Gallery;
