import { axiosPrivate } from "../../../hooks/useAxios";
import { AssetsProps } from "../../../components/AssetsCard";
import { BoughtAssetsProps } from "./BoughtAssetsSection/BoughtAssets";

export async function GetAssetsData(accountId: string, pageNumber: number, pageSize: number): Promise<AssetsProps[]> {
  try {
    const response = await axiosPrivate.get(`/accounts/${accountId}/assets`, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    if (response.status !== 200) {
      return [];
    } else {
      let assetsData: AssetsProps[] = [];
      if (Array.isArray(response.data.items)) {
        assetsData = response.data.items.map((asset: any) => ({
          id: asset.id,
          title: asset.title,
          description: asset.description,
          thumbnail: asset.thumbnail,
          viewCount: asset.viewCount,
          likeCount: asset.likeCount,
          commentCount: asset.commentCount,
          privacy: asset.privacy,
          state: asset.state,
          createdBy: asset.createdBy,
          createdOn: asset.createdOn,
          itemsList: asset.assets.map((asset: any) => ({
            id: asset.id,
            name: asset.assetTitle,
            price: asset.price,
            description: asset.assetTitle,
            extension: asset.contentType,
            size: asset.size,
            thumbnail: asset.thumbnail,
            lastModificatedOn: asset.lastModificatedOn,
            assetType: asset.assetType,
          })),
        }));
      }
      return assetsData;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function GetBoughtAssetsData(
  accountId: string,
  pageNumber: number,
  pageSize: number
): Promise<BoughtAssetsProps[]> {
  try {
    const response = await axiosPrivate.get(`/accounts/${accountId}/assets-bought`, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    if (response.status !== 200) {
      return [];
    } else {
      let assetsData: BoughtAssetsProps[] = [];

      if (Array.isArray(response.data.items)) {
        assetsData = response.data.items.map((asset: any) => ({
          id: asset.id,
          artworkId: asset.artworkId,
          order: asset.order,
          assetTitle: asset.assetTitle,
          description: asset.description,
          assetName: asset.assetName,
          price: asset.price,
          extension: asset.contentType,
          size: asset.size,
          isBought: asset.isBought,
          fileMetaData: asset.fileMetaData,
          lastModificatedOn: asset.lastModificatedOn,
        }));
      }
      return assetsData;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function RemoveAssetData(assetId: string): Promise<number> {
  try {
    const response = await axiosPrivate.delete(`/assets/${assetId}`);
    return response.status;
  } catch (error) {
    throw  error;
  }
}
