import "./InputsContainer.scss";
import { KeyboardEvent, useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SearchScreenStateType } from "../SearchScreen";
import { Panel } from "primereact/panel";
import SearchHeaderTemplate from "../SearchHeaderTemplate/SearchHeaderTemplate";
// ----------------------------------------------------------------

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
    <Panel ref={panelRef} headerTemplate={searchHeaderTemplate} toggleable>
      <div className="filters flex flex-column md:flex-row align-items-center justify-content-center gap-3 md:gap-8">
        {/* checkbox */}
        <div className="subscribe-assets flex gap-3">
          <div className="assets-checkbox flex gap-3">
            <div className="asset">
              <Checkbox
                inputId="assets"
                checked={state.isAssets}
                onChange={() => setState({ ...state, isAssets: !state.isAssets })}
              />
              <label htmlFor="assets">Có kèm tài nguyên</label>
            </div>
            <div className={`free ${state.isAssets ? "" : "hidden"}`}>
              <Checkbox
                inputId="assetsFree"
                checked={state.isAssetsFree}
                onChange={() => setState({ ...state, isAssetsFree: !state.isAssetsFree })}
              />
              <label htmlFor="assetsFree">Tài nguyên miễn phí</label>
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
