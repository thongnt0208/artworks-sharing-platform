import { Outlet } from "react-router-dom";
import { TabCustom } from "../../../components/TabCustom";
import { useNavigate } from "react-router-dom";
import "./MenuTab.scss";

const MenuTab: React.FC = () => {
  const navigate = useNavigate();
  const handleTabNavigation = (tabId: string) => {
    navigate(tabId);
  };
  let currentTabId = window.location.pathname.split("/")[3];
  return (
    <div className="menu-tab">
      <div>
        <TabCustom
          isLogin={false}
          currentTabId={currentTabId}
          onClickHandler={handleTabNavigation}
        />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MenuTab;
