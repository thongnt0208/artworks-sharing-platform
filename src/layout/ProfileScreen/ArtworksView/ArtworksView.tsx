import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { TabMenu } from "primereact/tabmenu";

import { DeleteArtworkData, GetArtworksData } from "./ArtworksService";
import ArtworkCard, { ArtworkProps } from "../../../components/ArtworkCard";
import { toast } from "react-toastify";
import { CatchAPICallingError, ProgressSpinner } from "../..";
import "./ArtworksView.scss";

const ArtworksView: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [artworks, setArtworks] = useState<ArtworkProps[]>([]);
  const [selectedArtworkId, setSelectedArtworkId] = useState<string>("");
  const [visibleDialogs, setVisibleDialogs] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(1); // Changed initial active tab index to 0
  const [pageNumber, setPageNumber] = useState(1);

  const items = [{ label: "Đang duyệt" }, { label: "Đã duyệt" }, { label: "Bị từ chối" }];

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
    setPageNumber(1); // Reset page number when tab changes
    setArtworks([]); // Clear artworks when tab changes
  };

  const deleteArtworkHandler = async (artworkId: string) => {
    try {
      const response = await DeleteArtworkData(artworkId);
      if (response === 204) {
        setArtworks(artworks.filter((artwork) => artwork.id !== artworkId));
        toast.success("Xóa tác phẩm thành công");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    } finally {
      setVisibleDialogs(false);
    }
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await GetArtworksData(8, pageNumber, accountId, activeTab);
        if (Array.isArray(response)) {
          setArtworks((prevArtworks) => {
            const uniqueArtworkIds = new Set<string>(prevArtworks.map((artwork) => artwork.id));
            const filteredArtworks = Array.isArray(response)
              ? response.filter((artwork: { id: string }) => !uniqueArtworkIds.has(artwork.id))
              : [];
            return [...prevArtworks, ...filteredArtworks];
          });
        } else {
          toast.error("Lấy dữ liệu tác phẩm thất bại");
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, activeTab, pageNumber]);

  useEffect(() => {
    setIsLoading(true);
    setArtworks([]);
  }, [activeTab]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }
    );

    if (lastArtworkRef.current && observer.current) {
      observer.current.observe(lastArtworkRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);
  return (
    <>
      {isCreator ? (
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
          className="w-max mb-3 text-black-alpha-90 text-sm"
        />
      ) : null}
      <div className="artwork-gallery">
        {isLoading && <ProgressSpinner />}
        {!isLoading && (
          <>
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
                <div className="gallery__item" key={artwork.id}>
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
          </>
        )}
        <ConfirmDialog
          visible={visibleDialogs}
          headerClassName="confirm-dialog-header"
          header="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa tác phẩm này?"
          closable={false}
          onHide={() => setVisibleDialogs(false)}
          footer={
            <div>
              <Button onClick={() => deleteArtworkHandler(selectedArtworkId)}>Xác nhận</Button>
              <Button onClick={() => setVisibleDialogs(false)}>Hủy</Button>
            </div>
          }
        >
          <h3>Bạn có chắc muốn xóa tác phẩm này?</h3>
        </ConfirmDialog>
      </div>
      <div ref={lastArtworkRef}>{/* This is an invisible marker to observe */}</div>
    </>
  );
};

export default ArtworksView;
