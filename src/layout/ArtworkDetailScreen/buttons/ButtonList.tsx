import { useState } from "react";
import hireIcon from "../../../assets/icons/aw-deatail-01-hire-icon.svg";
import assetsIcon from "../../../assets/icons/aw-deatail-02-assets-icon.svg";
import saveIcon from "../../../assets/icons/aw-deatail-03-save-icon.svg";
import shareIcon from "../../../assets/icons/aw-deatail-04-share-icon.svg";
import reportIcon from "../../../assets/icons/aw-deatail-05-report-icon.svg";
import ShareDialog from "../dialogs/ShareDialog";
import { useNavigate } from "react-router-dom";
import SquareButton from "./SquareButton";

export default function ButtonList(data?: { accountId?: string; avatar?: string }) {
  let [isShowShareDialog, setIsShowShareDialog] = useState(false);
  let navigate = useNavigate();
  const blankPic = require("../../../assets/defaultImage/blank-100.png");

  let buttonsList = [
    {
      title: "Theo dõi",
      thumbnailImg: data?.avatar || blankPic,
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
      onclick: () => {
        navigate("");
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
        navigate("");
      },
    },
  ];
  return (
    <div className="flex flex-column gap-4" style={{position: "fixed"}}>
      <ShareDialog visible={isShowShareDialog} setVisibility={setIsShowShareDialog}/>
      {buttonsList.map((button, index) => {
        return (
          <SquareButton
            key={index}
            title={button.title}
            thumbnailImg={button.thumbnailImg}
            thumbnailAlt={button.thumbnailAlt}
            onClick={() => {
              button.onclick();
            }}
          />
        );
      })}
    </div>
  );
}
