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
  const [visibleDialogs, setVisibleDialogs] = React.useState<
    Record<string, boolean>
  >({});

  const openDialog = (artworkId: string) => {
    setVisibleDialogs((prev) => ({ ...prev, [artworkId]: true }));
  };

  const closeDialog = (artworkId: string) => {
    setInterval(() => {
      setVisibleDialogs((prev) => ({ ...prev, [artworkId]: false }));
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

          <Dialog
            className="save-popup-dialog"
            visible={visibleDialogs[artwork.id] || false}
            showHeader={false}
            dismissableMask={true}
            contentClassName="save-popup-dialog"
            modal
            closable={false}
            onHide={() => closeDialog(artwork.id)}
          >
            <>
              <SavePopup
                artworkId={artwork.id}
                closeDialog={() => closeDialog(artwork.id)}
              />
            </>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
