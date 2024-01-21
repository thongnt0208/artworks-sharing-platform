import { OverlayPanel } from "primereact/overlaypanel";
import { RefObject, useState } from "react";
import AssetsCard from "../../../components/AssetsCard";

type Props = {
  assetsPanelOptions: RefObject<OverlayPanel>;
  data: any;
};


export default function AssetsDialog({ ...props }: Props) {
  const [currentURL, setCurrentURL] = useState(window.location.href);
  const data = props.data;  

  const transformedData = data.map((item: any) => {
    const extension = item.assetName.slice(-3);
  
    return {
      id: item.id,
      name: item.assetTitle,
      price: item.price,
      extension: extension,
      size: item.size || NaN
    };
  });

  return (
      <OverlayPanel ref={props.assetsPanelOptions}>
        <AssetsCard id={data[0]?.id} thumbnail="" isCreator={false} itemsList={transformedData}/>
      </OverlayPanel>
  );
}
