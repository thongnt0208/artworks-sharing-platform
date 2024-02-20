import { axiosPrivate } from "../../../hooks/useAxios";

export async function GetAssetDownloadLinkById(id: string): Promise<string> {
  return axiosPrivate
    .get(`/assets/download/${id}`)
    .then((response) => {
      console.log(response);
      return response.data.link;
    })
    .catch((error) => {
      console.error("Loi roi" + error);
      return error.message || "Something went wrong";
    });
  //   const res = await axiosPrivate.get(`${API_URL}/assets/download/${id}`);
  //    const result = res?.data?.link ? res?.data?.link : "";
  //    if (res.status !== 200) {
  //     return "";
  //   }

  //   return await result;
}
