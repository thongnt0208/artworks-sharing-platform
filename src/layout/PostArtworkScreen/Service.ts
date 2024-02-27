import { CategoryProps } from './../HomeScreen/HomeScreen';
import useAxios, { axiosPrivate } from "../../hooks/useAxios";
// ----------------------------------------------------------------------

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
 * @version 1.0.1
 */
export async function getCategoriesList(): Promise<CategoryProps[]> {
  try {
    const response = await useAxios.get("/categories");

    const categories = response.data;

    // Transform categories into the desired format
    const transformedCategories = categories?.map((category: CategoryProps) => ({
      label: category.categoryName,
      value: category.id,
    }));

    return transformedCategories;
  } catch {
    return Promise.reject("Error fetching categories");
  }
}
