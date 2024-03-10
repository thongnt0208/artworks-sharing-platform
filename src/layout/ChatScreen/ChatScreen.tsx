/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import ChatLeftNav from "./components/ChatLeftNav";
import ChatContent from "./components/ChatContent";
import ChatRightNav from "./components/ChatRightNav";
import {
  ChatMessageType,
  GetChatboxesCurrentAccount,
  GetMessagesByChatboxId,
} from "./services/ChatServices";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { GetRequestById, RequestItemType, UpdateRequestStatus } from "./services/ProposalServices";

export type ChatboxItemType = {
  id: string;
  avatar: string;
  text?: string;
  author: string;
  time: string;
  isSeen?: boolean;
};

export default function ChatScreen() {
  const [chatboxes, setChatboxes] = useState<ChatboxItemType[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [selectingRequestId, setSelectingRequestId] = useState("");
  const [selectingChatboxId, setSelectingChatboxId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requestDetail, setRequestDetail] = useState<RequestItemType>({} as RequestItemType);
  const [proposalFormData, setProposalFormData] = useState({} as any);

  const navigate = useNavigate();
  function catchError(error: any) {
    if (error.response?.status === 401) {
      navigate("/login");
    } else {
      console.log(error);
    }
  }

  // REQUESTS STATE TOOLS section start
  // Cần phải có 1 Get All requests giữa 1 user và current user

  const GetRequestDetail = () => {
    GetRequestById(selectingRequestId)
      .then((res) => {
        setRequestDetail(res);
      })
      .catch((error) => {
        console.error("Error fetching chatboxes:", error);
        setRequestDetail({} as RequestItemType);
      });
  };
  function acceptRequest() {
    UpdateRequestStatus(requestDetail.id, 1)
      .then((response) => {
        setRequestDetail(response);
      })
      .catch((error) => {
        catchError(error);
      });
  }
  function denyRequest() {
    UpdateRequestStatus(requestDetail.id, 2)
      .then((response) => {
        setRequestDetail(response);
      })
      .catch((error) => {
        catchError(error);
      });
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
        console.error("Error fetching chatboxes:", error);
        setChatboxes([]);
        catchError(error);
      });
  };

  const GetChatMessages = () => {
    GetMessagesByChatboxId(selectingChatboxId)
      .then((res) => {
        setChatMessages(res);
      })
      .catch((error) => {
        setChatMessages([]);
        catchError(error);
      });
  };

  useEffect(() => {
    GetChatboxes();
  }, []);

  useEffect(() => {
    setSelectingRequestId(chatboxes[0]?.id);
    setSelectingChatboxId(chatboxes[0]?.id);
  }, [chatboxes]);

  useEffect(() => {
    GetRequestDetail();
  }, [selectingRequestId]);

  useEffect(() => {
    GetChatMessages();
  }, [selectingChatboxId]);

  return (
    <>
      {isLoading && <ProgressSpinner />}
      {JSON.stringify(proposalFormData)}
      <div className="grid grid-nogutter" style={{ maxHeight: "80vh" }}>
        <div className="col-3 max-h-full">
          <ChatLeftNav
            itemsList={chatboxes}
            selectingChatboxId={selectingChatboxId}
            setSelectingChatboxId={setSelectingChatboxId}
          />
        </div>
        <div className="col-6">
          <ChatContent
            selectingChatboxId={selectingChatboxId}
            content={chatMessages}
            requestStateTools={{ requestDetail, setRequestDetail, acceptRequest, denyRequest }}
            setProposalFormData={setProposalFormData}
          />
        </div>
        <div className="col-3">
          <ChatRightNav selectingRequestId={selectingRequestId} />
        </div>
      </div>
    </>
  );
}
