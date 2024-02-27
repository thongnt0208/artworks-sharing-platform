import { axiosPrivate } from "../../../hooks/useAxios";

/**
 * This function is used to get the download link of the asset by its id
 * 
 * @param id - The id of the asset
 * @returns Promise<string> - The download link of the asset or the link to error page
 * @author ThongNT
 * @version 1.1.0
 */
export async function GetAssetDownloadLinkById(id: string): Promise<string> {
  return axiosPrivate
    .get(`/assets/download/${id}`)
    .then((response) => {
      if (response?.status === 200) {
        return response.data.link;
      } else {
        return `https://artworkia-4f397.web.app/error?status=${response?.status}&message=${response?.data}`;
      }
    })
    .catch((error) => {
      console.error(error);
      return `https://artworkia-4f397.web.app/error?status=${error?.code}&message=${error?.message}`;
    });
}
