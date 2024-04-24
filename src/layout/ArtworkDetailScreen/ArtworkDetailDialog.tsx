/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import "./ArtworkDetail.scss";
import { addFollow, fetchCommentsForArtworkRealTime, removeFollow } from "./Service";
import ButtonList from "./buttons/ButtonList";
import Content from "./content/Content";
import CommentComponent from "./comment/Comment";
import { CommentType } from "./ArtworkDetailType";
import { getAuthInfo } from "../../util/AuthUtil";
import { CatchAPICallingError, ProgressSpinner } from "..";
import { awDetailStateToolsType } from "../HomeScreen/HomeScreen";
import MinnorContentRight from "./MinnorContentRight";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  awDetailStateTools: awDetailStateToolsType;
};

export default function ArtworkDetailDialog(props: Props) {
  const { visible, setVisible, awDetailStateTools } = props;
  const { currentAwDetail, isLiked, setIsLiked, isFollowed, setIsFollowed, isLoading } =
    awDetailStateTools;
  const data = currentAwDetail;
  const navigate = useNavigate();
  const location = useLocation();
  const [comments, setComments] = useState([] as CommentType[]);
  const [_isLoading, setIsLoading] = useState(false);
  const [closeSocket, setCloseSocket] = useState<() => void | null>();
  const authenticationInfo = getAuthInfo();

  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  let dialogProperties = {
    visible: visible,
    onHide: () => {
      setVisible(false);
      window.history.replaceState(null, "", location.pathname);
    },
    closable: false,
    headerStyle: { border: "none", padding: "8px" },
    dismissableMask: true,
    draggable: false,
    className: "artwork-detail-dialog w-screen h-screen ml-7 mr-7",
  };

  const previewClassname = "preview-container" + (isLoading ? "" : "-filled");

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
    setIsLoading(true);
    addFollow(data?.account?.id || "")
      .then(() => {
        setIsFollowed(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsFollowed(false);
        setIsLoading(false);
        CatchAPICallingError(err, navigate);
      });
  };

  const unFollowUser = () => {
    setIsLoading(true);
    removeFollow(data?.account?.id || "")
      .then((res) => {
        setIsFollowed(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsFollowed(true);
        setIsLoading(false);
        CatchAPICallingError(err, navigate);
      });
  };

  useEffect(() => {
    fetchComments();
    console.log(currentAwDetail);
  }, [data]);

  return (
    <Dialog {...dialogProperties}>
      {isLoading ? (
        <div className={previewClassname}>
          <div className="empty-template flex flex-column gap-1">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              animationDuration=".5s"
            />
            <span className="text-cus-h3">Đang tải dữ liệu...</span>
          </div>
        </div>
      ) : (
        !data.images && <p>Không tìm thấy bài đăng, thử lại sau nhé.</p>
      )}{" "}
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
                _isLoading={_isLoading}
              />
            </div>
          </div>

          <div className="interartion-container flex grid-nogutter">
            <div className="col col-7">
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
            <div className="creator-info-container col col-4">
              <MinnorContentRight data={data} isFollowed={isFollowed} />
            </div>
            <div className="blank-container col col-1" />
          </div>
        </div>
      )}
    </Dialog>
  );
}
