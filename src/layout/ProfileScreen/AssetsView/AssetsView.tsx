import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";
import { CatchAPICallingError } from "../..";
import { GetAssetsData, GetBoughtAssetsData } from "./AssetsService";
import BoughtAssets, {
  BoughtAssetsProps,
} from "./BoughtAssetsSection/BoughtAssets";
import AssetsCard, { AssetsProps } from "../../../components/AssetsCard";
import "./AssetsView.scss";

const AssetsView: React.FC = () => {
  const navigate = useNavigate();
  const [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [assets, setAssets] = useState<AssetsProps[]>([]);
  const [boughtAssets, setBoughtAssets] = useState<BoughtAssetsProps[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastAssetRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
  };

  const items = [{ label: "Đã đăng" }, { label: "Đã mua" }];

  useEffect(() => {
    const fetchAssets = async () => {
      setPageNumber(1);
      try {
        if (activeTab === 0) {
          console.log("Page number: ", pageNumber);
          const response = await GetAssetsData(accountId, pageNumber, 3);
          if (Array.isArray(response)) {
            setAssets((prevAssets) => {
              const uniqueAssetIds = new Set<string>(
                prevAssets.map((asset) => asset.id)
              );
              const filteredAssets = Array.isArray(response)
                ? response.filter(
                    (asset: { id: string }) => !uniqueAssetIds.has(asset.id)
                  )
                : [];
              return [...prevAssets, ...filteredAssets];
            });
          } else {
            toast.error("Lấy dữ liệu tài nguyên thất bại!");
          }
        } else if (activeTab === 1) {
          console.log("Page number: ", pageNumber);
          const response = await GetBoughtAssetsData(accountId, pageNumber, 10);
          if (Array.isArray(response)) {
            setBoughtAssets((prevAssets) => {
              const uniqueAssetIds = new Set<string>(
                prevAssets.map((asset) => asset.id)
              );
              const filteredAssets = Array.isArray(response)
                ? response.filter(
                    (asset: { id: string }) => !uniqueAssetIds.has(asset.id)
                  )
                : [];
              return [...prevAssets, ...filteredAssets];
            });
          } else {
            toast.error("Lấy dữ liệu tài nguyên thất bại!");
          }
        } else {
          toast.error("Lấy dữ liệu tài nguyên thất bại!");
        }
      } catch (error) {
        CatchAPICallingError(error, navigate);
      }
    };
    fetchAssets();
  }, [accountId, navigate, pageNumber, activeTab]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }
    );

    if (lastAssetRef.current && observer.current) {
      observer.current.observe(lastAssetRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="assets-gallery-container">
      {isCreator ? (
        <TabMenu
          model={items}
          activeIndex={activeTab}
          onTabChange={handleTabChange}
          className="w-max mb-3 text-black-alpha-90 text-sm"
        />
      ) : null}

      {activeTab === 0 ? (
        <div className="gallery">
          {assets.length === 0 ? (
            isCreator ? (
              <Card className="add-asset-card">
                <div className="cursor-pointer flex flex-column justify-content-center align-items-center">
                  <i className="pi pi-plus-circle icon m-3" />
                  <Button
                    label="Thêm tài nguyên"
                    onClick={() => {
                      navigate("/artwork/post");
                    }}
                  ></Button>
                </div>
              </Card>
            ) : (
              <div> Tác giả chưa có tài nguyên nào </div>
            )
          ) : (
            assets.map((asset, index) => (
              <div className="gallery__item col col-12" key={index}>
                <AssetsCard
                  id={asset.id}
                  thumbnail={asset.thumbnail}
                  itemsList={asset.itemsList}
                  isCreator={isCreator}
                  saveHandler={(id: string) => {}}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="gallery">
          {boughtAssets.length === 0 ? (
            <div> Bạn chưa mua tài nguyên nào </div>
          ) : (
            boughtAssets.map((asset, index) => (
              <div className="gallery__item col col-12" key={index}>
                <BoughtAssets
                  id={asset.id}
                  artworkId={asset.artworkId}
                  order={asset.order}
                  assetTitle={asset.assetTitle}
                  description={asset.description}
                  assetName={asset.assetName}
                  price={asset.price}
                  isBought={asset.isBought}
                  fileMetaData={asset.fileMetaData}
                  lastModificatedOn={asset.lastModificatedOn}
                />
              </div>
            ))
          )}
        </div>
      )}

      <div ref={lastAssetRef}>
        {/* This is an invisible marker to observe */}
      </div>
    </div>
  );
};

export default AssetsView;
