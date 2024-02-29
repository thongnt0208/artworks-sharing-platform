import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import "./CollectionGallery.scss";
import ArtworkCard from "../../../components/ArtworkCard";
import { RemoveArtworkFromCollection } from "../CollectionDetailService";
import { Link } from "react-router-dom";

type Artwork = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  createdBy: string;
  creatorFullName: string;
};

type ArtworkProps = {
  collectionId: string;
  artworks: Artwork[];
  updateArtworks: (artworkId: string) => void;
};

const CollectionGallery: React.FC<ArtworkProps> = ({
  collectionId,
  artworks: initialArtworks,
  updateArtworks,
}) => {
  const toast = useRef<Toast>(null);
  const [visibleDialogs, setVisibleDialogs] = useState<Record<string, boolean>>(
    {}
  );
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);

  const accept = () => {
    toast.current?.show({
      severity: "success",
      summary: "Thành công",
      detail: "Xóa thành công khỏi bộ sưu tập",
      life: 2000,
    });
  };

  const reject = () => {
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Xóa bị lỗi",
      life: 2000,
    });
  };

  const showDialog = (artworkId: string) => {
    setVisibleDialogs((prevVisibleDialogs) => ({
      ...prevVisibleDialogs,
      [artworkId]: true,
    }));
  };

  const hideDialog = (artworkId: string) => {
    setVisibleDialogs((prevVisibleDialogs) => ({
      ...prevVisibleDialogs,
      [artworkId]: false,
    }));
  };

  const confirm = (artworkId: string) => {
    showDialog(artworkId);
  };

  const handleRemoveArtworkFromCollection = async (
    collectionId: string,
    artworkId: string
  ) => {
    try {
      const response = await RemoveArtworkFromCollection({
        collectionId,
        artworkId,
      });
      if (response) {
        accept();
      } else {
        reject();
      }
    } catch {
      reject();
    } finally {
      hideDialog(artworkId);
      updateArtworks(artworkId);
    }
  };

  useEffect(() => {
    setArtworks(initialArtworks);
  }, [initialArtworks]);

  return (
    <div className="collection-gallery ">
      {artworks.length === 0 ? (
        <div className="empty-gallery w-6 mt-8 flex flex-column justify-content-center align-items-center">
          <Link
            className="text-4xl"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#7B7B7B",
            }}
            to={"/"}
          >
            Tìm những tác phẩm cho bộ sưu tập của bạn
          </Link>
          <p className="text-3xl text-center" style={{ color: "#7B7B7B" }}>
            Sử dụng bộ sưu tập để lưu lại những tác phẩm cho việc nghiên cứu, 
            tạo cảm hứng, hoặc chỉ đơn giản bạn yêu thích chúng.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-column justify-content-start align-items-start">
          <p className="title">Các tác phẩm</p>
          <div className="gallery">
            {artworks.map((artwork) => (
              <>
                <ArtworkCard
                  id={artwork.id}
                  title={artwork.title}
                  thumbnail={artwork.thumbnail}
                  viewCount={artwork.viewCount}
                  likeCount={artwork.likeCount}
                  createdBy={artwork.createdBy}
                  creatorFullName={artwork.creatorFullName}
                  saveHandler={() => confirm(artwork.id)}
                  onRemoveFromCollection={true}
                />
                <Dialog
                  visible={visibleDialogs[artwork.id] || false}
                  headerClassName="confirm-dialog-header"
                  header="Xác nhận xóa"
                  closable={false}
                  onHide={() => hideDialog(artwork.id)}
                  footer={
                    <div>
                      <Button
                        onClick={() =>
                          handleRemoveArtworkFromCollection(
                            collectionId,
                            artwork.id
                          )
                        }
                      >
                        Xác nhận
                      </Button>
                      <Button onClick={() => hideDialog(artwork.id)}>
                        Hủy
                      </Button>
                    </div>
                  }
                >
                  <h3>Bạn có chắc muốn xóa tác phẩm này khỏi bộ sưu tập?</h3>
                </Dialog>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionGallery;
