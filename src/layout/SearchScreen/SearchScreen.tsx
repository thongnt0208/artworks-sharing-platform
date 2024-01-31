import "./SearchScreen.scss";
import { useEffect, useState } from "react";
import Tag, { TagProps } from "../../components/Tag";
import { GetCategoriesData, GetNewArtworksData, GetTagsData } from "../HomeScreen/HomeService";
import { CategoryProps } from "../HomeScreen/HomeScreen";
import { ArtworkProps } from "../../components/ArtworkCard";
import Gallery from "../../components/Gallery";
// ----------------------------------------------------------------
import { ProgressSpinner } from "primereact/progressspinner";
import InputsContainer from "./InputsContainer/InputsContainer";
// ----------------------------------------------------------------

export type SearchScreenStateType = {
  searchValue: string;
  tags: TagProps[];
  categories: CategoryProps[];
  artworks: ArtworkProps[];
  isLoading: boolean;
  selectedSort: string;
  selectedType: string;
  selectedCategory: string | null;
  isSubscribeArea: boolean;
  isAssets: boolean;
  isAssetsFree: boolean;
};

type Props = {};

export default function SearchScreen({ ...props }: Props) {
  const [state, setState] = useState<SearchScreenStateType>({
    searchValue: new URLSearchParams(window.location.search).get("value") || "",
    tags: [],
    categories: [],
    artworks: [],
    isLoading: false,
    selectedSort: "Mới nhất",
    selectedType: "artworks",
    selectedCategory: null,
    isSubscribeArea: true,
    isAssets: true,
    isAssetsFree: true,
  });

  let handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // addComment();
    }
  };

  const fetchData = async () => {
    setState({ ...state, isLoading: true });
    try {
      const [newArtworksData, tagsData, categoriesData] = await Promise.all([
        GetNewArtworksData(),
        GetTagsData(),
        GetCategoriesData(),
      ]);
      setState({
        ...state,
        artworks: newArtworksData,
        tags: tagsData,
        categories: categoriesData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setState({ ...state, isLoading: false });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchValue]);

  return (
    <div className="search-container">
      {/* Inputs */}
      <div className="inputs-container">
        <InputsContainer state={state} setState={setState} handleKeyDown={handleKeyDown} />
      </div>

      {state.isLoading && <ProgressSpinner />}

      {/* Tags */}
      <div className="tags-container flex flex-nowrap">
        {state.tags?.map((tag) => (
          <div key={tag.id}>
            <Tag id={tag.id} tagName={tag.tagName} />
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="result-container">
        <Gallery artworks={state.artworks} />
      </div>
    </div>
  );
}
