import React from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

import ArtworkCard from "./ArtworkCard";
import SavePopup from "./SavePopup";
import "./Gallery.scss";

export type Artwork = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  createdBy: string;
  creatorFullName: string;
};

type ArtworksProps = {
  artworks: Artwork[];
};

const Gallery: React.FC<ArtworksProps> = ({ artworks }) => {
  const navigate = useNavigate();
  const [isShowDialog, setIsShowDialog] = React.useState<boolean>(false);
  const [selectedArtwork, setSelectedArtwork] = React.useState<string>("");

  const openDialog = (artworkId: string) => {
    setIsShowDialog(true);
    setSelectedArtwork(artworkId);
  };

  const closeDialog = () => {
    setTimeout(() => {
      setIsShowDialog(false);
    }, 2000);
  };

  return (
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
            viewHandler={() => navigate(`/artwork/${artwork.id}`)}
            saveHandler={() => openDialog(artwork.id)}
          />
        </div>
      ))}
      <Dialog
        className="save-popup-dialog"
        visible={isShowDialog}
        showHeader={false}
        dismissableMask={true}
        contentClassName="save-popup-dialog"
        modal
        closable={false}
        onHide={closeDialog}
      >
        <>
          <SavePopup artworkId={selectedArtwork} closeDialog={closeDialog} />
        </>
      </Dialog>
    </div>
  );
};

export default Gallery;
