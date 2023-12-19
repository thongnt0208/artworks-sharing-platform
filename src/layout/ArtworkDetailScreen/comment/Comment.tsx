import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { CommentType } from "../content/ArtworkDetailType";
import { addCommentToArtwork } from "../Service";

interface PropsType {
  artworkId: string;
  userId: string;
  fullName: string;
  avatar: string;
  comments: CommentType[];
}

function CommentComponent({ ...props }: PropsType) {
  const [commentValue, setCommentValue] = useState<string>("");
  const [commentsList, setCommentsList] = useState<CommentType[]>(
    props.comments
  );
  const [loading, setLoading] = useState<boolean>(false);

  const addComment = () => {   
      let newComment = {
        Id: "somethingNew",
        UserId: props.userId,
        Fullname: props.fullName,
        Avatar: props.avatar,
        Content: commentValue,
      };
      let newList = commentsList;
      newList.push(newComment);
      console.log(newList);
      
      setCommentsList(newList => [...newList, newComment]);
      console.log(commentsList);
      

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


  return (
    <>
      <div className="comment-input-container">
        <div className="p-mb-2">
          <InputText
            value={commentValue}
            placeholder="Thêm bình luận..."
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <Button
            label="Comment"
            className="p-ml-2"
            onClick={addComment}
            disabled={loading}
          />
        </div>
        {loading && <p>Loading...</p>}
      </div>

      <div className="comment-list-container">
        {commentsList.length > 0 ? (
          commentsList.map((comment) => (
            <Card key={comment.Id} className="p-mb-2" title="Comment">
              <div className="p-d-flex p-ai-center">
                <img
                  src={comment.Avatar}
                  alt={comment.Fullname}
                  className="p-mr-2"
                  width="32"
                  height="32"
                />
                <span className="p-d-flex p-dir-col">
                  <span>{comment.Fullname}</span>
                  <span>{comment.Content}</span>
                </span>
              </div>
            </Card>
          ))
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
    </>
  );
}

export default CommentComponent;
