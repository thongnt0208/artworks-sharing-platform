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
import { ArtworkDetailType } from "../ArtworkDetailType";
import { getAuthInfo } from "../../../util/AuthUtil";

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
        navigate("");
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

  return (
    <div className="flex flex-column gap-4" style={{ position: "fixed" }}>
      <ShareDialog visible={isShowShareDialog} setVisibility={setIsShowShareDialog} />
      <ReportDialog
        visible={isShowReportDialog}
        setVisibility={setIsShowReportDialog}
        targetId={data?.id || ""}
        entityName="artwork"
      />
      <AssetsDialog assetsPanelOptions={assetsPanelOptions} data={data?.assets || []} />
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
