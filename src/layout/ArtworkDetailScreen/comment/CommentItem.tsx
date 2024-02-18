import React from "react";
import { getAuthInfo } from "../../../util/AuthUtil";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { removeCommentFromArtwork } from "../Service";
import { CommentType } from "../content/ArtworkDetailType";

interface CommentItemProps {
  index: number;
  profileData: {
    id: string;
    avatar?: string;
    fullname?: string;
  };
  comment: CommentType;
}

const CommentItem: React.FC<CommentItemProps> = ({ index, profileData, comment }) => {
  const blankPic = require("../../../assets/defaultImage/blank-100.png");
  const currentUserId = getAuthInfo()?.id || "";

  const handleEditComment = () => {
    console.log("Edit comment");
  }

  const handleDeleteComment = () => {
    removeCommentFromArtwork(comment?.id)
  }

  return (
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
              <Button icon={"pi pi-pencil"} rounded onClick={handleEditComment}/>
              <Button icon={"pi pi-trash"} rounded onClick={handleDeleteComment}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
