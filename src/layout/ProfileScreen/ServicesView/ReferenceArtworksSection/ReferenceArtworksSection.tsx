import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";

import ArtworkCard, { ArtworkProps } from "../../../../components/ArtworkCard";
import "./ReferenceArtworksSection.scss";
import { toast } from "react-toastify";

interface ReferenceArtworksSectionProps {
  artworks: ArtworkProps[];
  selectArtworks: (artworkIds: string[]) => void;
  setShow: (close: boolean) => void;
  loadData: () => void;
}

const ReferenceArtworksSection: React.FC<ReferenceArtworksSectionProps> = ({
  artworks,
  selectArtworks,
  setShow,
  loadData,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const storedArtworkIds = JSON.parse(
      localStorage.getItem("artworksRefIds") || "[]"
    );
    const defaultSelectedIds: Record<string, boolean> = {};
    if (Array.isArray(storedArtworkIds)) {
      for (const id of storedArtworkIds) {
        defaultSelectedIds[id] = true;
      }
    } else {
      console.error("Invalid data in localStorage");
    }
    setSelectedArtworkIds(defaultSelectedIds);
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadData();
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
  }, [loadData]);

  const handleCheckboxChange = (artworkId: string) => {
    setSelectedArtworkIds((prevSelected) => ({
      ...prevSelected,
      [artworkId]: !prevSelected[artworkId],
    }));
  };

  const artworkItems = (artwork: ArtworkProps) => {
    return (
      <div className="artwork-item" key={artwork.id}>
        <ArtworkCard onSelection={true} {...artwork} />
        <Checkbox
          className="checkbox"
          value={artwork.id}
          checked={selectedArtworkIds[artwork.id] || false}
          onChange={() => handleCheckboxChange(artwork.id)}
        />
      </div>
    );
  };

  const handleSaveClick = () => {
    const selectedIds = Object.keys(selectedArtworkIds).filter(
      (id) => selectedArtworkIds[id]
    );
    if (selectedIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một tác phẩm");
    } else {
      localStorage.setItem(
        "artworksRefIds",
        JSON.stringify(selectedArtworkIds)
      );
      selectArtworks(selectedIds);
      setShow(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "selectedArtworkIds",
      JSON.stringify(selectedArtworkIds)
    );
  }, [selectedArtworkIds]);

  return (
    <div className="reference-artworks-section w-full">
      <div className="header">
        <div className="title">
          <h2>Chọn các tác phẩm</h2>
          <h4>
            Thêm tác phẩm để cho khách hàng tiềm năng biết bạn sẵn sàng làm gì
            và giúp họ dễ dàng thuê bạn.
          </h4>
        </div>
        <div className="action">
          <Button label="Lưu" className="p-button" onClick={handleSaveClick} />
          <Button
            label="Quay lại"
            className="p-button"
            onClick={() => setShow(false)}
          />
        </div>
      </div>

      <ScrollPanel style={{ height: "650px" }} className="artwork-scroll-panel">
        <div className="artwork-list">
          {artworks.map((artwork) => {
            return artworkItems(artwork);
          })}
        </div>
        <div ref={lastArtworkRef}>
          {/* This is an invisible marker to observe */}
        </div>
      </ScrollPanel>
    </div>
  );
};

export default ReferenceArtworksSection;
