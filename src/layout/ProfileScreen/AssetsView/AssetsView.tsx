import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useLocation, useOutletContext } from "react-router-dom";
import { CatchAPICallingError, ProgressSpinner } from "../..";
import { GetAssetsData, GetBoughtAssetsData, RemoveAssetData } from "./AssetsService";
import BoughtAssets, { BoughtAssetsProps } from "./BoughtAssetsSection/BoughtAssets";
import AssetsCard, { AssetsProps } from "../../../components/AssetsCard";
import { GetAssetDownloadLinkById } from "../../ArtworkDetailScreen/dialogs/Service";
import { GetWalletData } from "../WalletView/WalletService";
import { WalletProps } from "../WalletView/WalletView";
import { BuyAsset } from "../../ArtworkDetailScreen/Service";
import { ConfirmDialog } from "primereact/confirmdialog";
import { numberToXu } from "../../../util/CurrencyHandle";
import "./AssetsView.scss";
import { getAuthInfo } from "../../../util/AuthUtil";

const AssetsView: React.FC = () => {
  const navigate = useNavigate();
  const creatorId = getAuthInfo()?.id;
  let boughtAssetTabValue = useLocation().state?.boughtAssetTabValue;
  const [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsProps[]>([]);
  const [boughtAssets, setBoughtAssets] = useState<BoughtAssetsProps[]>([]);
  const [chosenAssetId, setChosenAssetId] = useState<string>();
  const [chosenAssetPrice, setChosenAssetPrice] = useState<number>();
  const [walletData, setWalletData] = useState({} as WalletProps);
  const [isShowBuyAssetDialog, setIsShowBuyAssetDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(boughtAssetTabValue || 0);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteAssetId, setDeleteAssetId] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastAssetRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
  };

  const saveAssetHandler = (id: string, price?: number) => {
    setChosenAssetId(id);
    setChosenAssetPrice(price);
    if (price && price > 0 && !isCreator) {
      getWalletData();
      setIsShowBuyAssetDialog(true);
    } else {
      GetAssetDownloadLinkById(id)
        .then((link) => window.open(link, "_blank"))
        .catch((error) => CatchAPICallingError(error, navigate));
    }
  };

  const getWalletData = () => {
    GetWalletData(creatorId)
      .then((data) => setWalletData(data))
      .catch((error) => CatchAPICallingError(error, navigate));
  };

  const buyAssetHandler = () => {
    if (!chosenAssetId) return;
    BuyAsset(chosenAssetId)
      .then(() => {
        toast.success(
          <>
            <span className="text-cus-h3-bold">Mua tài nguyên thành công!</span>
            <br />
            <span>Tài nguyên sẽ tự động tải xuống sau ít phút.</span>
            <br />
            <span>Nếu không, hãy sang trang "Tài nguyên của tôi" để tải lại.</span>
          </>
        );
        setTimeout(() => {
          GetAssetDownloadLinkById(chosenAssetId).then((link) => window.open(link, "_blank"));
        }, 800);
      })
      .catch((error) => {
        CatchAPICallingError(error, navigate);
      })
      .finally(() => setIsShowBuyAssetDialog(false));
  };

  const removeAssetHandler = async (id: string) => {
    try {
      const response = await RemoveAssetData(id);
      if (response === 200) {
        toast.success("Xóa tài nguyên thành công!");
        setRefresh(true);
      } else {
        toast.error("Xóa tài nguyên thất bại!");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    }
  };

  const items = [{ label: "Đã đăng" }, { label: "Đã mua" }];

  useEffect(() => {
    const fetchAssets = async () => {
      setPageNumber(1);
      try {
        if (activeTab === 0) {
          const response = await GetAssetsData(accountId, pageNumber, 3);
          if (Array.isArray(response)) {
            setAssets((prevAssets) => {
              const uniqueAssetIds = new Set<string>(prevAssets.map((asset) => asset.id));
              const filteredAssets = Array.isArray(response)
                ? response.filter((asset: { id: string }) => !uniqueAssetIds.has(asset.id))
                : [];
              return [...prevAssets, ...filteredAssets];
            });
          } else {
            toast.error("Lấy dữ liệu tài nguyên thất bại!");
          }
        } else if (activeTab === 1) {
          const response = await GetBoughtAssetsData(accountId, pageNumber, 10);
          if (Array.isArray(response)) {
            setBoughtAssets((prevAssets) => {
              const uniqueAssetIds = new Set<string>(prevAssets.map((asset) => asset.id));
              const filteredAssets = Array.isArray(response)
                ? response.filter((asset: { id: string }) => !uniqueAssetIds.has(asset.id))
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
      } finally {
        setIsLoading(false);
        setRefresh(false);
      }
    };
    fetchAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, refresh, pageNumber, activeTab]);

  useEffect(() => {
    setIsLoading(true);
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
      {isLoading && <ProgressSpinner />}
      {!isLoading &&
        (activeTab === 0 ? (
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
                    saveHandler={saveAssetHandler}
                    removeHandler={(assetId) => {
                      setDeleteAssetId(assetId);
                      setConfirmDeleteDialog(true);
                    }}
                  />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bought-asset-gallery">
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
                    extension={asset.extension}
                    size={asset.size}
                    isBought={asset.isBought}
                    fileMetaData={asset.fileMetaData}
                    lastModificatedOn={asset.lastModificatedOn}
                    saveHandler={saveAssetHandler}
                  />
                </div>
              ))
            )}
          </div>
        ))}
      {!isCreator && (
        <ConfirmDialog
          visible={isShowBuyAssetDialog}
          onHide={() => setIsShowBuyAssetDialog(false)}
          header="Tài nguyên trả phí"
          headerStyle={{ border: "none", textAlign: "center" }}
          message={
            <>
              <p>Đây là tài nguyên trả phí.</p>
              <p>
                Bạn đang có <strong>{numberToXu(walletData?.balance || 0)}</strong> trong ví, tài nguyên này có giá{" "}
                <strong>{numberToXu(chosenAssetPrice || 0)}</strong>.
              </p>
              <p>Bạn có muốn mua tài nguyên này không?</p>
            </>
          }
          dismissableMask
          icon="pi pi-exclamation-triangle"
          accept={() => buyAssetHandler()}
          reject={() => setIsShowBuyAssetDialog(false)}
        />
      )}
      <ConfirmDialog
        visible={confirmDeleteDialog}
        headerClassName="confirm-dialog-header"
        header="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa tác phẩm này?"
        closable={false}
        onHide={() => setConfirmDeleteDialog(false)}
        footer={
          <div>
            <Button onClick={() => removeAssetHandler(deleteAssetId)}>Xác nhận</Button>
            <Button onClick={() => setConfirmDeleteDialog(false)}>Hủy</Button>
          </div>
        }
      >
        <h3>Bạn có chắc muốn xóa tác phẩm này?</h3>
      </ConfirmDialog>
      <div ref={lastAssetRef}>{/* This is an invisible marker to observe */}</div>
    </div>
  );
};

export default AssetsView;
