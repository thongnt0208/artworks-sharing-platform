import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import ArtworkCard, { ArtworkProps } from "./ArtworkCard";
import SavePopup from "./SavePopup";
import ArtworkDetailDialog from "../layout/ArtworkDetailScreen/ArtworkDetailDialog";
import { awDetailStateToolsType } from "../layout/HomeScreen/HomeScreen";

import "./Gallery.scss";

type ArtworksProps = {
  artworks: ArtworkProps[];
  awDetailStateTools: awDetailStateToolsType;
};

const Gallery: React.FC<ArtworksProps> = ({ artworks, awDetailStateTools }) => {
  const { selectingAw, setSelectingAw } = awDetailStateTools;
  const [isShowSaveDialog, setIsShowSaveDialog] = useState<boolean>(false);
  const [isShowDetailDialog, setIsShowDetailDialog] = useState(false);

  const openSaveDialog = (artwork: ArtworkProps) => {
    setIsShowSaveDialog(true);
    setSelectingAw(artwork);
  };

  const openDetailDialog = (artwork: ArtworkProps) => {
    setIsShowDetailDialog(true);
    setSelectingAw(artwork);
    const newUrlText = `/artwork/${artwork?.id}`;
    const newUrl = `${window.location.origin}${newUrlText}`;
    window.history.pushState(null, '', newUrl);
  };

  return (
    <>
      <div className="gallery w-full p-0 flex flex-wrap justify-content-center">
        {artworks.map((artwork) => (
          <div
            className="gallery__item flex flex-row flex-wrap justify-content-center"
            key={artwork.id}
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
              viewHandler={() => openDetailDialog(artwork)}
              saveHandler={() => openSaveDialog(artwork)}
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
          onHide={() => setIsShowSaveDialog(false)}
          style={{ width: "20vw" }}
        >
          <SavePopup artworkId={selectingAw?.id} closeDialog={() => setIsShowSaveDialog(false)} />
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
