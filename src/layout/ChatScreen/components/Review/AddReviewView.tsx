import React, { useState } from "react";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { AddReviewToProposal } from "../../services/ProposalServices";
import { ProposalType } from "../../ChatRelatedTypes";
import { maxCommentCharacter } from "../../../../const/bizConstants";
import { CatchAPICallingError } from "../../..";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddReviewView.scss";

interface Props {
  selectingProposal: ProposalType;
  refreshProposalList?: () => void;
}

const AddReviewView: React.FC<Props> = ({ selectingProposal, refreshProposalList }) => {
  const navigate = useNavigate();
  const [vote, setVote] = useState<number>(0);
  const [detail, setDetail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        refreshProposalList && refreshProposalList();
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
      <form onSubmit={handleSubmit}>
        <span className="text-cus-h3-bold">Đánh giá</span>
        <Rating
          value={vote}
          onChange={handleVoteChange}
          cancel={false}
          stars={5}
          id="rating"
        />
        <InputTextarea {...textareaProperties} />
        <span className="text-cus-caption">
          {detail.length}/{maxCommentCharacter}
        </span>
        <Button
          type="submit"
          label="Gửi"
          loading={isSubmitting}
          disabled={isSubmitting || detail === "" || vote === 0}
        />
      </form>
    </div>
  );
};

export default AddReviewView;
