import React from "react";
import CollectionCard from "../../../components/CollectionCard";
import "./SubscribeArea.scss";
import { useLocation, useParams } from "react-router-dom";

type Props = {};

export type subscribeDataType = { id: string; title: string; description: string };

export default function SubscribeArea({ ...props }: Props) {
  let isCreator = useLocation().state?.isCreator;
  let isSubscribed = useLocation().state?.isSubscribed;
  let subscribeData = useLocation().state?.subscribeData;
  let profileId = useParams().id;
  return (
    <div className="subscribe-area-container">
      {/* If current user are viewing their own side */}
      {isCreator && <div className="creator-area"></div>}

      {/* If current user are viewing other user side */}
      {!isCreator && subscribeData?.length === 0 && (
        <h1>Chưa có collection nào</h1>
      )}
      {!isCreator &&
        subscribeData?.length !== 0 &&
        subscribeData?.map(
          (sbs: subscribeDataType) => {
            return (
              <CollectionCard
                key={sbs.id}
                data={sbs}
                isSubscribed={isSubscribed}
                profileId={profileId}
              />
            );
          }
        )}
    </div>
  );
}
