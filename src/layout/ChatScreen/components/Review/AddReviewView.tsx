import React, { useState } from "react";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { AddReviewToProposal } from "../../services/ProposalServices";
import { ProposalType } from "../../ChatRelatedTypes";
import { getAuthInfo } from "../../../../util/AuthUtil";
import { maxCommentCharacter } from "../../../../const/bizConstants";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  selectingProposal: ProposalType;
}

const AddReviewView: React.FC<Props> = ({ selectingProposal }) => {
  const navigate = useNavigate();
  const [vote, setVote] = useState<number>(0);
  const [detail, setDetail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const handleVoteChange = (event: RatingChangeEvent) => {
    setVote(event.value as number);
  };

  const handleDetailChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setDetail(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (vote !== null) {
        await AddReviewToProposal(selectingProposal?.id, vote, detail);
        // Reset the form after successful submission
        toast.success("Đánh giá đã được gửi.");
        setVote(0);
        setDetail("");
      }
    } catch (error) {
      CatchAPICallingError(error, navigate);
    } finally {
      setIsSubmitting(false);
    }
  };

  const textareaProperties = {
    id: "review-detail",
    autoResize: true,
    value: detail,
    placeholder: "Thêm đánh giá...",
    className: "w-full",
    onChange: (e: any) => handleDetailChange(e),
    onKeyDown: (e: any) => handleDetailChange(e),
    maxLength: maxCommentCharacter,
  };

  return (
    <div className="add-review-container">
      {
        // check if proposal status is CompletePayment && current user is not the creator -> Start to add review
        selectingProposal?.status === "CompletePayment" &&
          selectingProposal?.createdBy !== currentUserId && (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="rating">Rating:</label>
                <Rating
                  value={vote}
                  onChange={handleVoteChange}
                  cancel={false}
                  stars={5}
                  id="rating"
                />
              </div>
              <div>
                <label htmlFor="detail">Review Details:</label>
                <InputTextarea {...textareaProperties} />
              </div>
              <Button
                type="submit"
                label="Submit Review"
                loading={isSubmitting}
                disabled={isSubmitting || detail === "" || vote === 0}
              />
            </form>
          )
      }
    </div>
  );
};

export default AddReviewView;
