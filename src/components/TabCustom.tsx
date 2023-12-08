import { Button } from "primereact/button";
import { useEffect, useState } from "react";

/*Sample props:
let sampleProps = {
    isLogin: true,
    currentTabId: "artwork",
    onClickHandler: (e: any) => {
      console.log(e);
    },
  }
*/
type Props = {
  isLogin: boolean;
  currentTabId: string;
  onClickHandler: (e: any) => void; //Navigation to the chosen tab
};

type Tab = {
  id: string;
  label: string;
};

export const TabCustom = (props: Props) => {
  const [activeTabClassName, setActiveTabClassName] = useState("p-button-text");

  useEffect(() => {
    // Update className based on the currentTabId
    const tabsToRound = [
      "artwork",
      "assets",
      "service",
      "subscribe-area",
      "wallet",
      "collection",
    ];
    setActiveTabClassName(
      tabsToRound.includes(props.currentTabId) ? "p-button-rounded" : "p-button-text"
    );
  }, [props.currentTabId]);

  const tabs: Tab[] = [
    { id: "artwork", label: "Tác phẩm" },
    { id: "assets", label: "Assets" },
    { id: "service", label: "Dịch vụ" },
    { id: "subscribe-area", label: "Vùng cho người đăng ký" },
    { id: "wallet", label: "Quản lí ví" },
    { id: "collection", label: "Bộ sưu tập" },
  ];

  return (
    <>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          id={tab.id}
          label={tab.label}
          className={
            props.currentTabId === tab.id ? activeTabClassName : "p-button-text"
          }
          onClick={() => {
            props.onClickHandler(tab.id);
          }}
        />
      ))}
    </>
  );
};
