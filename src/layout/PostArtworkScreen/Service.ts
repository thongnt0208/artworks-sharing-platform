import { CategoryProps } from "./../HomeScreen/HomeScreen";
import useAxios, { axiosPrivate } from "../../hooks/useAxios";
// ----------------------------------------------------------------------

export type SoftwareUsedType = {
  id: string;
  softwareName: string;
};

export type LicenseType = {
  id: string;
  licenseName: string;
  licenseDescription: string;
};

/**
 * This function to POST an artwork to the database
 *
 * @param
 * @return
 * @example
 * @author ThongNT
 * @version 2.0.0
 */
export async function postArtwork(formValue: any): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("Title", formValue.title);
    formData.append("Description", formValue.description);
    formData.append("Privacy", formValue.privacy);
    formValue.tags.map((tag: any) => formData.append("Tags", tag));
    formValue.categories.map((category: any) => formData.append("Categories", category));
    formData.append("Thumbnail", formValue.images[0]);
    formValue.images.map((imageFile: any) => formData.append("ImageFiles", imageFile));

    if (formValue.assets) {
      const _assetsList = formValue.assets;
      _assetsList.forEach((asset: any, index: number) => {
        formData.append(`AssetFiles[${index}].AssetTitle`, asset.AssetTitle);
        formData.append(`AssetFiles[${index}].Description`, asset.Description);
        formData.append(`AssetFiles[${index}].File`, asset.File);
        formData.append(`AssetFiles[${index}].Price`, asset.Price);
      });
    }
    formData.append("LicenseTypeId", formValue.licenseTypeId);
    formValue.softwareUseds.map((software: any) => formData.append("SoftwareUseds", software));
    formData.append("IsAIGenerated", formValue.isAIGenerated);

    return axiosPrivate.post("/artworks", formData);
  } catch {
    return Promise.reject("Error fetching categories");
  }
}

/**
 * Get Category list
 *
 * @description This function to get category list from database
 * @returns {Promise<CategoryProps[]>}
 * @example
 * getCategoryList().then((categories) => {console.log(categories)})
 * @author ThongNT
 * @version 1.2.1
 */
export async function getCategoriesList(): Promise<CategoryProps[]> {
  return useAxios
    .get("/categories")
    .then((response) => {
      const categories = response.data;

      // Transform categories into the desired format
      const transformedCategories = categories?.map((category: CategoryProps) => ({
        label: category.categoryName,
        value: category.id,
      }));
      console.log(transformedCategories);

      return transformedCategories;
    })
    .catch((error) => {
      console.log("Error fetching categories" + error);

      throw error;
    });
}

/**
 * This function to get software list from database
 *
 * @returns {Promise<SoftwareUsedType[]>}
 * @example
 * getSoftwareList().then((softwares) => {console.log(softwares)})
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function getSoftwareList(): Promise<SoftwareUsedType[]> {
  try {
    const response = await useAxios.get("/softwareuseds");

    const softwares = response.data;

    // Transform softwares into the desired format
    const transformedSoftwares = softwares?.map(
      (software: SoftwareUsedType) =>
        ({
          id: software.id,
          softwareName: software.softwareName,
        } as SoftwareUsedType)
    );

    return transformedSoftwares;
  } catch {
    return Promise.reject("Error fetching softwares");
  }
}

/**
 * This function to get license list from database
 *
 * @returns {Promise<LicenseType[]>}
 * @example
 * getLicenseList().then((licenses) => {console.log(licenses)})
 * @version 1.0.0
 * @author @thongnt0208
 */
export async function getLicenseList(): Promise<LicenseType[]> {
  try {
    const response = await useAxios.get("/licensetypes");

    const licenses = response.data;

    // Transform licenses into the desired format
    const transformedLicenses: LicenseType[] = licenses?.map(
      (license: LicenseType) =>
        ({
          id: license.id,
          licenseName: license.licenseName,
          licenseDescription: license.licenseDescription,
        } as LicenseType)
    );

    return transformedLicenses;
  } catch {
    return Promise.reject("Error fetching licenses");
  }
}
