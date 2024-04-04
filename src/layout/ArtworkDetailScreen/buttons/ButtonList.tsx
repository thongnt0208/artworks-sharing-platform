import { useRef, useState } from "react";
import hireIcon from "../../../assets/icons/aw-deatail-01-hire-icon.svg";
import assetsIcon from "../../../assets/icons/aw-deatail-02-assets-icon.svg";
import saveIcon from "../../../assets/icons/aw-deatail-03-save-icon.svg";
import shareIcon from "../../../assets/icons/aw-deatail-04-share-icon.svg";
import reportIcon from "../../../assets/icons/aw-deatail-05-report-icon.svg";
import ShareDialog from "../dialogs/ShareDialog";
import { useNavigate } from "react-router-dom";
import SquareButton from "./SquareButton";
import AssetsDialog from "../dialogs/AssetsDialog";
import { OverlayPanel } from "primereact/overlaypanel";
import ReportDialog from "../dialogs/ReportDialog";
import { ArtworkDetailType, AssetType } from "../ArtworkDetailType";
import { getAuthInfo } from "../../../util/AuthUtil";
import { GetAssetDownloadLinkById } from "../dialogs/Service";
import { CatchAPICallingError } from "../..";
import { ConfirmDialog } from "primereact/confirmdialog";
import { toast } from "react-toastify";
import { BuyAsset } from "../Service";

type Props = {
  data?: ArtworkDetailType;
  isFollowed?: boolean;
  makeFollow?: () => void;
  makeUnFollow?: () => void;
};

export type btnListItemType = {
  title: string;
  thumbnailImg: string;
  thumbnailAlt: string;
  onclick: (event?: any) => void;
  isFollowed?: boolean;
  makeFollow?: () => void;
  makeUnFollow?: () => void;
};

export default function ButtonList({ data, isFollowed, makeFollow, makeUnFollow }: Props) {
  const [isShowShareDialog, setIsShowShareDialog] = useState(false);
  const [isShowReportDialog, setIsShowReportDialog] = useState(false);
  const [isShowBuyAssetDialog, setIsShowBuyAssetDialog] = useState(false);
  const [chosenAsset, setChosenAsset] = useState<AssetType>({} as AssetType);
  const assetsPanelOptions = useRef<OverlayPanel>(null);
  const navigate = useNavigate();
  const blankPic = require("../../../assets/defaultImage/blank-100.png");
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const buttonsList: btnListItemType[] = [
    {
      title: data?.account?.id === currentUserId ? "My profile" : "Theo dõi",
      thumbnailImg: data?.account?.avatar || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate(`/account/${data?.account?.id}`);
      },
      isFollowed: isFollowed,
      makeFollow: makeFollow,
      makeUnFollow: makeUnFollow,
    },
    {
      title: "Thuê",
      thumbnailImg: hireIcon || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate(`/account/${data?.account?.id}/service`);
      },
    },
    {
      title: "Tài nguyên",
      thumbnailImg: assetsIcon || blankPic,
      thumbnailAlt: "",
      onclick: (event?: any) => {
        assetsPanelOptions.current?.toggle(event);
      },
    },
    {
      title: "Lưu",
      thumbnailImg: saveIcon || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Chia sẻ",
      thumbnailImg: shareIcon || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        setIsShowShareDialog(true);
      },
    },
    {
      title: "Báo cáo",
      thumbnailImg: reportIcon || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        setIsShowReportDialog(true);
      },
    },
  ];

  const saveAssetHandler = (id: string) => {
    const _chosenAsset = data?.assets?.find((asset) => asset.id === id);
    setChosenAsset(_chosenAsset || ({} as AssetType));
    if (_chosenAsset?.price && _chosenAsset?.price > 0 && data?.account.id !== currentUserId) {
      setIsShowBuyAssetDialog(true);
    } else {
      GetAssetDownloadLinkById(id)
        .then((link) => window.open(link, "_blank"))
        .catch((error) => CatchAPICallingError(error, navigate));
    }
  };

  const buyAssetHandler = () => {
    if (!chosenAsset.id) return;
    BuyAsset(chosenAsset.id)
      .then(() => {
        toast.success(
          <>
            <span className="text-cus-h3-bold">Mua tài nguyên thành công!</span>
            <br />
            <span>Tài nguyên sẽ tự động tải xuống sau ít phút.</span>
            <br />
            <span>Nếu không, hãy sang trang Asset của tôi để tải lại.</span>
          </>
        );
        setTimeout(() => {
          GetAssetDownloadLinkById(chosenAsset.id).then((link) => window.open(link, "_blank"));
        }, 800);
      })
      .catch((error) => {
        CatchAPICallingError(error, navigate);
      });
  };

  return (
    <div className="flex flex-column gap-4" style={{ position: "fixed" }}>
      {/* Buy asset dialog */}
      <ConfirmDialog
        visible={isShowBuyAssetDialog}
        onHide={() => setIsShowBuyAssetDialog(false)}
        header="Mua tài nguyên"
        headerStyle={{ border: "none", textAlign: "center" }}
        message="Đây là tài nguyên trả phí. Bạn có muốn mua tài nguyên này không?"
        dismissableMask
        icon="pi pi-exclamation-triangle"
        accept={() => {
          buyAssetHandler();
          setIsShowBuyAssetDialog(false);
        }}
        reject={() => setIsShowBuyAssetDialog(false)}
      />
      <ShareDialog visible={isShowShareDialog} setVisibility={setIsShowShareDialog} />
      <ReportDialog
        visible={isShowReportDialog}
        setVisibility={setIsShowReportDialog}
        targetId={data?.id || ""}
        entityName="artwork"
      />
      <AssetsDialog
        assetsPanelOptions={assetsPanelOptions}
        data={data?.assets || []}
        saveHandler={saveAssetHandler}
      />
      {buttonsList.map((button, index) => {
        return (
          <SquareButton
            key={index}
            {...button}
            onclick={(e?: any) => {
              button.onclick(e);
            }}
          />
        );
      })}
    </div>
  );
}
