/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import "./SearchScreen.scss";
import { useEffect, useState } from "react";
import Tag, { TagProps } from "../../components/Tag";
import { GetCategoriesData, GetTagsData } from "../HomeScreen/HomeService";
import { awDetailStateToolsType, CategoryProps } from "../HomeScreen/HomeScreen";
import { ArtworkProps } from "../../components/ArtworkCard";
import Gallery from "../../components/Gallery";
// ----------------------------------------------------------------
import { ProgressSpinner } from "primereact/progressspinner";
import InputsContainer from "./InputsContainer/InputsContainer";
import { GetSimilarAwsByCookie, searchArtworksByKeyword } from "./Service";
import { ArtworkDetailType } from "../ArtworkDetailScreen/ArtworkDetailType";
import { getAuthInfo } from "../../util/AuthUtil";
import { fetchArtworkDetail, fetchIsFollow } from "../ArtworkDetailScreen/Service";
import { CatchAPICallingError } from "..";
import { useNavigate } from "react-router-dom";
import CategoryAndTag from "../HomeScreen/CategoryAndTag/CategoryAndTag";
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
  const [selectingAw, setSelectingAw] = useState<ArtworkProps>({} as ArtworkProps);
  const [currentAwDetail, setCurrentAwDetail] = useState({} as any);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const navigate = useNavigate();

  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Call Search API
      const _artworks = await searchArtworksByKeyword(state.searchValue);
      setState({
        ...state,
        artworks: _artworks,
      });
    }
  };

  const fetchData = async () => {
    setState({ ...state, isLoading: true });
    try {
      const [searchArtworks, tagsData, categoriesData] = await Promise.all([
        state.searchValue ? searchArtworksByKeyword(state.searchValue) : GetSimilarAwsByCookie(),
        GetTagsData(),
        GetCategoriesData(),
      ]);
      setState({
        ...state,
        artworks: searchArtworks,
        tags: tagsData,
        categories: categoriesData,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setState({ ...state, isLoading: false });
    }
  };

  const refreshData = async () => {
    setState({ ...state, isLoading: true });
    try {
      const artworks = await searchArtworksByKeyword(state.searchValue);
      setState({
        ...state,
        artworks: artworks,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setState({ ...state, isLoading: false });
    }
  };

  const awDetailStateTools: awDetailStateToolsType = {
    selectingAw,
    setSelectingAw,
    currentAwDetail,
    setCurrentAwDetail,
    isLiked,
    setIsLiked,
    isFollowed,
    setIsFollowed,
    isLoading: isLoadingDetail,
  };

  const fetchIsFollowed = (id: string) => {
    fetchIsFollow(id)
      .then((res) => setIsFollowed(res))
      .catch((err) => setIsFollowed(false));
  };

  const fetchDetail = () => {
    setIsLoadingDetail(true);
    setCurrentAwDetail({} as ArtworkDetailType);
    fetchArtworkDetail(selectingAw?.id, currentUserId)
      .then((res) => {
        setCurrentAwDetail(res);
        setIsLiked(res.isLiked);
        fetchIsFollowed(res.account.id);
      })
      .catch((err) => CatchAPICallingError(err, navigate))
      .finally(() => setIsLoadingDetail(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectingAw?.id) {
      fetchDetail();
    }
  }, [selectingAw]);

  // Auto refresh data when searchValue changes
  useEffect(() => {
    let timeoutId: any;

    if (state.searchValue !== "") {
      // Clear the previous timeout if there's any
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => refreshData(), 1000);
    }
    return () => clearTimeout(timeoutId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchValue]);

  return (
    <div className="search-container">
      {/* Inputs */}
      <div className="inputs-container">
        <InputsContainer state={state} setState={setState} handleKeyDown={handleKeyDown} />
      </div>

      {/* Tags */}
      <CategoryAndTag tags={state.tags} categories={[]} />

      {/* Result */}
      {state.isLoading && <ProgressSpinner />}
      <div className="result-container">
        {state.artworks.length === 0 && !state.isLoading && <p>Không tìm thấy dữ liệu nào</p>}
        <Gallery artworks={state.artworks} awDetailStateTools={awDetailStateTools} />
      </div>
    </div>
  );
}
