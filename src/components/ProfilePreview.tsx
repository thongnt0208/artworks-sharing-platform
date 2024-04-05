import React, { useRef, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import { UserInformationProps } from "./UserInformationCard";
import { ArtworkProps } from "./ArtworkCard";
import { GetArtworksData } from "../layout/ProfileScreen/ArtworksView/ArtworksService";
import "./ProfilePreview.scss";
import Gallery from "./Gallery";

const ProfilePreview: React.FC<{
  creator: UserInformationProps;
  hireCallback?: () => void;
}> = ({ creator, hireCallback }) => {
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [artworks, setArtworks] = React.useState<ArtworkProps[]>([]);

  //Get Artworks of Creator
  useEffect(() => {
    const fetchArtworks = async () => {
      const artworks = await GetArtworksData(6, pageNumber, creator.id);
      if (Array.isArray(artworks)) {
        setArtworks((prevArtworks) => {
          const uniqueArtworkIds = new Set<string>(
            prevArtworks.map((artwork) => artwork.id)
          );
          const filteredArtworks = Array.isArray(artworks)
            ? artworks.filter(
                (artwork: { id: string }) => !uniqueArtworkIds.has(artwork.id)
              )
            : [];
          return [...prevArtworks, ...filteredArtworks];
        });
      } else {
        console.log("Error");
      }
    };
    fetchArtworks();
  }, [pageNumber, creator.id]);

  const loadMoreData = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }
    );

    if (lastArtworkRef.current && observer.current) {
      observer.current.observe(lastArtworkRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="creator-info">
        <img
          alt={`Ảnh đại diện của ${creator.fullname}`}
          src={creator.avatar}
          className="avatar-image"
        />
        <h1 className="m-1">{creator.fullname}</h1>
        <h3 className="m-0">{creator.email}</h3>
        <div className="hire-info">
          <p className="project-completed">
            {creator.projectCompleted} Dự án Hoàn thành
          </p>
          {creator.isVerrified && (
            <i className="pi pi-verified verrified-icon" />
          )}
        </div>
        <div className="buttons">
          <Button
            label="Thuê"
            className="left-button"
            rounded
            onClick={() => navigate(`/account/${creator.id}/service`)}
          />
          <Button
            label="Trang cá nhân"
            className="right-button"
            rounded
            onClick={() => {
              navigate(`/account/${creator.id}/artwork`);
            }}
          />
        </div>
      </div>
      <h2 className="mt-0 pt-0">Các tác phẩm</h2>
      <Gallery artworks={artworks} />
      <div className="h-2" ref={lastArtworkRef}></div>
    </div>
  );
};

export default ProfilePreview;
