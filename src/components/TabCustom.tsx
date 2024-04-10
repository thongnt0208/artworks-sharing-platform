import { Button } from "primereact/button";
import { useEffect, useState } from "react";

import "./TabCustom.scss";

type Props = {
  isCreator: boolean;
  currentTabId: string;
  onClickHandler: (e: any) => void; 
};

type Tab = {
  id: string;
  label: string;
  disabled?: boolean; 
};

export const TabCustom = (props: Props) => {
  const [activeTabClassName, setActiveTabClassName] = useState("p-button-text");

  useEffect(() => {
    const tabsToRound = [
      "artwork",
      "assets",
      "service",
      "wallet",
      "collection",
    ];
    setActiveTabClassName(
      tabsToRound.includes(props.currentTabId)
        ? "p-button-rounded active-tab"
        : "p-button-text inactive-tab"
    );
  }, [props.currentTabId]);

  const tabs: Tab[] = [
    { id: "artwork", label: "Tác phẩm" },
    { id: "assets", label: "Tài nguyên" },
    { id: "service", label: "Dịch vụ" },
    { id: "wallet", label: "Quản lí ví", disabled: !props.isCreator },
    { id: "collection", label: "Bộ sưu tập" },
  ];

  const visibleTabs = tabs.filter((tab) => !tab.disabled); 

  return (
    <>
      {visibleTabs.map((tab) => (
        <Button
          key={tab.id}
          id={tab.id}
          label={tab.label}
          className={
            props.currentTabId === tab.id ? activeTabClassName : "p-button-text inactive-tab"
          }
          onClick={() => props.onClickHandler(tab.id)}
          style={{ fontWeight: "bold" }}
        />
      ))}
    </>
  );
};
