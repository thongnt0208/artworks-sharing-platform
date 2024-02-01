import axios from "axios";
import { ArtworkProps } from "../../components/ArtworkCard";

/**
 * This function is used to call API that search all artworks by keyword
 * @param value keyword to search
 * @returns Promise<any> response from API
 * @author ThongNT
 * @version 1.0.1
 */
async function searchAll(value: string): Promise<any>{
  const BASE_URL = process.env.REACT_APP_REAL_API_ELASTICSEARCH_URL || "https://dummyjson.com";
  let url = `${BASE_URL}/artworks/_search`;
  let username = process.env.REACT_APP_ELASTIC_USERNAME || "";
  let password = process.env.REACT_APP_ELASTIC_PASSWORD || "";

  const body = {
    query: {
      query_string: {
        query: value,
        default_field: "*",
      },
    },
  };

  try {
    const response = await axios.post(url, body, {
      auth: { username, password },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response.data);
    return response;
  } catch (error: any) {
    console.error(`Error making search ${value}: `, error);
    return error;
  }
}

/**
 * This function is used to search all artworks by keyword
 * @param searchValue keyword to search
 * @returns Promise<ArtworkProps[]> list of artworks that match the keyword
 * @example
 * ```
 * const artworks = await searchArtworksByKeyword("abc");
 * ```
 * @author ThongNT
 * @version 1.0.0
 */
export async function searchArtworksByKeyword(searchValue: string): Promise<ArtworkProps[]> {
  const res = await searchAll(searchValue);
  const _artworks: ArtworkProps[] = [];
  if (res) {
    let _tmp = res.data?.hits?.hits;
    if (_tmp && _tmp.length > 0) {
      for (const artwork of _tmp) {
        _artworks.push({
          id: artwork?._source?.id,
          title: artwork?._source?.title,
          thumbnail: artwork?._source?.thumbnail,
          viewCount: artwork?._source?.viewCount,
          likeCount: artwork?._source?.likeCount,
          createdBy: artwork?._source?.fullname,
          creatorFullName: artwork?._source?.fullname,
        });
      }
    }
  }
  return _artworks;
}
