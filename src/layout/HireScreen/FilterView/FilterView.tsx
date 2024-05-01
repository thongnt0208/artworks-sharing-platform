import React from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { OverlayPanel } from "primereact/overlaypanel";
import "./FilterView.scss";
import TagCarousel from "../../../components/TagCarousel";

type TagProps = {
  id: string;
  tagName: string;
};

// interface SortOptions {
//   sortBy: string;
//   sortOrder: "asc" | "desc";
// }

const FilterView: React.FC<{ tags: TagProps[] }> = ({ tags }) => {
  // const [sortOptions, setSortOptions] = useState<SortOptions>({
  //   sortBy: "name",
  //   sortOrder: "asc",
  // });
  // const op = useRef<OverlayPanel>(null);

  return (
    <div className="filter-view grid w-full">
      <div className="tag-carousel-section w-full">
        <TagCarousel tags={tags} slidesPerView={9}/>
      </div>
      {/* <div className="search-section col-2 p-3 flex flex-row justify-content-center align-items-center">
        <span className="search-bar p-input-icon-right">
          <i className="pi pi-search" />
          <InputText
            className="search-input w-full"
            placeholder="Tìm nhà sáng tạo"
          />
        </span>
        <Button
          className="filter-btn"
          icon="pi pi-filter"
          onClick={(e) => op.current?.toggle(e)}
        />
        <OverlayPanel ref={op} showCloseIcon>
          <div>
            <h5>Sort Options</h5>
            <div>
              <label htmlFor="sortBy">Sort By:</label>
              <InputText
                id="sortBy"
                value={sortOptions.sortBy}
                onChange={(e) =>
                  setSortOptions({ ...sortOptions, sortBy: e.target.value })
                }
              />
            </div>
            <div>
              <label>Sort Order:</label>
              <Button
                className="p-button-text"
                label="ASC"
                onClick={() =>
                  setSortOptions({ ...sortOptions, sortOrder: "asc" })
                }
                style={{ marginRight: "0.5rem" }}
              />
              <Button
                className="p-button-text"
                label="DESC"
                onClick={() =>
                  setSortOptions({ ...sortOptions, sortOrder: "desc" })
                }
              />
            </div>
          </div>
        </OverlayPanel>
      </div> */}
    </div>
  );
};

export default FilterView;
