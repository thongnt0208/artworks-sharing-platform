import useAxios, { axiosPrivate } from "../../../hooks/useAxios";
import { ReportType } from "./ReportDialog";

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
      console.log(response);
      
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

/**
 * This function is used to get the list of report types
 *
 * @returns Promise<ReportType[]> - The list of report types or an empty array if there is an error
 * @author ThongNT
 * @version 1.0.0
 */
export async function GetReportTypes(): Promise<ReportType[]> {
  return useAxios
    .get("/reports/report-type-enum")
    .then((response) => {
      if (response?.status === 200) {
        return response?.data || [];
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

/**
 * This function is used to get the list of report entities
 *
 * @returns Promise<ReportType[]> - The list of report entities or an empty array if there is an error. type ReportType = {id: number; name: string;}
 * @version 1.0.0
 */
async function GetReportEntities(): Promise<ReportType[]> {
  return useAxios
    .get("/reports/report-entity-enum")
    .then((response) => {
      if (response?.status === 200) {
        return response.data;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

/**
 * This function is used to make a report
 *
 * @param entityName - The name of the entity to report
 * @param targetId - The id of the entity to report
 * @param reportTypeId - The id of the report type
 * @param description  - The description or reason of the report
 * @returns true if the report is made successful, false otherwise
 * @author ThongNT
 * @version 1.0.0
 */
export async function MakeReport(
  entityName: string,
  targetId: string,
  reportTypeId: number,
  description: string
): Promise<boolean> {
  const reportEntities = await GetReportEntities();
  const selectedEntity = reportEntities.find(
    (entity) => entity.name.toUpperCase() === entityName.toUpperCase()
  );

  if (!selectedEntity) {
    console.error(`Invalid report entity: ${entityName}`);
    return false;
  }

  const reportEntityId = selectedEntity.id;

  return axiosPrivate
    .post("/reports", {
      reportType: reportTypeId,
      reason: description,
      reportEntity: reportEntityId,
      targetId: targetId,
    })
    .then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
