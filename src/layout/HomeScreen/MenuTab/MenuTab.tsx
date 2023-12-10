import React, { useState } from 'react';
import Gallery from '../Gallery/Gallery';

const MenuTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Following");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  interface Artwork {
    id: string;
    title: string;
    imageUrl: string;
    likeNum: number;
    viewNum: number;
    subTitle: string;
  }

  let artworksSampleProps: Artwork[] = [
    {
      id: "1",
      title: "Artwork 1",
      imageUrl: "https://example.com/artwork1.jpg",
      likeNum: 10,
      viewNum: 12,
      subTitle: "Subtitle 1",
    },
    {
      id: "2",
      title: "Artwork 2",
      imageUrl: "https://example.com/artwork2.jpg",
      likeNum: 10,
      viewNum: 12,
      subTitle: "Subtitle 2",
    },
    {
      id: "3",
      title: "Artwork 3",
      imageUrl: "https://example.com/artwork3.jpg",
      likeNum: 10,
      viewNum: 12,
      subTitle: "Subtitle 3",
    },
  ];

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
      {activeTab === "Following" && <Gallery artworks={artworksSampleProps} />}
      {activeTab === "News" && <Gallery artworks={artworksSampleProps} />}
    </div>
  );
};

export default MenuTab;