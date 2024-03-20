/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Avatar } from "primereact/avatar";

import "./ChatScreen.scss";

import ChatLeftNav from "./components/ChatLeftNav";
import ChatContent from "./components/ChatContent";
import ChatRightNav from "./components/ChatRightNav";
import ChatInput from "./components/ChatInput/ChatInput";
import {
  ChatMessageType,
  GetChatboxesCurrentAccount,
  GetMessagesByChatboxIdRealTime,
  SendImageToAccount,
  SendMessageToAccount,
} from "./services/ChatServices";
import {
  CreateProposal,
  GetProposalsByChatboxId,
  GetRequestsByChatboxId,
  UpdateRequestStatus,
} from "./services/ProposalServices";
import {
  ChatboxItemType,
  ProposalFormType,
  ProposalType,
  RequestItemType,
} from "./ChatRelatedTypes";
import { CatchAPICallingError, Dialog, Toast } from "..";
import LazyProposalForm from "./components/Proposal/LazyProposalForm";
// ---------------------------------------------------------

export default function ChatScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [closeSocket, setCloseSocket] = useState<() => void | null>();

  const [chatboxes, setChatboxes] = useState<ChatboxItemType[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesSt, setTotalPagesSt] = useState(1);
  const [selectingChatbox, setSelectingChatbox] = useState<ChatboxItemType>({} as ChatboxItemType);

  const [newChatMessage, setNewChatMessage] = useState("");
  const [newChatImages, setNewChatImages] = useState([] as File[]);

  const [requestsList, setRequestsList] = useState<RequestItemType[]>([]);

  const [isShowProposalForm, setIsShowProposalForm] = useState(false);
  const [proposalsList, setProposalsList] = useState([] as any);
  const [proposalFormData, setProposalFormData] = useState({} as any);

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  // REQUESTS STATE TOOLS section start
  const GetAllRequests = () => {
    selectingChatbox?.id &&
      GetRequestsByChatboxId(selectingChatbox?.id)
        .then((res) => {
          setRequestsList(res);
        })
        .catch((error) => {
          setRequestsList([]);
          CatchAPICallingError(error, navigate);
        });
  };

  function acceptRequest(id: string) {
    UpdateRequestStatus(id, 1)
      .then(() => GetAllRequests())
      .catch((error) => CatchAPICallingError(error, navigate));
  }
  function denyRequest(id: string) {
    UpdateRequestStatus(id, 2)
      .then(() => GetAllRequests())
      .catch((error) => CatchAPICallingError(error, navigate));
  }
  // REQUESTS STATE TOOLS section end
  // ---------------------------------------------------------

  // PROPOSALS STATE TOOLS section start
  const GetAllProposals = () => {
    GetProposalsByChatboxId(selectingChatbox?.id)
      .then((res) => {
        setProposalsList(res);
      })
      .catch((error) => {
        setProposalsList([]);
        CatchAPICallingError(error, navigate);
      });
  };
  function CreateAProposal(values: any) {
    console.log(values);

    const formattedData: ProposalFormType = {
      ordererId: selectingChatbox?.author?.id || "",
      serviceId: values.serviceId || "",
      projectTitle: values.title || "",
      category: values.category || "",
      description: values.description || "",
      targetDelivery: values.targetDelivery || "",
      numberOfConcept: values.numberOfConcept || 0,
      numberOfRevision: values.numberOfRevision || 0,
      initialPrice: values.depositPercent || 0,
      total: values.totalPrice || 0,
    };

    console.log("formattedData: ", formattedData);
    

    CreateProposal(formattedData)
      .then(() => {
        setIsShowProposalForm(false);
        toast.current?.show({
          severity: "success",
          summary: "Tạo thành công",
          detail: "Đã tạo thỏa thuận thành công.",
          life: 3000,
        });
        GetAllProposals();
      })
      .catch((error) => {
        CatchAPICallingError(error, navigate);
        toast.current?.show({
          severity: "error",
          summary: "Tạo thất bại",
          detail: error?.message,
          life: 3000,
        });
      });
  }
  function acceptProposal(id: string) {}
  function denyProposal(id: string) {}
  // PROPOSALS STATE TOOLS section end
  // ---------------------------------------------------------

  const GetChatboxes = () => {
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
    if (selectingChatbox?.id) {
      if (!closeSocket) {
        const cleanup = GetMessagesByChatboxIdRealTime(
          selectingChatbox.id,
          chatMessages,
          setChatMessages
        );
        setCloseSocket(() => cleanup);
      } else {
        closeSocket();
        const cleanup = GetMessagesByChatboxIdRealTime(
          selectingChatbox.id,
          chatMessages,
          setChatMessages
        );
        setCloseSocket(() => cleanup);
      }
    }
  };

  const SendChatMessage = () => {
    SendMessageToAccount(selectingChatbox?.author?.id, newChatMessage)
      .then(() => {
        setNewChatMessage(""); // Clear input after sending message
      })
      .catch((error) => CatchAPICallingError(error, navigate));
  };

  const SendChatImages = () => {
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

  useEffect(() => {
    GetChatboxes();
    SetCurrentChatbox();
  }, []);

  useEffect(() => {
    SetCurrentChatbox();
  }, [currentUrl, chatboxes]);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPagesSt(1);
    GetAllRequests();
    GetAllProposals();
    GetChatMessages();
    return () => {
      if (closeSocket) {
        closeSocket();
      }
    };
  }, [selectingChatbox]);

  return (
    <>
      {isLoading && <ProgressSpinner />}
      <Toast ref={toast} />
      <Dialog
        visible={isShowProposalForm}
        onHide={() => {
          setIsShowProposalForm(false);
        }}
        dismissableMask
        headerStyle={{ padding: "3px 6px 0 0", border: 0 }}
      >
        <Suspense fallback={<div>Đang tải...</div>}>
          <LazyProposalForm createProposalCallback={CreateAProposal} />
        </Suspense>
      </Dialog>
      <div className="chat-screen-container">
        <div className="first-col">
          <ChatLeftNav itemsList={chatboxes} selectingChatbox={selectingChatbox} />
        </div>
        <div className="middle-col">
          <div className="reciever-name-container">
            <Avatar image={selectingChatbox?.avatar} size="normal" shape="circle" />
            <p className="text-cus-normal-bold">{selectingChatbox?.author?.fullname}</p>
          </div>
          <div className="chat-content-container">
            <ChatContent
              selectingChatbox={selectingChatbox}
              content={chatMessages}
              requestStateTools={{ requestsList, acceptRequest, denyRequest }}
              proposalStateTools={{ proposalsList, acceptProposal, denyProposal }}
              setIsShowProposalForm={setIsShowProposalForm}
              fetchNextPage={fetchNextPage}
            />
          </div>

          <div className="chat-input-container">
            <ChatInput
              newChatMessage={newChatMessage}
              setNewChatMessage={setNewChatMessage}
              SendChatMessage={SendChatMessage}
              newChatImages={newChatImages}
              setNewChatImages={setNewChatImages}
              setIsShowProposalForm={setIsShowProposalForm}
              SendChatImages={SendChatImages}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="last-col">
          <ChatRightNav />
        </div>
      </div>
    </>
  );
}
