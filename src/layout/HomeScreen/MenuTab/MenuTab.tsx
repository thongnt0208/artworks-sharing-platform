import React, { lazy, Suspense, useState } from "react";

type Artwork = {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  likeNum: number;
  viewNum: number;
};

type ArtworksProps = {
  artworks: Artwork[];
};

const LazyGallery = lazy(() => import("./Gallery/Gallery"));

const MenuTab: React.FC<ArtworksProps> = ({ artworks }) => {
  const [activeTab, setActiveTab] = useState("Following");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  

  return (
    <div>
      <div>
        <button
          onClick={() => handleTabClick("Following")}
          className={activeTab === "Following" ? "active" : ""}
        >
          Following
        </button>
        <button
          onClick={() => handleTabClick("News")}
          className={activeTab === "News" ? "active" : ""}
        >
          News
        </button>
      </div>
      {activeTab === "Following" && <LazyGallery artworks={artworks} />}
      {activeTab === "News" && <LazyGallery artworks={artworks} />}
    </div>
  );
};

export default MenuTab;
