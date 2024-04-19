import { axiosPrivate } from "../../hooks/useAxios";

type Artwork = {
  id: string;
  title: string;
  createdBy: string;
  creatorFullName: string;
  thumbnail: string;
  likeCount: number;
  viewCount: number;
};

type CollectionProps = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
  accountAvatar?: string;
  artworks: Artwork[];
};

/**
 * Get Collection Detail Data
 *
 * @description This function to get Collection Detail from database
 * @returns {collection<CollectionProps>, artworks<Artwork>[]} - Collection Detail and Artwork list
 * @example
 * @author AnhDH
 * @version 1.0.0
 */
export async function GetCollectionData(collectionId: string) {
  try {
    const response = await axiosPrivate.get(`/collections/${collectionId}`);
    if (response.status !== 200) {
      return { artworks: [] };
    }
    const artworks: Artwork[] = response.data.artworks.map((artworkData: any) => {
      return {
        id: artworkData.artwork.id,
        title: artworkData.artwork.title,
        createdBy: artworkData.artwork.author.id,
        creatorFullName: artworkData.artwork.author.fullname,
        thumbnail: artworkData.artwork.thumbnail,
        likeCount: artworkData.artwork.likeCount,
        viewCount: artworkData.artwork.viewCount,
      };
    });
    const collection: CollectionProps = {
      id: response.data.id,
      creatorFullName: response.data.createdBy.fullname,
      collectionName: response.data.collectionName,
      privacy: response.data.privacy,
      numberOfArtworks: response.data.artworks.length,
      accountAvatar: response.data.createdBy.avatar,
      artworks: artworks,
    };

    return { collection, artworks };
  } catch (error) {
    return { artworks: [] };
  }
}

/**
 * Create a new Collection
 *
 * @description This function to create a new Collection
 * @returns Update status (True: Successfully | False: Failed)
 * @example
 * @author AnhDH, @thongnt0208
 * @version 2.0.0
 */
export async function CreateCollectionData({
  collectionName,
  privacy,
  artworkId,
}: {
  collectionName: string;
  privacy: number;
  artworkId: string;
}) {
  try {
    const response = await axiosPrivate.post(`/collections`, {
      collectionName,
      privacy,
      artworkId,
    });
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Update Collection Detail Data
 *
 * @description This function to update Collection Detail
 * @returns Update status (True: Successfully | False: Failed)
 * @example
 * @author AnhDH
 * @version 1.0.0
 */
export async function UpdateCollectionData({
  collectionId,
  collectionName,
  privacy,
}: {
  collectionId: string;
  collectionName: string;
  privacy: boolean;
}) {
  let privacyType = privacy ? 1 : 0;
  try {
    const response = await axiosPrivate.put(
      `/collections/${collectionId}`,
      JSON.stringify({
        collectionName,
        privacyType,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      console.log(response);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Delete a Collection
 *
 * @description This function to delete a Collection Detail from database
 * @returns Delete status (True: Successfully | False: Failed)
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function DeleteCollectionData(collectionId: string) {
  try {
    await axiosPrivate.delete(`/collections/${collectionId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Add an Artwork to Collection
 *
 * @description This function to Add an Artwork to Collection
 * @returns Adding status (True: Successfully | False: Failed)
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function AddArtworkToCollection({
  collectionId,
  artworkId,
}: {
  collectionId: string;
  artworkId: string;
}) {
  try {
    await axiosPrivate.post(`/collections/${collectionId}/artwork`, {
      artworkId: artworkId,
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Remove an Artwork from Collection
 *
 * @description This function to Remove an Artwork from Collection
 * @returns Adding status (True: Successfully | False: Failed)
 * @example
 * @author AnhDh
 * @version 1.0.0
 */
export async function RemoveArtworkFromCollection({
  collectionId,
  artworkId,
}: {
  collectionId: string;
  artworkId: string;
}) {
  try {
    await axiosPrivate.delete(`/collections/${collectionId}/artwork`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        artworkId,
      }),
    });
    return true;
  } catch (error) {
    return false;
  }
}
