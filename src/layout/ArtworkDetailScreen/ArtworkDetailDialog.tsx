/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import "./ArtworkDetail.scss";
import { addFollow, fetchCommentsForArtworkRealTime, removeFollow } from "./Service";
import ButtonList from "./buttons/ButtonList";
import Content from "./content/Content";
import CommentComponent from "./comment/Comment";
import { CommentType } from "./ArtworkDetailType";
import { getAuthInfo } from "../../util/AuthUtil";
import { CatchAPICallingError } from "..";
import { awDetailStateToolsType } from "../HomeScreen/HomeScreen";
// import UserInformationCard from "../../components/UserInformationCard";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  awDetailStateTools: awDetailStateToolsType;
};

export default function ArtworkDetailDialog(props: Props) {
  const { visible, setVisible, awDetailStateTools } = props;
  const {
    currentAwDetail,
    isLiked,
    setIsLiked,
    isFollowed,
    setIsFollowed,
  } = awDetailStateTools;
  const data = currentAwDetail;
  const navigate = useNavigate();
  const [comments, setComments] = useState([] as CommentType[]);
  const [closeSocket, setCloseSocket] = useState<() => void | null>();
  const authenticationInfo = getAuthInfo();

  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  let dialogProperties = {
    visible: visible,
    onHide: () => setVisible(false),
    closable: false,
    headerStyle: { border: "none", padding: "8px" },
    dismissableMask: true,
    draggable: false,
  };

  // Get Comments data
  const fetchComments = () => {
    if (!closeSocket) {
      const cleanup = fetchCommentsForArtworkRealTime(data?.id, setComments);
      setCloseSocket(() => cleanup);
    } else {
      closeSocket();
      const cleanup = fetchCommentsForArtworkRealTime(data?.id, setComments);
      setCloseSocket(() => cleanup);
    }
  };

  const followUser = () => {
    addFollow(data?.account?.id || "")
      .then((res) => setIsFollowed(true))
      .catch((err) => {
        setIsFollowed(false);
        CatchAPICallingError(err, navigate);
      });
  };

  const unFollowUser = () => {
    removeFollow(data?.account?.id || "")
      .then((res) => setIsFollowed(false))
      .catch((err) => {
        setIsFollowed(true);
        CatchAPICallingError(err, navigate);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [data]);

  return (
    <Dialog {...dialogProperties}>
      <>
        {!data.images && <p>Không tìm thấy bài đăng, thử lại sau nhé.</p>}
        {data.images && (
          <div className="artwork-detail-container">
            <div className="detail-container flex grid-nogutter">
              <div className="content-container col col-11">
                <Content
                  data={data}
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                  id={data?.id ? data?.id : ""}
                  currentUserId={currentUserId}
                />
              </div>
              <div className="side-buttons-container col col-1 pt-7">
                <ButtonList
                  data={data}
                  isFollowed={isFollowed}
                  makeFollow={followUser}
                  makeUnFollow={unFollowUser}
                />
              </div>
            </div>

            <div className="interartion-container flex grid-nogutter">
              <div className="col col-5">
                {currentUserId === "unknown" ? (
                  <>
                    <p>Bạn cần đăng nhập để bình luận.</p>
                    <Link to={"/login"} />
                  </>
                ) : (
                  <CommentComponent
                    artworkId={data?.id ? data?.id : ""}
                    userId={authenticationInfo?.id}
                    avatar={authenticationInfo?.avatar}
                    fullName={authenticationInfo?.fullname}
                    comments={comments}
                  />
                )}
              </div>
              <div className="creator-info-container col col-5">
                {/* <UserInformationCard .. /> */}
              </div>
              <div className="blank-container col col-2" />
            </div>
          </div>
        )}
      </>
    </Dialog>
  );
}
