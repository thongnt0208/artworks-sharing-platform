import React, { useState, useRef } from "react";
import "./Comment.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";
import { CommentType } from "../content/ArtworkDetailType";
import { addCommentToArtwork } from "../Service";
import { InputTextarea } from "primereact/inputtextarea";
import { maxCommentCharacter } from "../../../const/bizConstants";

interface PropsType {
  // Current user data
  artworkId: string;
  userId: string;
  fullName: string;
  avatar: string;
  comments: CommentType[];
  setIsCommentChanged: (isCommentChanged: boolean) => void;
}

function CommentComponent({ ...props }: PropsType) {
  const blankPic = require("../../../assets/defaultImage/blank-100.png");
  const [commentValue, setCommentValue] = useState<string>("");
  const [commentsList, setCommentsList] = useState<CommentType[]>(props.comments);
  const [loading, setLoading] = useState<boolean>(false);

  const addComment = () => {
    let newComment = {
      id: "somethingNew",
      createdBy: {
        id: props.userId,
        fullname: props.fullName,
        avatar: props.avatar,
      },
      content: commentValue,
    };
    const updatedCommentsList = [newComment, ...commentsList];
    // Change in UI
    setCommentsList(updatedCommentsList);
    setCommentValue(""); // Clear input after adding comment
    // Change in Server
    props.setIsCommentChanged(true);
    // if (commentValue !== "") {
    //   setLoading(true);

    //   // API call
    //   addCommentToArtwork(props.artworkId, props.userId, commentValue)
    //     .then((response) => {
    //       setCommentsList(response.data);
    //       setCommentValue("") // Clear input after adding comment

    //     })
    //     .catch((error) => {
    //       console.error("Error adding comment:", error);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // }
  };

  let handleInputChange = (e: any) => {
    if (e.target.value.length <= maxCommentCharacter) {
      setCommentValue(e.target.value);
    }
  };

  let handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment();
    }
  };

  let textareaProperties = {
    autoResize: true,
    value: commentValue,
    placeholder: "Thêm bình luận...",
    className: "w-full",
    tooltip: `Nội dung nên ít hơn ${maxCommentCharacter} ký tự`,
    onChange: (e: any) => handleInputChange(e),
    onKeyDown: (e: any) => handleKeyDown(e),
  };

  return (
    <>
      <div className="comment-input-container">
        <div className="flex flex-column gap-1">
          <InputTextarea {...textareaProperties} />
          <Button
            className="max-w-max align-self-end"
            label="Đăng bình luận"
            onClick={addComment}
            disabled={loading || !commentValue}
          />
        </div>
        {loading && <p>Loading...</p>}
      </div>

      <div className="comment-list-container">
        {commentsList?.length > 0 ? (
          commentsList?.map((comment, index) => (
            <div key={index} className="comment-card p-mb-2">
              <div className="flex flex-column">
                <div className="flex">
                  <img
                    src={comment.createdBy.avatar || blankPic}
                    alt={comment.createdBy.fullname}
                  />
                  <div className="flex flex-column gap-1 justify-content-center">
                    <span className="text-cus-normal-bold">{comment.createdBy.fullname}</span>
                    <span className="content text-cus-normal">{comment.content}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
    </>
  );
}

export default CommentComponent;
