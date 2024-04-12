import axios from "axios";
import { axiosPrivate } from "../../hooks/useAxios";
import { ArtworkDetailType, AssetType, CommentType } from "./ArtworkDetailType";
import { arraysEqual } from "../../util/ArrayUtil";
import { Dispatch, SetStateAction } from "react";
// import axios from "../../api/axios";
const BASE_URL =
  process.env.REACT_APP_REAL_API_BASE_URL || "http://127.0.0.1:1880";
const WS_URL =
  process.env.REACT_APP_REAL_API_WS_BASE_URL || "https://dummyjson.com";

function castResponseData(data: any): ArtworkDetailType {
  return {
    id: data.id,
    account: {
      id: data.account.id,
      username: data.account.username,
      email: data.account.email,
      fullname: data.account.fullname,
      avatar: data.account.avatar,
      Bio: data.account.Bio,
      Job: data.account.Job,
      Address: data.account.Address,
    },
    title: data.title,
    images: data.images,
    tagList: data.tagList,
    description: data.description,
    privacy: data.privacy,
    createdOn: new Date(data.createdOn),
    lastModificatedBy: data.lastModificatedBy,
    lastModificatedOn: data.lastModificatedOn ? new Date(data.lastModificatedOn) : undefined,
    tagDetails: data.tagDetails,
    categoryArtworkDetails: data.categoryArtworkDetails,
    likes: data.likes,
    views: data.views,
    viewCount: data.viewCount,
    likeCount: data.likeCount,
    commentCount: data.commentCount,
    assets: data.assets?.map(
      (asset: any) =>
        ({
          id: asset.id,
          name: asset.assetTitle.split(".")[0],
          price: asset.price,
          size: asset.size,
          description: asset.description,
          extension: asset.assetName.split(".").pop(),
          lastModificatedOn: asset.lastModificatedOn
            ? new Date(asset.lastModificatedOn)
            : undefined,
          assetType: asset.assetType,
          isBought: asset.isBought,
        } as AssetType)
    ),
    isLiked: data.isLiked,
  };
}

/**
 * Fetches details of an artwork based on the provided ID.
 *
 * @param {string | undefined} id - The unique identifier of the artwork.
 * @param {string } accountId - (not required) The identifier of the current user.
 * @returns {Promise<ArtworkDetailType>}
 * @example
 * const artworkDetails = await fetchArtworkDetail("thongnt");
 * console.log(artworkDetails);
 *
 * @author ThongNT
 * @version 2.2.2
 */
export async function fetchArtworkDetail(
  id: string | undefined,
  accountId?: string
): Promise<ArtworkDetailType> {
  try {
    if (accountId) {
      const response = await axiosPrivate.get(`${BASE_URL}/artworks/${id}`);
      return castResponseData(response.data);
    } else {
      const response = await axios.get(`${BASE_URL}/artworks/${id}`);
      return castResponseData(response.data);
    }
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
export async function likeArtwork(
  artworkId: string,
  accountId: string
): Promise<any> {
  try {
    let body = {
      accountId: accountId,
      artworkId: artworkId,
    };
    const response = await axiosPrivate.post(`${BASE_URL}/likes/`, body);
    return response;
  } catch (error) {
    console.error("Error liking artwork:", error);
    throw error;
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
 * @version 1.1.0
 */
export async function unlikeArtwork(
  artworkId: string,
  accountId: string
): Promise<any> {
  try {
    let body = {
      artworkId: artworkId,
    };

    const response = await axiosPrivate.delete(`${BASE_URL}/likes`, {
      data: body,
    });

    return response;
  } catch (error) {
    console.error("Error unliking artwork:", error);
    throw error;
  }
}

/**
 * Fetches comments on an artwork.
 *
 * @param {string} artworkId - The ID of the artwork to fetch comments for.
 * @returns {Promise<CommentType[]>} - An array of comments on the artwork.
 * @example
 * const comments = await fetchCommentsForArtwork("artworkId123");
 * console.log(comments);
 * @author ThongNT
 * @version 1.1.1
 */
export async function fetchCommentsForArtwork(
  artworkId: string
): Promise<CommentType[]> {
  try {
    const response = await axios.get(
      `${BASE_URL}/artworks/${artworkId}/comments`
    );
    console.log("response.data", response.data);

    return response.data?.map((comment: any) => ({
      id: comment.id,
      createdBy: comment.createdBy,
      content: comment.content,
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error(`Error fetching comments: ${error}`);
  }
}
/**
 * This function fetches comments for an artwork in real-time.
 *
 * @param artworkId - The ID of the artwork to fetch comments for.
 * @param setComments - The function to set the comments.
 * @returns () => void
 * @example
 * const unsubscribe = fetchCommentsForArtworkRealTime("artworkId123", setComments);
 * unsubscribe();
 * @version 1.0.0
 * @author ThongNT
 */
export function fetchCommentsForArtworkRealTime(
  artworkId: string,
  setComments: Dispatch<SetStateAction<CommentType[]>>
): () => void {
  const url = `${WS_URL}/v2/artworks/${artworkId}/comments/ws?pageNumber=1&pageSize=100`;
  const socket = new WebSocket(url);
  let _tmpComments: CommentType[] = [];

  socket.onopen = () => {
    console.log("WebSocket connection established");
    setComments([]);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)?.Items;
    const comments = data?.map((item: any) => {
      return {
        id: item.Id || "",
        createdBy: {
          id: item.CreatedBy.Id || "",
          fullname: item.CreatedBy.Fullname || "",
          avatar: item.CreatedBy.Avatar || "",
        },
        createdOn: item.CreatedOn,
        content: item.Content || "",
      };
    });

    if (
      Array.isArray(comments) &&
      arraysEqual(_tmpComments, comments) === false
    ) {
      _tmpComments = comments;
      setComments(comments);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return () => {
    socket.close();
  };
}

/**
 * Adds a comment to an artwork.
 *
 * @param {string} artworkId - The ID of the artwork to add the comment to.
 * @param {string} commentText - The text of the comment.
 * @returns {Promise<any>}
 * @example
 * const addedComment = await addCommentToArtwork("artworkId123", "Great work!");
 * console.log(addedComment);
 *
 * @author ThongNT
 * @version 2.0.1
 */
export async function addCommentToArtwork(
  artworkId: string,
  commentText: string
): Promise<any> {
  let body = {
    commentText: commentText,
  };
  try {
    const response = await axiosPrivate.post(
      `${BASE_URL}/artworks/${artworkId}/comments`,
      body
    );
    return response;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}

/**
 * Removes a comment from an artwork.
 * @param {string} commentId - The ID of the comment to be removed.
 * @returns {Promise<any>}
 * @example const removedComment = await removeCommentFromArtwork("artworkId123", "commentId789");
console.log(removedComment);
 * 
 * @author ThongNT
 * @version 1.1.1
 */
export async function removeCommentFromArtwork(
  commentId: string
): Promise<any> {
  try {
    const response = await axiosPrivate.delete(
      `${BASE_URL}/comments/${commentId}`
    );
    return response;
  } catch (error) {
    console.error("Error removing comment:", error);
    throw error;
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
 * @author @thongnt0208
 * @version 1.1.0
 */
export async function editCommentOnArtwork(
  commentId: string,
  newText: string
): Promise<any> {
  try {
    const response = await axiosPrivate.put(
      `${BASE_URL}/comments/${commentId}`,
      {
        commentText: newText,
      }
    );
    return response;
  } catch (error) {
    console.error("Error editing comment:", error);
    throw error;
  }
}

/**
 * This function follows a user.
 *
 * @param followUserId - The ID of the user to be followed
 * @returns Promise<any>
 * @example
 * const followedUser = await addFollow("followUserId");
 * console.log(followedUser);
 * @author ThongNT
 * @version 1.2.0
 */
export async function addFollow(followUserId: string): Promise<any> {
  try {
    let body = {
      followedId: followUserId,
    };
    const response = await axiosPrivate.post(`${BASE_URL}/follows`, body);
    return response;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
}

/**
 * This function unfollows a user.
 *
 * @param followUserId - The ID of the user to be unfollowed
 * @returns Promise<any>
 * @example
 * const unfollowedUser = await removeFollow("followUserId");
 * console.log(unfollowedUser);
 * @author ThongNT
 * @version 1.2.0
 */
export async function removeFollow(followUserId: string): Promise<any> {
  console.log("followUserId", followUserId);
  try {
    let body = {
      followedId: followUserId,
    };
    const response = await axiosPrivate.delete(`${BASE_URL}/follows`, {
      data: body,
    });
    return response;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
}

/**
 * This function fetches the followers of a user.
 *
 * @param userId - The ID of the user
 * @returns Promise<any>
 * @example
 * const followers = await fetchFollowers("userId");
 * console.log(followers);
 * @author ThongNT
 * @version 1.0.0
 */
export async function fetchFollowers(userId: string): Promise<any> {
  try {
    const response = await axiosPrivate.get(`${BASE_URL}/accounts/${userId}/followers`);
    return response.data.followers.length;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
}

/**
 * This function fetches the following users of a user.
 *
 * @param userId - The ID of the user
 * @returns Promise<any>
 * @example
 * const following = await fetchFollowing("userId");
 * console.log(following);
 * @author ThongNT
 * @version 1.0.0
 */
export async function fetchFollowing(userId: string): Promise<any> {
  try {
    const response = await axiosPrivate.get(`${BASE_URL}/accounts/${userId}/following`);
    return response.data.followings.length;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
  }
}

/**
 * This function checks if the current user is following a user.
 *
 * @param userId - The ID of the user
 * @returns Promise<boolean> - true if the current user is following the user, false otherwise
 */
export async function fetchIsFollow(userId: string): Promise<boolean> {
  try {
    const response = await axiosPrivate.get(
      `${BASE_URL}/follows/is-existed/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
  }
}

/**
 * This function is used to buy an asset.
 * @param assetId - The ID of the asset to be bought
 * @returns Promise<any>
 * @example
 * const boughtAsset = await BuyAsset("assetId");
 * console.log(boughtAsset);
 * @version 1.0.0
 * @author ThongNT
 */
export async function BuyAsset(assetId: string): Promise<any> {
  try {
    const response = await axiosPrivate.post(`${BASE_URL}/assettransactions`, {
      assetId: assetId,
    });
    return response;
  } catch (error) {
    console.error("Error buying asset:", error);
    throw error;
  }
}
