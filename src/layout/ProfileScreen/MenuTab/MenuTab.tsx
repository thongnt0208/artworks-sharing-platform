import { Outlet } from "react-router-dom";
import { TabCustom } from "../../../components/TabCustom";
import { useNavigate } from "react-router-dom";
import "./MenuTab.scss";

const MenuTab: React.FC<{accountId: string, isCreator: boolean, accountAvatar: string, accountFullname: string}> = ({accountId, isCreator, accountAvatar, accountFullname}) => {
  const navigate = useNavigate();
  const handleTabNavigation = (tabId: string) => {
    navigate(tabId);
  };
  let currentTabId = window.location.pathname.split("/")[3];
  return (
    <div className="menu-tab">
      <div>
        <TabCustom
          isCreator={isCreator}
          currentTabId={currentTabId}
          onClickHandler={handleTabNavigation}
        />
      </div>
      <div className="mt-6">
        <Outlet context={[accountId, isCreator, accountAvatar, accountFullname]} />
      </div>
    </div>
  );
};

export default MenuTab;
