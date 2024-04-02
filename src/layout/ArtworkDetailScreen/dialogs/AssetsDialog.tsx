import { OverlayPanel } from "primereact/overlaypanel";
import { RefObject } from "react";
import AssetsCard from "../../../components/AssetsCard";
import { AssetType } from "../ArtworkDetailType";

type Props = {
  assetsPanelOptions: RefObject<OverlayPanel>;
  data: AssetType[];
  saveHandler: (id: string) => void;
};

export default function AssetsDialog({ assetsPanelOptions, data, saveHandler }: Props) {

  return (
    <OverlayPanel ref={assetsPanelOptions}>
      <AssetsCard
        id={data[0]?.id}
        thumbnail=""
        isCreator={false}
        itemsList={data}
        saveHandler={saveHandler}
      />
    </OverlayPanel>
  );
}
