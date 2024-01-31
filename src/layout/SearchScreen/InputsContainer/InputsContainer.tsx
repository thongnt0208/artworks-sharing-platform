import "./InputsContainer.scss";
import { KeyboardEvent, useRef } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SearchScreenStateType } from "../SearchScreen";
import { Panel } from "primereact/panel";
import SearchHeaderTemplate from "../SearchHeaderTemplate/SearchHeaderTemplate";
// ----------------------------------------------------------------
const types = [
  { name: "Bài đăng", value: "artworks", key: "type1" },
  { name: "Tài nguyên", value: "assets", key: "type2" },
  { name: "Tác giả", value: "profiles", key: "type3" },
];

type Props = {
  state: SearchScreenStateType;
  setState: (state: SearchScreenStateType) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
};

export default function InputsContainer({ ...props }: Props) {
  const { state, setState, handleKeyDown } = props;
  const panelRef = useRef<Panel>(null);

  const searchHeaderTemplate = (options: any) => {
    const _props = {
      handleKeyDown: handleKeyDown,
      options: options,
      togglePanel: (option: any) => {
        if (panelRef.current) {
          panelRef.current.toggle(option);
        }
      },
      searchValue: state.searchValue,
      setSearchValue: (value: string) => setState({ ...state, searchValue: value }),
      selectedSort: state.selectedSort,
      setSelectedSort: (sort: string) => setState({ ...state, selectedSort: sort }),
    };

    return <SearchHeaderTemplate {..._props} />;
  };

  return (
    <Panel ref={panelRef} headerTemplate={searchHeaderTemplate} toggleable collapsed>
      <div className="filters flex flex-column md:flex-row align-items-center justify-content-center gap-3 md:gap-8">
        {/* type */}
        <div className="type flex gap-3">
          {types.map((type) => (
            <div key={type.key} className={`${type.value} type-item flex gap-2`}>
              <RadioButton
                inputId={type.key}
                value={type.value}
                onChange={(e) => setState({ ...state, selectedType: e.value })}
                checked={state.selectedType === type.value}
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
              checked={state.isSubscribeArea}
              onChange={() => setState({ ...state, isSubscribeArea: !state.isSubscribeArea })}
            />
            <label htmlFor="subscribeArea">Có khu vực đăng ký</label>
          </div>
          <div className="assets-checkbox flex gap-3">
            <div className="asset">
              <Checkbox
                inputId="assets"
                checked={state.isAssets}
                onChange={() => setState({ ...state, isAssets: !state.isAssets })}
              />
              <label htmlFor="assets">Có kèm tài nguyên</label>
            </div>
            <div className="free">
              <Checkbox
                inputId="assetsFree"
                disabled={!state.isAssets}
                checked={state.isAssetsFree}
                onChange={() => setState({ ...state, isAssetsFree: !state.isAssetsFree })}
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
              value={state.selectedCategory}
              onChange={(e: DropdownChangeEvent) =>
                setState({ ...state, selectedCategory: e.value })
              }
              options={state.categories}
              optionLabel="categoryName"
              optionValue="id"
              placeholder="Thể loại"
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
