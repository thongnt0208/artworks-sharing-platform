import axios from "axios";
import { ArtworkProps } from "../../components/ArtworkCard";
import Cookies from "js-cookie";
import { cookieNames } from "../../const/uiConstants";

const BASE_URL = process.env.REACT_APP_REAL_API_ELASTICSEARCH_URL || "https://dummyjson.com";
let username = process.env.REACT_APP_ELASTIC_USERNAME || "";
let password = process.env.REACT_APP_ELASTIC_PASSWORD || "";

/**
 * This function is used to call API that search all artworks by keyword
 * @param value keyword to search
 * @returns Promise<any> response from API
 * @author ThongNT
 * @version 1.0.2
 */
async function searchAll(value: string): Promise<any> {
  let url = `${BASE_URL}/artworks/_search`;

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

function castElt2ArtworkProps(artworks: any[]): ArtworkProps[] {
  return artworks?.map((artwork: any) => {
    return {
      id: artwork._source.id,
      title: artwork._source.title,
      thumbnail: artwork._source.thumbnail,
      viewCount: artwork._source.viewCount,
      likeCount: artwork._source.likeCount,
      createdBy: artwork._source.fullname,
      creatorFullName: artwork._source.fullname,
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
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function GetSimilarAwsByCookie(): Promise<ArtworkProps[]> {
  const interactedAws: { id: string }[] = JSON.parse(
    Cookies.get(cookieNames.interactedArtworks) || "[]"
  );
  const body = {
    size: 25,
    query: {
      more_like_this: {
        fields: ["title", "categorylist", "taglist", "username"],
        like: interactedAws.slice(-3).map((aw) => {
          return {
            _id: aw.id,
          };
        }),
        min_term_freq: 1,
        min_doc_freq: 5,
        max_query_terms: 20,
      },
    },
  };

  try {
    const res = await axios.post(`${BASE_URL}/artworks/_search`, body, {
      auth: { username, password },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return castElt2ArtworkProps(res.data?.hits?.hits);
  } catch (error: any) {
    console.error(`Error making search similar artworks: `, error);
    return [];
  }
}
