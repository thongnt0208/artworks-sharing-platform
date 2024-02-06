import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "./style.scss";

type Props = {
  handleKeyDown: (e: any) => void;
  options: any;
  togglePanel: (option: any) => void;
  searchValue: string;
  setSearchValue: (value: any) => void;
  selectedSort: string;
  setSelectedSort: (value: string) => void;
};

const sortOptions = [
  { name: "Đề xuất", code: "recommend" },
  { name: "Mới nhất", code: "newest" },
  { name: "Nhiều người thích", code: "like" },
];

export default function SearchHeaderTemplate({ ...props }: Props) {
  const {
    handleKeyDown,
    options,
    togglePanel,
    searchValue,
    setSearchValue,
    selectedSort,
    setSelectedSort,
  } = props;
  const className = `${options.className} justify-content-space-between`;

  return (
    <div className={className}>
      <div className="search-bar flex gap-2 w-full">
        {/* Show panel button */}
        <Button
          className="w-full md:w-14rem rounded-search-btn"
          rounded
          icon={options?.collapsed ? "pi pi-filter" : "pi pi-angle-up"}
          iconPos="right"
          label={options?.collapsed ? "Hiện bộ lọc" : "Ẩn bộ lọc"}
          onClick={() => {
            try {
              togglePanel(options);
            } catch {}
          }}
        />
        {/* Input text */}
        <span className="p-input-icon-right input-text-container w-full">
          <InputText
            className="input-text"
            placeholder="Search"
            value={searchValue}
            onKeyDown={(e: any) => handleKeyDown(e)}
            onInput={(e: any) => setSearchValue(e.target.value)}
          />
          <i className="pi pi-search" />
        </span>
        {/* Sort button */}
        <Dropdown
          className="w-full md:w-14rem rounded-search-btn"
          value={selectedSort}
          options={sortOptions}
          optionLabel="name"
          placeholder="Sắp xếp theo ..."
          dropdownIcon="pi pi-sort-alt"
          onChange={(e) => setSelectedSort(e.value)}
        />
      </div>
    </div>
  );
}
