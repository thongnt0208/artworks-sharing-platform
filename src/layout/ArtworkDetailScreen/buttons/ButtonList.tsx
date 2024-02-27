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

export default function ButtonList(data?: any) {
  let [isShowShareDialog, setIsShowShareDialog] = useState(false);
  let [isShowReportDialog, setIsShowReportDialog] = useState(false);
  const assetsPanelOptions = useRef<OverlayPanel>(null);
  let navigate = useNavigate();
  const blankPic = require("../../../assets/defaultImage/blank-100.png");

  const buttonsList = [
    {
      title: "Theo dõi",
      thumbnailImg: data?.data?.account?.avatar || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
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
      <ReportDialog visible={isShowReportDialog} setVisibility={setIsShowReportDialog} targetId={data?.data?.id} />
      <AssetsDialog assetsPanelOptions={assetsPanelOptions} data={data?.data?.assets} />
      {buttonsList.map((button, index) => {
        return (
          <SquareButton
            key={index}
            title={button.title}
            thumbnailImg={button.thumbnailImg}
            thumbnailAlt={button.thumbnailAlt}
            onClick={(e?: any) => {
              button.onclick(e);
            }}
          />
        );
      })}
    </div>
  );
}
