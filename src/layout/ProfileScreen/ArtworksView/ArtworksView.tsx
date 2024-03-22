import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DeleteArtworkData, GetArtworksData } from "./ArtworksService";
import { Toast } from "primereact/toast";

import ArtworkCard, { ArtworkProps } from "../../../components/ArtworkCard";
import "./ArtworksView.scss";
import { Dialog } from "primereact/dialog";
import { TabMenu } from "primereact/tabmenu";

const ArtworksView: React.FC = () => {
  const toast = useRef<Toast>(null);
  let navigate = useNavigate();
  let [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [artworks, setArtworks] = React.useState<ArtworkProps[]>([]);
  const [selectedArtworkId, setSelectedArtworkId] = React.useState<string>("");
  const [visibleDialogs, setVisibleDialogs] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);

  const items = [
    { label: "Đã duyệt"},
    { label: "Đang duyệt" },
    { label: "Bị từ chối" },
  ];

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Hệ thống lỗi",
      life: 3000,
    });
  };

  const deleteArtworkHandler = async (artworkId: string) => {
    try {
      const response = await DeleteArtworkData(artworkId);
      if (response) {
        setArtworks(artworks.filter((artwork) => artwork.id !== artworkId));
      } else {
        showError();
      }
    } catch (error) {
      showError();
    } finally {
      setVisibleDialogs(false);
    }
  };

  React.useEffect(() => {
    const fetchArtworks = async () => {
      const response = await GetArtworksData(10, 1, accountId);
      if (Array.isArray(response)) {
        setArtworks(response);
      } else {
        showError();
      }
    };
    fetchArtworks();
  }, [accountId]);

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
  };

  return (
    <>
      {/* <h1 className="">Các tác phẩm</h1> */}
      {isCreator ? (
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
          className="w-max mb-3 text-black-alpha-90 text-sm"
        />
      ) : null}
      <div className="gallery grid p-0 flex justify-content-start">
        {artworks.length === 0 ? (
          isCreator ? (
            <Card className="add-artwork-card cursor-pointer flex flex-column justify-content-center align-items-center">
              <i className="pi pi-plus-circle icon m-3" />
              <Button
                label="Tạo tác phẩm"
                onClick={() => {
                  navigate("/artwork/post");
                }}
              ></Button>
            </Card>
          ) : (
            <div> Tác giả chưa có tác phẩm nào </div>
          )
        ) : (
          artworks.map((artwork) => (
            <div className="gallery__item col col-4" key={artwork.id}>
              <ArtworkCard
                key={artwork.id}
                id={artwork.id}
                title={artwork.title}
                isCreator={isCreator}
                privacy={artwork.privacy}
                createdBy={artwork.createdBy}
                creatorFullName={artwork.creatorFullName}
                thumbnail={artwork.thumbnail}
                likeCount={artwork.likeCount}
                viewCount={artwork.viewCount}
                deleteHandler={() => {
                  setVisibleDialogs(true);
                  setSelectedArtworkId(artwork.id);
                }}
                updateHandler={() => navigate("/artwork/post")}
                viewHandler={() => navigate(`/artwork/${artwork.id}`)}
              />
            </div>
          ))
        )}
        <Dialog
          visible={visibleDialogs}
          headerClassName="confirm-dialog-header"
          header="Xác nhận xóa"
          closable={false}
          onHide={() => setVisibleDialogs(false)}
          footer={
            <div>
              <Button onClick={() => deleteArtworkHandler(selectedArtworkId)}>
                Xác nhận
              </Button>
              <Button onClick={() => setVisibleDialogs(false)}>Hủy</Button>
            </div>
          }
        >
          <h3>Bạn có chắc muốn xóa tác phẩm này?</h3>
        </Dialog>
      </div>
    </>
  );
};

export default ArtworksView;
