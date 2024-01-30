import "./SearchScreen.scss";
import { useEffect, useRef, useState } from "react";
import Tag, { TagProps } from "../../components/Tag";
import { GetCategoriesData, GetNewArtworksData, GetTagsData } from "../HomeScreen/HomeService";
import { CategoryProps } from "../HomeScreen/HomeScreen";
import { ArtworkProps } from "../../components/ArtworkCard";
import Gallery from "../../components/Gallery";
import { ProgressSpinner } from "primereact/progressspinner";
import { Panel } from "primereact/panel";
import { Menu } from "primereact/menu";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import SearchHeaderTemplate from "./SearchHeaderTemplate/SearchHeaderTemplate";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

type Props = {};

export default function SearchScreen({ ...props }: Props) {
  const urlParams = new URLSearchParams(window.location.search);

  const [searchValue, setSearchValue] = useState(urlParams.get("value") || "");
  const [tags, setTags] = useState<TagProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [artworks, setArtworks] = useState<ArtworkProps[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Mới nhất" as string);
  const [selectedType, setSelectedType] = useState("artworks" as string);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubscribeArea, setIsSubscribeArea] = useState(true);
  const [isAssets, setIsAssets] = useState(true);
  const [isAssetsFree, setIsAssetsFree] = useState(true);
  const panelRef = useRef<Panel>(null);

  const types = [
    { name: "Bài đăng", value: "artworks", key: "type1" },
    { name: "Tài nguyên", value: "assets", key: "type2" },
    { name: "Tác giả", value: "profiles", key: "type3" },
  ];

  let handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // addComment();
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [newArtworksData, tagsData, categoriesData] = await Promise.all([
        GetNewArtworksData(),
        GetTagsData(),
        GetCategoriesData(),
      ]);
      setArtworks(newArtworksData);
      setTags(tagsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchHeaderTemplate = (options: any) => {
    const _props = {
      handleKeyDown: handleKeyDown,
      options: options,
      togglePanel: (option: any) => {
        if (panelRef.current) {
          panelRef.current.toggle(option);
        }
      },
      searchValue: searchValue,
      setSearchValue: setSearchValue,
      selectedSort: selectedSort,
      setSelectedSort: setSelectedSort,
    };

    return <SearchHeaderTemplate {..._props} />;
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  return (
    <div className="search-container">
      {/* Inputs */}
      <div className="inputs-container">
        <Panel ref={panelRef} headerTemplate={searchHeaderTemplate} toggleable>
          <div className="filters flex align-items-center justify-content-center gap-8">
            {/* type */}
            <div className="type flex gap-3">
              {types.map((type) => (
                <div key={type.key} className={`${type.value} type-item flex gap-2`}>
                  <RadioButton
                    inputId={type.key}
                    value={type.value}
                    onChange={(e) => setSelectedType(e.value)}
                    checked={selectedType === type.value}
                  />
                  <label htmlFor={type.key}>{type.name}</label>
                </div>
              ))}
            </div>
            {/* checkbox */}
            <div className="subscribe-assets flex gap-3">
              <div className="subscribe-checkbox">
                <Checkbox
                  inputId="subscribeArea"
                  checked={isSubscribeArea}
                  onChange={() => setIsSubscribeArea(!isSubscribeArea)}
                />
                <label htmlFor="subscribeArea">Có khu vực đăng ký</label>
              </div>
              <div className="assets-checkbox flex gap-3">
                <div className="asset">
                  <Checkbox
                    inputId="assets"
                    checked={isAssets}
                    onChange={() => setIsAssets(!isAssets)}
                  />
                  <label htmlFor="assets">Có kèm tài nguyên</label>
                </div>
                <div className="free">
                  <Checkbox
                    inputId="assetsFree"
                    disabled={!isAssets}
                    checked={isAssetsFree}
                    onChange={() => setIsAssetsFree(!isAssetsFree)}
                  />
                  <label htmlFor="assets">Tài nguyên miễn phí</label>
                </div>
              </div>
            </div>
            {/* category */}
            <div className="category">
              <div className="filter-content">
                <Dropdown
                  className="w-full md:w-8rem rounded-dropdown-btn"
                  value={selectedCategory}
                  onChange={(e: DropdownChangeEvent) => setSelectedCategory(e.value)}
                  options={categories}
                  optionLabel="categoryName"
                  optionValue="id"
                  placeholder="Thể loại"
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {isloading && <ProgressSpinner />}

      {/* Tags */}
      <div className="tags-container flex flex-nowrap">
        <div className="tags-list flex align-items-center">
          {tags?.map((tag) => (
            <Tag id={tag.id} tagName={tag.tagName} />
          ))}
        </div>
        <Button className="show-more-button" id="showMoreButton">
          Show More
        </Button>
      </div>

      {/* Result */}
      <div className="result-container">
        <Gallery artworks={artworks} />
      </div>
    </div>
  );
}
