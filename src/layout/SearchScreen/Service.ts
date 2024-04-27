import axios from "axios";
import { ArtworkProps } from "../../components/ArtworkCard";
import Cookies from "js-cookie";
import { cookieNames } from "../../const/uiConstants";

const BASE_URL = process.env.REACT_APP_REAL_API_BASE_URL || "https://dummyjson.com";
type searchParamTypes = {
  keyword: string;
  isAssetAvailable?: boolean;
  isAssetFree?: boolean;
  categoryId?: string;
  sortColumn?: string;
  sortOrder?: string;
  pageSize?: number;
  pageNumber?: number;
};

/**
 * This function is used to search all artworks by keyword
 * @param searchValue keyword to search
 * @param isHaveAssets is have assets
 * @param isAssetsFree is assets free
 * @param categoryId category id
 * @param sortColumn sort column 'viewCount': sắp xếp theo view
'createdOn': sx theo ngày tạo
'commentCount': sx theo comment
'likeCount': sx theo like
mặc định sx theo liên quan nhất (score do elasticsearch đưa ra)

  * @param sortOrder sort order 'asc' or 'desc'
  * @param pageSize page size
  * @param pageNumber page number
 * @returns Promise<ArtworkProps[]> list of artworks that match the keyword
 * @example
 * ```
 * const artworks = await searchArtworksByKeyword("abc");
 * ```
 * @author @thongnt0208
 * @version 2.0.0
 */
export async function searchArtworksByKeyword(
  searchValue: string,
  isHaveAssets?: boolean,
  isAssetsFree?: boolean,
  categoryId?: string,
  sortColumn?: string,
  sortOrder?: string,
  pageSize?: number,
  pageNumber?: number
): Promise<ArtworkProps[]> {
  const url = `${BASE_URL}/artworks/elastic`;
  const param: searchParamTypes = {
    keyword: searchValue,
    ...(isHaveAssets && { isAssetAvailable: isHaveAssets }),
    ...(isAssetsFree && { isAssetFree: isAssetsFree }),
    ...(categoryId && { categoryId }),
    ...(sortColumn && sortColumn !== "" && { sortColumn }),
    ...(sortOrder && { sortOrder }),
    ...(pageSize && { pageSize }),
    ...(pageNumber && { pageNumber }),
  };

  const res = await axios.get(url, { params: param });
  const artworks: ArtworkProps[] = res.data?.items?.map(
    (artwork: any) =>
      ({
        id: artwork?.id,
        title: artwork?.title,
        thumbnail: artwork?.thumbnail,
        viewCount: artwork?.viewCount,
        likeCount: artwork?.likeCount,
        createdBy: artwork?.account?.fullname,
        creatorFullName: artwork?.account?.fullname,
      } ?? [])
  );

  return artworks;
}

function castElt2ArtworkProps(artworks: any[]): ArtworkProps[] {
  return artworks?.map((artwork: any) => {
    return {
      id: artwork?.id,
      title: artwork?.title,
      thumbnail: artwork?.thumbnail,
      viewCount: artwork?.viewCount,
      likeCount: artwork?.likeCount,
      createdBy: artwork?.account?.fullname,
      creatorFullName: artwork?.account?.fullname,
    };
  });
}
/**
 * This function is used to get similar artworks by cookie
 *
 * @returns Promise<ArtworkProps[]> list of artworks that are similar to the interacted artworks
 * @example
 * ```
 * const similarArtworks = await GetSimilarAwsByCookie();
 * ```
 * @version 2.0.0
 * @author @thongnt0208
 */
export async function GetSimilarAwsByCookie(): Promise<ArtworkProps[]> {
  const interactedAws: { id: string }[] = JSON.parse(
    Cookies.get(cookieNames.interactedArtworks) || "[]"
  );

  let _url = `${BASE_URL}/artworks/recommendation`;

  interactedAws.slice(-3).map((aw, index) => {
    if (index === 0) _url += `?ArtworkIds=${aw.id}`;
    else _url += `&ArtworkIds=${aw.id}`;
    return undefined;
  });

  try {
    const res = await axios.get(_url);
    return castElt2ArtworkProps(res.data?.items);
  } catch (error: any) {
    console.error(`Error making search similar artworks: `, error);
    return [];
  }
}
