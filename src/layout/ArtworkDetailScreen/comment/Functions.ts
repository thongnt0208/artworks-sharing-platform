import { CatchAPICallingError } from "../..";
import { addCommentToArtwork } from "../Service";

/**
 * This function to add a new comment to the artwork
 *
 * @description This function will add a new comment to the artwork, then update the list of comments and notify the parent component to reload the comments
 * @param props - The props of the parents component, which contains the current user data
 * @param commentValue - The content of the comment
 * @param setCommentValue - The function to set the content of the comment
 * @param commentsList - The state that contains list of comments
 * @param setCommentsList - The function to set the list of comments state
 * @param setLoading  - The function to set the loading state
 * @param toast - The ref of the toast component to make notification
 * @returns void
 * @example
 * addComment(
 *  props,
 * commentValue,
 * setCommentValue,
 * commentsList,
 * setCommentsList,
 * setLoading,
 * toast
 * );
 * @author ThongNT
 * @version 1.1.0
 */
export function addComment(
  props: any,
  commentValue: string,
  setCommentValue: (commentValue: string) => void,
  setLoading: (loading: boolean) => void,
  toast: any,
  navigate?: any
) {
  setCommentValue(""); // Clear input after adding comment

  // Change in Server
  if (commentValue !== "") {
    setLoading(true);

    // API call
    addCommentToArtwork(props?.artworkId, commentValue)
      .then(() => console.log("Comment added successfully"))
      .catch((error) => CatchAPICallingError(error, navigate))
      .finally(() => {
        setLoading(false);
      });
  }
}
