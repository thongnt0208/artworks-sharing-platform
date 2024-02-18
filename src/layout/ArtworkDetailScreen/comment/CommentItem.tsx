import React from 'react';

interface CommentItemProps {
  index: number;
  profileData: {
    avatar?: string;
    fullname?: string;
  };
  comment: {
    content: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ index, profileData, comment }) => {
    const blankPic = require("../../../assets/defaultImage/blank-100.png");
    

  return (
    <div key={index} className="comment-card p-mb-2">
      <div className="flex flex-column">
        <div className="flex">
          <img src={profileData?.avatar || blankPic} alt={profileData?.fullname} />
          <div className="flex flex-column gap-1 justify-content-center">
            <span className="text-cus-normal-bold">{profileData?.fullname}</span>
            <span className="content text-cus-normal">{comment.content}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
