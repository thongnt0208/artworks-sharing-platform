import React, {useRef} from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";
import { GetArtworksData } from "./ArtworksService";
import { Artwork } from "../../../components/Gallery";
import { Toast } from "primereact/toast";
import ArtworkCard from "../../../components/ArtworkCard";
import "./ArtworksView.scss";

const ArtworksView: React.FC = () => {
  const toast = useRef<Toast>(null);
  let navigate = useNavigate();
  let [accountId, isCreator] = useOutletContext() as [string, boolean];
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
 
  const showError = () => {
    toast.current?.show({severity:'error', summary: 'Lỗi', detail:'Hệ thống lỗi', life: 3000});
}
  React.useEffect(() => {
    const fetchArtworks = async () => {
      const response = await GetArtworksData(accountId);
      if(Array.isArray(response.items)) {
        setArtworks(response.items);
      } else {
        showError();
      }
    };
    fetchArtworks();
  }, [accountId]);
  return (
    <>
      <h1 className="">Các tác phẩm</h1>
      <div className="gallery grid p-0 flex justify-content-start">
        {artworks.length === 0 ? (
          isCreator ? (
            <Card className="add-artwork-card cursor-pointer flex flex-column justify-content-center align-items-center">
              <i className="pi pi-plus-circle icon m-3" />
              <Button
                label="Tạo tác phẩm"
                onClick={() => {
                  navigate("/artwork/post");
                }}
              ></Button>
            </Card>
          ) : (
            <div> Tác giả chưa có tác phẩm nào </div>
          )
        ) : (
          artworks
            .map((artwork) => (
              <div className="gallery__item col col-4" key={artwork.id}>
                <ArtworkCard
                  key={artwork.id}
                  id={artwork.id}
                  title={artwork.title}
                  createdBy={artwork.createdBy}
                  creatorFullName={artwork.creatorFullName}
                  thumbnail={artwork.thumbnail}
                  likeCount={artwork.likeCount}
                  viewCount={artwork.viewCount}
                />
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default ArtworksView;
