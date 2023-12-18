import React, { lazy, Suspense, useState } from "react";
import "./MenuTab.scss";

type Artwork = {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  likeNum: number;
  viewNum: number;
};

type ArtworksProps = {
  artworks: Artwork[];
};

const LazyGallery = lazy(() => import("./Gallery/Gallery"));

const MenuTab: React.FC<ArtworksProps> = ({ artworks }) => {
  const [activeTab, setActiveTab] = useState("News");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  

  return (
    <div className="menu-tab">
      <div className="menu-tab__tabs">
        <button
          onClick={() => handleTabClick("News")}
          className={activeTab === "News" ? "active" : ""}
          style={activeTab === "News" ? { borderBottom: "solid 1px #000" } : {}}
          id="news_tab"
        >
          <strong>Mới nhất</strong>
        </button>
        <button
          onClick={() => handleTabClick("Following")}
          className={activeTab === "Following" ? "active" : ""}
          style={activeTab === "Following" ? { borderBottom: "solid 1px #000" } : {}}
          id="following_tab"
        >
          <strong>Theo dõi</strong>
        </button>
      </div>
      {activeTab === "Following" && <LazyGallery artworks={artworks} />}
      {activeTab === "News" && <LazyGallery artworks={artworks} />}
    </div>
  );
};

export default MenuTab;
