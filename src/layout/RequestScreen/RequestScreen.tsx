import { TabMenu } from "primereact/tabmenu";
import React, { useEffect, useState } from "react";
import RequestSection from "./RequestSection/RequestSection";
import ProposalSection from "./ProposalSection/ProposalSection";
import { ProgressSpinner } from "primereact/progressspinner";
import { GetCreatedProposalData, GetReceiveRequestData, GetSendRequestData } from "./RequestService";
import { ProposalType, RequestItemType } from "../ChatScreen/ChatRelatedTypes";
import { getAuthInfo } from "../../util/AuthUtil";

const RequestScreen: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const accountId = getAuthInfo()?.id;
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [receivedRequests, setReceivedRequests] = useState<RequestItemType[]>([]);
  const [sendedRequests, setSendedRequests] = useState<RequestItemType[]>([]);
  const [proposals, setProposals] = useState<ProposalType[]>([]);

  const items = [
    { label: "Yêu cầu đã nhận" },
    { label: "Yêu cầu đã gửi" },
    { label: "Thỏa thuận đã tạo" },
  ];

  const handleTabChange = (event: any) => {
    setActiveTab(event.index);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Call API to get data
      try {
        if (!isLogin) return;
        if (activeTab === 0) {
          const response: RequestItemType[] = await GetReceiveRequestData();
          setReceivedRequests(response);
        } else if (activeTab === 1) {
          const response: RequestItemType[] = await GetSendRequestData();
          setSendedRequests(response);
        } else {
          const response: ProposalType[] = await GetCreatedProposalData(accountId);
          setProposals(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [accountId, activeTab, isLogin]);
  console.log("Proposal: ", proposals);
  return (
    <>
      <TabMenu
        model={items}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
        className="w-max mb-3 text-black-alpha-90 text-lg"
      />
      <div className="w-full flex flex-column align-items-center">
        {isLoading && <ProgressSpinner />}
        {activeTab === 2 ? (
          <ProposalSection data={proposals}/>
        ) : activeTab === 0 ? (
          <RequestSection data={receivedRequests} />
        ) : (
          <RequestSection data={sendedRequests} />
        )}
      </div>
    </>
  );
};

export default RequestScreen;
