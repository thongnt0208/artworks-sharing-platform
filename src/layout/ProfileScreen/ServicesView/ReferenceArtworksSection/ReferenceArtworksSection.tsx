import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import ArtworkCard, { ArtworkProps } from "../../../../components/ArtworkCard";
import "./ReferenceArtworksSection.scss";

interface ReferenceArtworksSectionProps {
  artworks: ArtworkProps[];
  selectArtworks: (artworkIds: string[]) => void;
  setShow: (close: boolean) => void,
  loadData: () => void;
}

const ReferenceArtworksSection: React.FC<ReferenceArtworksSectionProps> = ({
  artworks,
  selectArtworks,
  setShow,
  loadData,
}) => {
  const toast = useRef<Toast | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<Record<string, boolean>>(
    JSON.parse(localStorage.getItem("selectedArtworkIds") || "{}")
  );

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
    const selectedIds = Object.keys(selectedArtworkIds).filter((id) => selectedArtworkIds[id]);
    if (selectedIds.length === 0) {
      showError();
    } else {
      selectArtworks(selectedIds);
      setShow(false)
    }
  };

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Bạn phải chọn ít nhất 1 tác phẩm",
      life: 3000,
    });
  };

  // Save selectedArtworkIds to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedArtworkIds", JSON.stringify(selectedArtworkIds));
  }, [selectedArtworkIds]);

  return (
    <div className="reference-artworks-section w-full">
      <Toast ref={toast} />
      <div className="header">
        <div className="title">
          <h2>Chọn các tác phẩm</h2>
          <h4>
            Thêm tác phẩm để cho khách hàng tiềm năng biết bạn sẵn sàng làm gì và giúp họ dễ
            dàng thuê bạn.
          </h4>
        </div>
        <div className="action">
          <Button label="Lưu" className="p-button" onClick={handleSaveClick} />
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
