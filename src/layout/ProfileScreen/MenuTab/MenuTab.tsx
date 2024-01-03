import { Outlet } from "react-router-dom";
import { TabCustom } from "../../../components/TabCustom";
import { useNavigate } from "react-router-dom";
import "./MenuTab.scss";

const MenuTab: React.FC = () => {
  const navigate = useNavigate();
  const handleTabNavigation = (tabId: string) => {
    navigate(tabId);
  };
  return (
    <div className="menu-tab">
      <div>
        <TabCustom
          isLogin={false}
          currentTabId={""}
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
