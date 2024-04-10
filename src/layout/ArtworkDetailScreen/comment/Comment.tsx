/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import "./Comment.scss";
import { Button } from "primereact/button";
import { CommentType } from "../ArtworkDetailType";
import { InputTextarea } from "primereact/inputtextarea";
import { maxCommentCharacter } from "../../../const/bizConstants";
import { Toast } from "primereact/toast";
import { addComment } from "./Functions";
import { GetProfileData } from "../../ProfileScreen/ProfileService";
import CommentItem from "./CommentItem";
import { useNavigate } from "react-router-dom";
import { editCommentOnArtwork } from "../Service";

interface PropsType {
  // Current user data
  artworkId: string;
  userId: string;
  fullName: string;
  avatar: string;
  // ------------------
  comments: CommentType[];
}

function CommentComponent({ ...props }: PropsType) {
  const [commentValue, setCommentValue] = useState<string>("");
  const [commentsElement, setCommentsElement] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast: any = useRef(null);
  const navigate = useNavigate();

  let handleInputChange = (e: any) => {
    if (e.target.value.length <= maxCommentCharacter) {
      setCommentValue(e.target.value);
    }
  };

  let addNewComment = () => {
    addComment(props, commentValue, setCommentValue, setLoading, toast, navigate);
  };

  let editComment = (cmtId: string) => {
    editCommentOnArtwork(commentValue, cmtId).then(() => {
      toast.current.show({
        severity: "success",
        summary: "Chỉnh sửa bình luận thành công",
      });
    });
  };

  let handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewComment();
    }
  };

  const textareaProperties = {
    autoResize: true,
    value: commentValue,
    placeholder: "Thêm bình luận...",
    className: "w-full",
    tooltip: `Nội dung nên ít hơn ${maxCommentCharacter} ký tự`,
    onChange: (e: any) => handleInputChange(e),
    onKeyDown: (e: any) => handleKeyDown(e),
  };

  const renderComments = async () => {
    if (props.comments?.length > 0) {
      let _commentsElement = await Promise.all(
        props.comments.map(async (comment, index) => {
          // check if createdBy is a string or an object
          if (typeof comment.createdBy === "string") {
            const profileData = await GetProfileData(comment?.createdBy || "");
            return (
              <CommentItem
                key={index}
                index={index}
                comment={comment}
                profileData={profileData}
                editCommentCallback={editComment}
              />
            );
          } else {
            return (
              <CommentItem
                key={index}
                index={index}
                comment={comment}
                profileData={comment.createdBy}
                editCommentCallback={editComment}
              />
            );
          }
        })
      );

      // Set _commentsElement with the resolved JSX array
      setCommentsElement(_commentsElement);
    } else {
      setCommentsElement(<p>Chưa có bình luận nào</p>);
    }
  };

  useEffect(() => {
    renderComments();
  }, [props.comments]);

  return (
    <>
      <Toast ref={toast} />
      {props.userId && (
        <div className="comment-input-container">
          <div className="flex flex-column gap-1">
            <InputTextarea {...textareaProperties} />
            <Button
              className="max-w-max align-self-end"
              label="Đăng bình luận"
              onClick={addNewComment}
              disabled={loading || !commentValue}
            />
          </div>
          {loading && <p>Đang tải...</p>}
        </div>
      )}

      <div className="comment-list-container">{commentsElement}</div>
    </>
  );
}

export default CommentComponent;
