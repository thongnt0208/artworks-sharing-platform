import { useEffect, useRef, useState } from "react";
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
import { addFollow } from "../Service";
import { getAuthInfo } from "../../../util/AuthUtil";

export default function ButtonList(data?: ArtworkDetailType) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isShowShareDialog, setIsShowShareDialog] = useState(false);
  const [isShowReportDialog, setIsShowReportDialog] = useState(false);
  const assetsPanelOptions = useRef<OverlayPanel>(null);
  const navigate = useNavigate();
  const blankPic = require("../../../assets/defaultImage/blank-100.png");

  const buttonsList = [
    {
      title: "Theo dõi",
      thumbnailImg: data?.account?.avatar || blankPic,
      thumbnailAlt: "",
      onclick: () => {
        isFollowed ? unFollowUser() : followUser();
      },
      isFollowed: isFollowed,
      setIsFollowed: setIsFollowed,
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

  const followUser = () => {
    console.log("followUser: " + data?.account?.id);
    const _currentUserId = getAuthInfo()?.id || "";
    addFollow(_currentUserId, data?.account?.id || "")
      .then((res) => {
        console.log("followUser: " + res + "Success");
      })
      .catch((err) => {
        console.log("followUser: " + err);
      });
  }

  const unFollowUser = () => {
    console.log("unFollowUser: " + data?.account?.id);
    const _currentUserId = getAuthInfo()?.id || "";
    addFollow(_currentUserId, data?.account?.id || "")
      .then((res) => {
        console.log("unFollowUser: " + res + "Success");
      })
      .catch((err) => {
        console.log("unFollowUser: " + err);
      });
  }

  useEffect(() => {
    // Call API to check if the user is followed, then setIsFollowed
  }, [])
  

  return (
    <div className="flex flex-column gap-4" style={{ position: "fixed" }}>
      <ShareDialog visible={isShowShareDialog} setVisibility={setIsShowShareDialog} />
      <ReportDialog visible={isShowReportDialog} setVisibility={setIsShowReportDialog} targetId={data?.id || ''} entityName="artwork"/>
      <AssetsDialog assetsPanelOptions={assetsPanelOptions} data={data?.assets || []} />
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
