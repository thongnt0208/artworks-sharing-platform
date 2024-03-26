import React, { useRef } from "react";
import { getAuthInfo } from "../../../util/AuthUtil";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { removeCommentFromArtwork } from "../Service";
import { CommentType } from "../ArtworkDetailType";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

interface CommentItemProps {
  index: number;
  profileData: {
    id: string;
    avatar?: string;
    fullname?: string;
  };
  comment: CommentType;
}

const CommentItem: React.FC<CommentItemProps> = ({
  index,
  profileData,
  comment,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const blankPic = require("../../../assets/defaultImage/blank-100.png");
  const currentUserId = getAuthInfo()?.id || "";

  // const handleEditComment = () => {
  //   console.log("Edit comment");
  // };

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

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      <div key={index} className="comment-card p-mb-2">
        <div className="grid flex">
          <div className="flex col col-9 justify-content-start">
            <Image src={profileData?.avatar || blankPic} alt={profileData?.fullname} />
            <div className="flex flex-column gap-1 justify-content-center">
              <span className="text-cus-normal-bold">{profileData?.fullname}</span>
              <span className="content text-cus-normal">{comment.content}</span>
            </div>
          </div>

          <div className="col col-3">
            {/* Edit and Delete icon button */}
            {currentUserId === profileData.id && (
              <div className="flex gap-1 justify-content-center">
                {/* <Button icon={"pi pi-pencil"} rounded onClick={handleEditComment} /> */}
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
