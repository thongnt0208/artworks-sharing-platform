/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
  GetMessagesByChatboxId,
  GetMessagesByChatboxIdPagin,
  SendImageToAccount,
  SendMessageToAccount,
} from "./services/ChatServices";
import { GetRequestsByChatboxId, UpdateRequestStatus } from "./services/ProposalServices";
import { ChatboxItemType, RequestItemType } from "./ChatRelatedTypes";
import { CatchAPICallingError } from "..";
// ---------------------------------------------------------

export default function ChatScreen() {
  const [chatboxes, setChatboxes] = useState<ChatboxItemType[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesSt, setTotalPagesSt] = useState(1);
  const [selectingChatbox, setSelectingChatbox] = useState<ChatboxItemType>({} as ChatboxItemType);
  const [newChatMessage, setNewChatMessage] = useState("");
  const [newChatImages, setNewChatImages] = useState([] as File[]);
  const [requestsList, setRequestsList] = useState<RequestItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowProposalForm, setIsShowProposalForm] = useState(false);
  const [proposalFormData, setProposalFormData] = useState({} as any);
  const location = useLocation();

  const navigate = useNavigate();

  // REQUESTS STATE TOOLS section start
  const GetAllRequests = () => {
    console.log("selectingChatbox?.id: ", selectingChatbox?.id);

    selectingChatbox?.id &&
      GetRequestsByChatboxId(selectingChatbox?.id)
        .then((res) => {
          setRequestsList(res);
          console.log("RequestsList: ", res);
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

  // function CreateProposal() {
  // CreateProposal()
  //   .then((res) => {
  //     setProposalFormData(res);
  //   })
  //   .catch((error) => {
  //     catchError(error);
  //   });
  // }

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
    setChatMessages([]);
    selectingChatbox?.id &&
      GetMessagesByChatboxId(selectingChatbox?.id)
        .then((res) => setChatMessages(res))
        .catch((error) => {
          setChatMessages([]);
          CatchAPICallingError(error, navigate);
        });
  };

  const SendChatMessage = () => {
    SendMessageToAccount(selectingChatbox?.author?.id, newChatMessage)
      .then(() => {
        GetChatMessages();
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

  const fetchNextPage = () => {
    console.log("currentPage: " + currentPage + "totalPagesSt: " + totalPagesSt);

    // alert("currentPage: " + currentPage + "totalPages: " + totalPagesSt);
    setCurrentPage(currentPage + 1);
    console.log("dhjdjwdwjhekweh");
    
  };

  useEffect(() => {
    GetChatboxes();
    SetCurrentChatbox();
  }, []);

  useEffect(() => {
    SetCurrentChatbox();
  }, [currentUrl, chatboxes]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // alert("currentPage: " + currentPage);

        const { items, totalPages } = await GetMessagesByChatboxIdPagin(
          selectingChatbox?.id,
          currentPage,
          15
        );
        console.log("totalPages: ", totalPages);

        setChatMessages((prevMessages) => [...prevMessages, ...items]);
        setTotalPagesSt(totalPages);
        console.log("totalPagesSt: ", totalPagesSt);
      } catch (error) {
        setChatMessages([]);
        CatchAPICallingError(error, navigate);
      }
    };

    if (selectingChatbox?.id) {
      fetchMessages();
    }
  }, [selectingChatbox, currentPage]);

  useEffect(() => {
    setChatMessages([]);
    setCurrentPage(1);
    setTotalPagesSt(1);
    GetAllRequests();
  }, [selectingChatbox]);

  return (
    <>
      {isLoading && <ProgressSpinner />}
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
              isShowProposalForm={isShowProposalForm}
              setIsShowProposalForm={setIsShowProposalForm}
              setProposalFormData={setProposalFormData}
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
