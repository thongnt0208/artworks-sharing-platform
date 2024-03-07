import React from "react";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Carousel, CarouselPageChangeEvent } from "primereact/carousel";
import { ArtworkProps } from "../../../../components/ArtworkCard";

interface ReferenceArtworksSectionProps {
  artworks: ArtworkProps[];
  onPageChange: (event: CarouselPageChangeEvent) => void;
}

const ReferenceArtworksSection: React.FC<ReferenceArtworksSectionProps> = ({
  artworks,
  onPageChange,
}) => {
  // const [checkedArtworksId, setCheckedArtworksId] = useState<string[]>([]);

  const artworkItems = (artwork: ArtworkProps) => {
    return (
      <Card
        title={artwork.title}
        subTitle={artwork.createdBy}
        style={{ width: "450px", height: "553px" }}
      >
        <img
          src={artwork.thumbnail}
          alt={artwork.title}
          style={{ width: "100%", height: "15rem" }}
        />
        <p>{artwork.title}</p>
        <Checkbox inputId="cb1" value="Artwork" checked={false} />
      </Card>
    );
  };

  return (
    <div className="reference-artworks-section w-full">
      <h2>Reference Artworks</h2>
      <Carousel
        className="w-full"
        value={artworks}
        numVisible={3}
        numScroll={3}
        itemTemplate={artworkItems}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ReferenceArtworksSection;
