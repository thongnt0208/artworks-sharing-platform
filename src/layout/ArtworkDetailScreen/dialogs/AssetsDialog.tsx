import { OverlayPanel } from "primereact/overlaypanel";
import { RefObject } from "react";
import AssetsCard from "../../../components/AssetsCard";
import { AssetType } from "../ArtworkDetailType";
import { GetAssetDownloadLinkById } from "./Service";

type Props = {
  assetsPanelOptions: RefObject<OverlayPanel>;
  data: AssetType[];
};

export default function AssetsDialog({ assetsPanelOptions, data }: Props) {
  const saveHandler = (id: string) => {
    console.log("Save");
    GetAssetDownloadLinkById(id)
      .then((link) => {
        console.log("Link ne:" + link);
        window.open(link, "_blank");
      })
      .catch((error) => {
        
        console.error("loi roi"+ error);
      });
  };

  const transformedData = data.map((item: any) => {
    const extension = item.assetName.slice(-3);

    return {
      id: item.id,
      name: item.assetTitle,
      price: item.price,
      extension: extension,
      size: item.size || NaN,
      saveHandler: saveHandler,
    };
  });

  return (
    <OverlayPanel ref={assetsPanelOptions}>
      <AssetsCard id={data[0]?.id} thumbnail="" isCreator={false} itemsList={transformedData} />
    </OverlayPanel>
  );
}
