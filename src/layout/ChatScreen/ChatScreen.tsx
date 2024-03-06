/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import ChatLeftNav from "./components/ChatLeftNav";
import ChatContent from "./components/ChatContent";
import ChatRightNav from "./components/ChatRightNav";
import { GetChatboxs } from "./services/ChatServices";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { GetRequestById, RequestItemType } from "./services/ProposalServices";

export type ChatboxItemType = {
  id: string;
  avatar: string;
  text?: string;
  author: string;
  time: string;
  isSeen?: boolean;
};

export default function ChatScreen() {
  const [chatboxs, setChatboxs] = useState<ChatboxItemType[]>([]);
  // const [chatContent, setChatContent] = useState<ChatContentType[]>([]);
  const [selectingId, setSelectingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requestDetail, setRequestDetail] = useState<RequestItemType>({} as RequestItemType);

  const navigate = useNavigate();

  const GetRequestDetail = (id: string) => {
    GetRequestById(selectingId)
      .then((res) => {
        setRequestDetail(res);
      })
      .catch((error) => {
        console.error("Error fetching chatboxs:", error);
        setRequestDetail({} as RequestItemType);
      });
  };

  const GetTheChatboxs = () => {
    GetChatboxs()
      .then((res) => {
        setChatboxs(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching chatboxs:", error);
        setChatboxs([]);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      });
  }

  useEffect(() => {
    GetTheChatboxs();
  }, []);

  useEffect(() => {
    setSelectingId(chatboxs[0]?.id);
  }, [chatboxs]);

  useEffect(() => {
    GetRequestDetail(selectingId);
  }, [selectingId]);

  return (
    <>
      {isLoading && <ProgressSpinner />}
      <div className="grid grid-nogutter" style={{ maxHeight: "80vh" }}>
        <div className="col-3 max-h-full">
          <ChatLeftNav
            itemsList={chatboxs}
            selectingId={selectingId}
            setSelectingId={setSelectingId}
          />
        </div>
        <div className="col-6">
          <ChatContent selectingId={selectingId} content={null} requestDetail={requestDetail}/>
        </div>
        <div className="col-3">
          <ChatRightNav selectingId={selectingId} />
        </div>
      </div>
    </>
  );
}
