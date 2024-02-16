import { addCommentToArtwork } from "../Service";
import { CommentType } from "../content/ArtworkDetailType";

export default function addComment(
  props: any,
  commentValue: string,
  setCommentValue: (commentValue: string) => void,
  commentsList: CommentType[],
  setCommentsList: (commentsList: CommentType[]) => void,
  setLoading: (loading: boolean) => void,
  toast: any
) {
  let newComment = {
    id: "somethingNew",
    createdBy: {
      id: props.userId,
      fullname: props.fullName,
      avatar: props.avatar,
    },
    content: commentValue,
  };

  setCommentValue(""); // Clear input after adding comment
  // Change in UI
  props?.setIsCommentChanged(true);
  setCommentsList([...commentsList, newComment]);

  // Change in Server
  if (commentValue !== "") {
    setLoading(true);

    // API call
    addCommentToArtwork(props?.artworkId, commentValue)
      .catch((error) => {
        console.log("Error adding comment:", error);

        setCommentsList(commentsList);
        toast.current.show({
          severity: "error",
          summary: "Đã xảy ra lỗi",
          detail: "Vui lòng thử lại sau",
          life: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
}
