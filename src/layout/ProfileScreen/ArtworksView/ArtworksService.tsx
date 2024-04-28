import { axiosPrivate } from "../../../hooks/useAxios";
import { ArtworkProps } from "../../../components/ArtworkCard";

/**
 *
 * Retrieves artworks data from the server.
 *
 * @param pageSize - The number of artworks to retrieve per page.
 * @param pageNumber - The page number of the artworks to retrieve.
 * @param accountId - The ID of the account to retrieve artworks for.
 * @returns A promise that resolves to the artworks data.
 * @author AnhDH
 * @version 1.2.0
 */
export async function GetArtworksData(
  pageSize: number,
  pageNumber: number,
  accountId: string,
  state?: number, 
  privacy?: number
) {
  try {
    const response = await axiosPrivate.get(`/accounts/${accountId}/artworks`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        sortColumn: "create", 
        sortOrder: "desc",
        state: state,
        privacy: privacy,
      },
    });
    if (response.status !== 200) {
      return [];
    } else {
      let artworksData: ArtworkProps[] = [];
      if (Array.isArray(response.data.items)) {
        artworksData = response.data.items.map((artwork: any) => ({
          id: artwork.id,
          title: artwork.title,
          thumbnail: artwork.thumbnail,
          viewCount: artwork.viewCount,
          likeCount: artwork.likeCount,
          privacy: artwork.privacy,
          createdBy: artwork.createdBy,
          creatorFullName: artwork.account.fullname,
        }));
      }
      return artworksData;
    }
  } catch (error) {
    return error;
  }
}

/**
 *
 * Soft deletes an artwork from the server.
 *
 * @param artworkId - The ID of the artwork to delete.
 * @returns A boolean indicating whether the artwork was successfully deleted.
 * @author AnhDH
 * @version 1.1.0
 */
export async function DeleteArtworkData(artworkId: string) {
  try {
    const response = await axiosPrivate.delete(`/artworks/softdelete/${artworkId}`);
    return response.status;
  } catch (error) {
    throw new Error("Xóa tác phẩm bị lỗi: " + error);
  }
}
