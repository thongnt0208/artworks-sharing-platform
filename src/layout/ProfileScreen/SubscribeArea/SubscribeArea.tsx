import React from "react";
// import CollectionCard from "../../../components/CollectionCard";
import "./SubscribeArea.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../index";
import SetupSuccessScreen from "../SetupSubscribeArea/SetupSuccessScreen";
type Props = {};

export type subscribeDataType = {
  id: string;
  title: string;
  description: string;
};

export default function SubscribeArea({ ...props }: Props) {
  let navigate = useNavigate();

  // let profileId = useParams().id;
  let subscribeData = useLocation().state?.subscribeData;
  let isCreator = useLocation().state?.isCreator;
  // let isSubscribed = useLocation().state?.isSubscribed;
  let isSetup = useLocation().state?.isSetup;

  const chooseAvailables = () => {};
  return (
    <div className="subscribe-area-container">
      {/* If current user are viewing their own side */}
      {isCreator && (
        <div className="creator-area">
          <>
            {/* User did not set up the Subscribe Area */}
            {!isSetup && (
              <Button
                id="start-to-setup-btn"
                rounded
                icon="pi pi-lock"
                onClick={() => navigate("setup")}
              >
                . Bắt đầu thiết lập
              </Button>
            )}

            {/* User did set up the Subscribe Area */}
            {isSetup && subscribeData?.length === 0 && <SetupSuccessScreen />}
            {isSetup && subscribeData?.length !== 0 && (
              <>
                <div className="mini-dashboard-container">mini-dashboard</div>
                <div className="buttons-container">
                  <Button onClick={chooseAvailables}>
                    Chọn tác phẩm có sẵn
                  </Button>
                  <Button onClick={() => navigate("/postAw")}>
                    Tạo tác phẩm mới
                  </Button>
                </div>
                <div className="collections-container">
                  {subscribeData?.map((sbs: subscribeDataType) => {
                    return (
                      // <CollectionCard
                      //   key={sbs.id}
                      //   data={sbs}
                      //   isSubscribed={isCreator}
                      //   profileId={profileId}
                      // />
                      <></>
                    );
                  })}
                </div>
              </>
            )}
          </>
        </div>
      )}

      {/* If current user are viewing other user side */}
      {!isCreator && subscribeData?.length === 0 && (
        <h1>Chưa có collection nào</h1>
      )}
      {!isCreator && subscribeData?.length !== 0 && (
        <div className="collections-container">
          {subscribeData?.map((sbs: subscribeDataType) => {
            return (
              // <CollectionCard
              //   key={sbs.id}
              //   data={sbs}
              //   isSubscribed={isSubscribed}
              //   profileId={profileId}
              // />
              <></>
            );
          })}
        </div>
      )}
    </div>
  );
}
