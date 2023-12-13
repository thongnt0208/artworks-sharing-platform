import React, { useState } from "react";
import Gallery from "./Gallery/Gallery";

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

const MenuTab: React.FC<ArtworksProps> = ({ artworks }) => {
  const [activeTab, setActiveTab] = useState("Following");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  console.log(artworks);

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
      {activeTab === "Following" && <Gallery artworks={artworks} />}
      {activeTab === "News" && <Gallery artworks={artworks} />}
    </div>
  );
};

export default MenuTab;
