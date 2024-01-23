import useAxios, { axiosPrivate } from "../../hooks/useAxios";
import { Category } from "../ArtworkDetailScreen/content/ArtworkDetailType";
// ----------------------------------------------------------------------

/**
 * This function to POST an artwork to the database
 *
 * @param
 * @return
 * @example
 * @author ThongNT
 * @version 1.0.0
 */
export async function postArtwork(formValue: any): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("Title", formValue.title);
    formData.append("Description", formValue.description);
    formData.append("Privacy", formValue.privacy);
    formValue.tags.map((tag: any)=> formData.append("Tags", tag))
    formValue.categories.map((category: any) => formData.append("Categories", category));
    formData.append("Thumbnail", formValue.images[0]);
    formValue.images.map((imageFile: any) => formData.append("ImageFiles", imageFile));

    return axiosPrivate.post("/artworks", formData);
  } catch {
    return Promise.reject("Error fetching categories");
  }
}

/**
 * Get Category list
 *
 * @description This function to get category list from database
 * @returns {Promise<Category[]>}
 * @example
 * getCategoryList().then((categories) => {console.log(categories)})
 * @author ThongNT
 * @version 1.0.0
 */
export async function getCategoriesList(): Promise<Category[]> {
  try {
    const response = await useAxios.get("/categories");
    console.log(response);

    const categories = response.data;

    // Transform categories into the desired format
    const transformedCategories = categories?.map((category: Category) => ({
      label: category.categoryName,
      value: category.id,
    }));

    return transformedCategories;
  } catch {
    return Promise.reject("Error fetching categories");
  }
}
