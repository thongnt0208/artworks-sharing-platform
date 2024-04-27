/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ChatLeftNav from "./components/ChatLeftNav";
import ChatContent from "./components/ChatContent";
import ChatRightNav from "./components/ChatRightNav";
import ChatInput from "./components/ChatInput/ChatInput";
import {
  GetChatboxesCurrentAccount,
  GetMessagesByChatboxIdRealTime,
  SendImageToAccount,
  SendMessageToAccount,
} from "./services/ChatServices";
import {
  ChatboxItemType,
  ChatMessageItemType,
  MilestoneItemType,
  ProposalAssetItemType,
  ProposalType,
  RequestItemType,
} from "./ChatRelatedTypes";
import { CatchAPICallingError, Dialog, Toast, Avatar, Button, ProgressSpinner } from "..";
import LazyProposalForm from "./components/Proposal/LazyProposalForm";
import { acceptRequest, denyRequest, GetAllRequests } from "./components/Request/RequestUtils";
import {
  AcceptProposal,
  CancelProposal,
  CompletePaymentProposalUtil,
  CreateAProposal,
  DenyProposal,
  GetAllProposals,
  GetAssets,
  GetMilestone,
  UploadProposalAssetUtil,
} from "./components/Proposal/ProposalUtils";
import { Splitter, SplitterPanel } from "primereact/splitter";

import "./ChatScreen.scss";
// ---------------------------------------------------------

export default function ChatScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [closeSocket, setCloseSocket] = useState<() => void>();

  const [chatboxes, setChatboxes] = useState<ChatboxItemType[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessageItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPagesSt, setTotalPagesSt] = useState(1);
  const [selectingChatbox, setSelectingChatbox] = useState<ChatboxItemType>({} as ChatboxItemType);

  const [newChatMessage, setNewChatMessage] = useState("");
  const [newChatImages, setNewChatImages] = useState([] as File[]);

  const [requestsList, setRequestsList] = useState<RequestItemType[]>([]);

  const [isShowProposalForm, setIsShowProposalForm] = useState(false);
  const [proposalsList, setProposalsList] = useState<ProposalType[]>([]);
  const [selectingProposal, setSelectingProposal] = useState<ProposalType>(proposalsList[0]);
  const [currentMilestone, setCurrentMilestone] = useState<MilestoneItemType[]>([]);
  const [currentAssets, setCurrentAssets] = useState<ProposalAssetItemType[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  // REQUESTS STATE TOOLS section start
  const handleGetAllRequests = () => {
    GetChatMessages();
    GetAllRequests(selectingChatbox, setRequestsList, navigate);
  };
  const handleAcceptRequest = (id: string) => acceptRequest(id, handleGetAllRequests, navigate);
  const handleDenyRequest = (id: string) => denyRequest(id, handleGetAllRequests, navigate);
  // REQUESTS STATE TOOLS section end

  // PROPOSALS STATE TOOLS section start
  const handleGetAllProposals = () => {
    GetChatMessages();
    GetAllProposals(selectingChatbox, setProposalsList, navigate);
  };
  const handleCreateAProposal = (values: any) =>
    CreateAProposal(
      values,
      selectingChatbox,
      setIsShowProposalForm,
      toast,
      handleGetAllProposals,
      navigate
    );
  const handleAcceptProposal = (id: string) => AcceptProposal(id, handleGetAllProposals, navigate);
  const handleDenyProposal = (id: string) => DenyProposal(id, handleGetAllProposals, navigate);
  const handleCancelProposal = (id: string) => CancelProposal(id, handleGetAllProposals, navigate);
  const handleUploadProposalAsset = (id: string, type: number, file: File) =>
    UploadProposalAssetUtil(id, type, file, handleGetAllProposals, navigate);
  const handleGetMilestone = (id: string) => GetMilestone(id, setCurrentMilestone, navigate);
  const handleGetAssets = (id: string) => GetAssets(id, setCurrentAssets, navigate);
  const handleCompletePayment = (id: string) =>
    CompletePaymentProposalUtil(id, handleGetAllProposals, navigate);
  // PROPOSALS STATE TOOLS section end
  // ---------------------------------------------------------

  const GetChatboxes = () => {
    setIsLoading(true);
    GetChatboxesCurrentAccount()
      .then((res) => {
        setChatboxes(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setChatboxes([]);
        CatchAPICallingError(error, navigate);
      });
  };

  const GetChatMessages = () => {
    setIsLoading(true);
    if (selectingChatbox?.id) {
      if (!closeSocket) {
        const cleanup = GetMessagesByChatboxIdRealTime(selectingChatbox.id, setChatMessages);
        setCloseSocket(() => cleanup);
        setIsLoading(false);
      } else {
        closeSocket();
        const cleanup = GetMessagesByChatboxIdRealTime(selectingChatbox.id, setChatMessages);
        setCloseSocket(() => cleanup);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const SendChatMessage = () => {
    setIsLoading(true);
    SendMessageToAccount(selectingChatbox?.author?.id, newChatMessage)
      .then(() => {
        setNewChatMessage(""); // Clear input after sending message
        setTimeout(() => setIsLoading(false), 800);
      })
      .catch((error) => CatchAPICallingError(error, navigate))
      .finally(() => setTimeout(() => setIsLoading(false), 800));
  };

  const SendChatImages = () => {
    if (newChatImages && newChatImages?.length > 0)
      SendImageToAccount(selectingChatbox?.author?.id, newChatImages)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => CatchAPICallingError(error, navigate));
  };

  const currentUrl = location.pathname;
  const _currentChatboxId = currentUrl.replace("/chat/", "");

  const SetCurrentChatbox = () => {
    if (_currentChatboxId && chatboxes.length > 0) {
      const _tmpChatbox = chatboxes.find((chatbox) => chatbox.id === _currentChatboxId);
      if (_tmpChatbox) {
        setSelectingChatbox(_tmpChatbox);
      }
    }
  };

  const fetchNextPage = () => setCurrentPage(currentPage + 1);

  const requestStateTools = {
    requestsList,
    handleAcceptRequest,
    handleDenyRequest,
    handleUploadProposalAsset,
  };

  const proposalStateTools = {
    proposalsList,
    selectingProposal,
    setSelectingProposal,
    handleGetAllProposals,
    handleAcceptProposal,
    handleDenyProposal,
    handleCancelProposal,
    handleUploadProposalAsset,
    handleCompletePayment,
  };

  useEffect(() => {
    GetChatboxes();
    SetCurrentChatbox();
    return () => {
      closeSocket && closeSocket();
    };
  }, []);

  useEffect(() => {
    SetCurrentChatbox();
    return () => {
      closeSocket && closeSocket();
    };
  }, [currentUrl, chatboxes]);

  useEffect(() => {
    setCurrentPage(1);
    handleGetAllRequests();
    handleGetAllProposals();
    GetChatMessages();
    return () => {
      closeSocket && closeSocket();
    };
  }, [selectingChatbox]);

  useEffect(() => {
    proposalsList.length > 0 && setSelectingProposal(proposalsList[0]);
  }, [proposalsList]);

  useEffect(() => {
    SendChatImages();
  }, [newChatImages]);
  return (
    <>
      {isLoading && <ProgressSpinner style={{ position: "absolute", left: "40%" }} />}
      <Toast ref={toast} />
      <Dialog
        visible={isShowProposalForm}
        onHide={() => setIsShowProposalForm(false)}
        dismissableMask
        headerStyle={{ padding: "3px 6px 0 0", border: 0 }}
      >
        <Suspense fallback={<div>Đang tải...</div>}>
          <LazyProposalForm createProposalCallback={handleCreateAProposal} />
        </Suspense>
      </Dialog>

      <Button
        rounded
        loading={isLoading}
        icon="pi pi-refresh"
        tooltip="Làm mới"
        style={{ position: "absolute", bottom: "1rem", left: "1rem" }}
        onClick={GetChatboxes}
      />
      <Splitter className="chat-screen-container p-2">
        <SplitterPanel className="first-col" size={20}>
          <ChatLeftNav itemsList={chatboxes} selectingChatbox={selectingChatbox} />
        </SplitterPanel>
        <SplitterPanel className="middle-col" size={50}>
          <div
            className="reciever-name-container"
            onClick={() => navigate(`/account/${selectingChatbox?.author?.id}`)}
          >
            <Avatar image={selectingChatbox?.avatar} size="normal" shape="circle" />
            <p className="text-cus-normal-bold">{selectingChatbox?.author?.fullname}</p>
          </div>
          <div className="chat-content-container">
            <ChatContent
              selectingChatbox={selectingChatbox}
              content={chatMessages}
              requestStateTools={requestStateTools}
              proposalStateTools={proposalStateTools}
              setIsShowProposalForm={setIsShowProposalForm}
              fetchNextPage={fetchNextPage}
            />
          </div>

          <div className="chat-input-container m-2">
            <ChatInput
              newChatMessage={newChatMessage}
              setNewChatMessage={setNewChatMessage}
              SendChatMessage={SendChatMessage}
              setNewChatImages={setNewChatImages}
              setIsShowProposalForm={setIsShowProposalForm}
              isLoading={isLoading}
            />
          </div>
        </SplitterPanel>
        <SplitterPanel className="last-col" size={30}>
          <ChatRightNav
            userInfo={{ avatar: selectingChatbox?.avatar, ...selectingChatbox?.author }}
            proposalStateTools={proposalStateTools}
            currentMilestone={currentMilestone}
            currentAssets={currentAssets}
            getMilestoneCallback={handleGetMilestone}
            getAssetsCallback={handleGetAssets}
            uploadAssetCallback={handleUploadProposalAsset}
          />
        </SplitterPanel>
      </Splitter>
    </>
  );
}
