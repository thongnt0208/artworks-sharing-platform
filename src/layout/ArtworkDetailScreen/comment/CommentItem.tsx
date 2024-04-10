import React, { useRef, useState } from "react";
import { getAuthInfo } from "../../../util/AuthUtil";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { editCommentOnArtwork, removeCommentFromArtwork } from "../Service";
import { CommentType } from "../ArtworkDetailType";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { formatTime } from "../../../util/TimeHandle";
import { InputText } from "primereact/inputtext";
import { maxCommentCharacter } from "../../../const/bizConstants";

interface CommentItemProps {
  index: number;
  profileData: {
    id: string;
    avatar?: string;
    fullname?: string;
  };
  comment: CommentType;
  editCommentCallback?: (cmtId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  index,
  profileData,
  comment,
  editCommentCallback,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const blankPic = require("../../../assets/defaultImage/blank-100.png");
  const currentUserId = getAuthInfo()?.id || "";

  const handleEditComment = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteComment = () => {
    setIsLoading(true);
    removeCommentFromArtwork(comment?.id)
      .then(() => {
        console.log("Comment removed");
        setIsLoading(false);
        toast?.current?.show({
          severity: "success",
          summary: "Đã xoá",
          detail: "Bạn đã xoá bình luận thành công!",
          life: 3000,
        });
      })
      .catch((error) => {
        console.log("Error removing comment:", error);
        toast?.current?.show({
          severity: "error",
          summary: "Xoá thất bại",
          detail: `Bình luận của bạn còn nguyên! ${error}`,
          life: 3000,
        });
        setIsLoading(false);
      });
  };

  const toast = useRef<Toast>(null);

  const acceptDelete = () => {
    handleDeleteComment();
  };

  const rejectDelete = () => {};

  const confirmDelete = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: acceptDelete,
      reject: rejectDelete,
    });
  };

  let handleInputChange = (e: any) => {
    if (e.target.value.length <= maxCommentCharacter) {
      setCommentValue(e.target.value);
    }
  };

  let handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editCommentOnArtwork(comment.id, commentValue)
        .then(() => {
          toast?.current?.show({
            severity: "success",
            summary: "Chỉnh sửa bình luận thành công",
          });
          setIsEdit(false);
        })
        .catch((error) => {
          console.log("Error editing comment:", error);
          toast?.current?.show({
            severity: "error",
            summary: "Chỉnh sửa thất bại",
            detail: `${error}`,
            life: 3000,
          });
          setIsEdit(false);
        });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      <div key={index} className="comment-card p-mb-2">
        <div className="grid flex">
          <div className="flex col col-9 justify-content-start">
            <Image src={profileData?.avatar || blankPic} alt={profileData?.fullname} />

            <div className="flex flex-column gap-1 justify-content-center">
              <span className="text-cus-normal-bold">
                {profileData?.fullname}{" "}
                <span className="text-cus-normal" style={{ color: "gray" }}>
                  lúc {formatTime(comment.createdOn, "dd tháng MM/yyyy HH:mm")}
                </span>
              </span>
              {!isEdit && <span className="content text-cus-normal">{comment.content}</span>}
              {isEdit && (
                <InputText
                  className="p-inputtext-sm"
                  tooltip="Enter để lưu"
                  defaultValue={comment.content}
                  onChange={(e: any) => handleInputChange(e)}
                  onKeyDown={(e: any) => handleKeyDown(e)}
                />
              )}
            </div>
          </div>

          <div className="col col-3">
            {/* Edit and Delete icon button */}
            {currentUserId === profileData.id && (
              <div className="flex gap-1 justify-content-center">
                <Button icon={"pi pi-pencil"} rounded onClick={handleEditComment} />
                <Button icon={"pi pi-trash"} rounded onClick={confirmDelete} loading={isLoading} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
