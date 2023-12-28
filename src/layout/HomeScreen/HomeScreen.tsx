import React, {useState, useEffect} from "react";
import CategoryAndTag from "./CategoryAndTag/CategoryAndTag";
import MenuTab from "./MenuTab/MenuTab";
import { GetArtworksData, GetCategoriesData, GetTagsData } from "./HomeService";
import { Link } from "react-router-dom";

type TagProps = {
  id: string;
  tagName: string;
};

type CategoryProps = {
  id: string;
  categoryName: string;
};

type ArtworksProps = {
  id: string,
  title: string,
  subTitle: string,
  image: string,
  likeNum: number,
  viewNum: number,
}

const HomeScreen: React.FC = () => {
  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [artworks, setArtworks] = useState<ArtworksProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tagsData = await GetTagsData();
      setTags(tagsData);
      const categoriesData = await GetCategoriesData();
      setCategories(categoriesData);
      const artworksData = await GetArtworksData();
      setArtworks(artworksData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to="/login">Log in</Link>
      <CategoryAndTag categories={categories} tags={tags} />
      <MenuTab artworks={artworks} />
    </>
  );
};

export default HomeScreen;