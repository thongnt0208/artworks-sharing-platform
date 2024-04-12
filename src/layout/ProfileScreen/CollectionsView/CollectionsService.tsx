import axios from "../../../hooks/useAxios";
import { CollectionProps } from "../../CollectionDetailScreen/CollectionDetailScreen";

export async function GetCollectionsData(
  account_id: string
): Promise<CollectionProps[]> {
  try {
    const response = await axios.get(`/account/${account_id}/collections`);
    return response.data.map((item: any) => {
      return {
        id: item.id,
        creatorFullName: item.createdBy.fullname,
        collectionName: item.collectionName,
        privacy: item.privacy,
        numberOfArtworks: item.items,
        accountAvatar: item.createdBy.accountAvatar,
        thumbnail: item.thumbnail,
      };
    });
  } catch (error) {
    throw new Error("Lấy dữ liệu thất bại.");
  }
}
