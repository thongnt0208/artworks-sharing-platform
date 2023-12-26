import axios from "axios";
// import axios from "../../api/axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:1880";

/**
 * Fetches details of an artwork based on the provided ID.
 *
 * @param {string | undefined} id - The unique identifier of the artwork.
 * @param {string | undefined} accountId - The identifier of the current user.
 * @returns {Promise<any>}
 * @example
 * const artworkDetails = await fetchArtworkDetail("thongnt");
 * console.log(artworkDetails);
 *
 * @author ThongNT
 * @version 1.0.0
 */
export async function fetchArtworkDetail(id: string | undefined): Promise<any> {
  try {
    const response = await axios.get(`${BASE_URL}/artworks/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    throw new Error(`Error fetching artwork: ${error}`);
  }
}

/**
 * Likes an artwork.
 *
 * @param {string} artworkId - The ID of the artwork to be liked.
 * @param {string} accountId - The ID of the user performing the like action.
 * @returns {Promise<any>}
 * @example
 * const likedArtwork = await likeArtwork("artworkNgayXua", "accountIdMuaMua");
 * console.log(likedArtwork);
 * @author ThongNT
 * @version 1.0.0
 */
export async function likeArtwork(artworkId: string, accountId: string): Promise<any> {
  try {
    let body = {
      accountId: accountId,
      artworkId: artworkId,
    };
    const response = await axios.post(`${BASE_URL}/api/likes/`, body);
    return response;
  } catch (error) {
    console.error("Error liking artwork:", error);
    throw new Error(`Error liking artwork: ${error}`);
  }
}

/**
 * Unlikes an artwork.
 *
 * @param {string} artworkId - The ID of the artwork to be unliked.
 * @param {string} accountId - The ID of the user performing the unlike action.
 * @returns {Promise<any>}
 * @example
 * const unlikedArtwork = await unlikeArtwork("artworkId123", "accountId456");
 * console.log(unlikedArtwork);
 * @author ThongNT
 * @version 1.0.0
 */
export async function unlikeArtwork(artworkId: string, accountId: string): Promise<any> {
  try {
    let body = {
      accountId: accountId,
      artworkId: artworkId,
    };

    const response = await axios({
      method: "DELETE",
      url: `${BASE_URL}/api/likes`,
      data: body,
    });

    return response;
  } catch (error) {
    console.error("Error unliking artwork:", error);
    throw new Error(`Error unliking artwork: ${error}`);
  }
}

/**
 * Fetches comments on an artwork.
 *
 * @param {string} artworkId - The ID of the artwork to fetch comments for.
 * @returns {Promise<any>}
 * @example
 * const comments = await fetchCommentsForArtwork("artworkId123");
 * console.log(comments);
 * @author ThongNT
 * @version 1.0.0
 */
export async function fetchCommentsForArtwork(artworkId: string): Promise<any> {
  try {
    const response = await axios.get(`${BASE_URL}/artworks/${artworkId}/comments`);
    return response;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error(`Error fetching comments: ${error}`);
  }
}

/**
 * Adds a comment to an artwork.
 *
 * @param {string} artworkId - The ID of the artwork to add the comment to.
 * @param {string} accountId - The ID of the user adding the comment.
 * @param {string} commentText - The text of the comment.
 * @returns {Promise<any>}
 * @example
 * const addedComment = await addCommentToArtwork("artworkId123", "accountId456", "Great work!");
 * console.log(addedComment);
 *
 * @author ThongNT
 * @version 1.0.0
 */
export async function addCommentToArtwork(
  artworkId: string,
  accountId: string,
  commentText: string
): Promise<any> {
  let body = {
    accountId: accountId,
    artworkId: artworkId,
    text: commentText,
  };
  try {
    const response = await axios.post(`${BASE_URL}/artworks/${artworkId}/comments`, body);
    return response;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error(`Error adding comment: ${error}`);
  }
}

/**
 * Removes a comment from an artwork.
 *
 * @param {string} artworkId - The ID of the artwork to remove the comment from.
 * @param {string} commentId - The ID of the comment to be removed.
 * @returns {Promise<any>}
 * @example
 * const removedComment = await removeCommentFromArtwork("artworkId123", "commentId789");
 * console.log(removedComment);
 *
 * @author ThongNT
 * @version 1.0.0
 */
export async function removeCommentFromArtwork(artworkId: string, commentId: string): Promise<any> {
  try {
    const response = await axios.delete(`${BASE_URL}/artworks/comments/${artworkId}/${commentId}`);
    return response;
  } catch (error) {
    console.error("Error removing comment:", error);
    throw new Error(`Error removing comment: ${error}`);
  }
}

/**
 * Edits a comment on an artwork.
 *
 * @param {string} artworkId - The ID of the artwork containing the comment.
 * @param {string} commentId - The ID of the comment to be edited.
 * @param {string} newText - The updated text for the comment.
 * @returns {Promise<any>}
 * @example
 * const editedComment = await editCommentOnArtwork("artworkId123", "commentId789", "Updated text");
 * console.log(editedComment);
 *
 * @author ThongNT
 * @version 1.0.0
 */
export async function editCommentOnArtwork(
  artworkId: string,
  commentId: string,
  newText: string
): Promise<any> {
  try {
    const response = await axios.put(`${BASE_URL}/artworks/comments/${artworkId}/${commentId}`, {
      newText: newText,
    });
    return response;
  } catch (error) {
    console.error("Error editing comment:", error);
    throw new Error(`Error editing comment: ${error}`);
  }
}
