/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ArtworkDetail.scss";
import {
  addFollow,
  fetchArtworkDetail,
  fetchCommentsForArtworkRealTime,
  fetchIsFollow,
  removeFollow,
} from "./Service";
import ButtonList from "./buttons/ButtonList";
import Content from "./content/Content";
import CommentComponent from "./comment/Comment";
import { ArtworkDetailType, CommentType } from "./ArtworkDetailType";
import { getAuthInfo } from "../../util/AuthUtil";
import { ProgressSpinner } from "primereact/progressspinner";
import MinnorContentRight from "./MinnorContentRight";

export default function ArtworkDetail() {
  const id = useParams().id || "";
  const [data, setData] = useState({} as ArtworkDetailType);
  const [comments, setComments] = useState([] as CommentType[]);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [error, setError] = useState({} as any);
  const [closeSocket, setCloseSocket] = useState<() => void | null>();
  const [isLoading, setIsLoading] = useState(false);
  const authenticationInfo = getAuthInfo();
  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  const fetchIsFollowed = (id: string) => {
    fetchIsFollow(id)
      .then((res) => setIsFollowed(res))
      .catch((err) => setIsFollowed(false));
  };

  const previewClassname = "preview-container" + (isLoading ? "" : "-filled");

  // Get Artwork Detail Data
  const fetchDetail = () => {
    setIsLoading(true);
    fetchArtworkDetail(id, currentUserId)
      .then((res) => {
        setData(res);
        setIsLiked(res.isLiked);
        fetchIsFollowed(res.account.id);
        setError("");
      })
      .catch((err) => {
        let message = err.message || "Something went wrong";
        setError({ ...message });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  // Get Comments data
  const fetchComments = () => {
    if (!closeSocket) {
      const cleanup = fetchCommentsForArtworkRealTime(id, setComments);
      setCloseSocket(() => cleanup);
    } else {
      closeSocket();
      const cleanup = fetchCommentsForArtworkRealTime(id, setComments);
      setCloseSocket(() => cleanup);
    }
  };

  const followUser = () => {
    console.log("followUser: " + data?.account?.id);
    addFollow(data?.account?.id || "")
      .then((res) => {
        console.log("followUser: " + res + "Success");
        setIsFollowed(true);
      })
      .catch((err) => {
        console.log("followUser: " + err);
      });
  };

  const unFollowUser = () => {
    console.log("unFollowUser: " + data?.account?.id);
    removeFollow(data?.account?.id || "")
      .then((res) => {
        console.log("unFollowUser: " + res + "Success");
        setIsFollowed(false);
      })
      .catch((err) => {
        console.log("unFollowUser: " + err);
      });
  };

  useEffect(() => {
    fetchDetail();
    fetchComments();
  }, []);

  return (
    <div className="artwork-detail-screen h-screen ml-7 mr-7">
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
      ) : error ? (
        <p>Đã xảy ra lỗi, vui lòng thử lại</p>
      ) : (
        !data.images && <p>Không tìm thấy bài đăng, thử lại sau nhé.</p>
      )}

      {data.images && (
        <div className="artwork-detail-container">
          <div className="detail-container flex grid-nogutter">
            <div className="content-container col col-11">
              <Content
                data={data}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                id={id ? id : ""}
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

          <div className="interartion-container flex grid-nogutter pb-4">
            <div className="col col-5">
              {currentUserId === "unknown" ? (
                <>
                  <p>Bạn cần đăng nhập để bình luận.</p>
                  <Link to={"/login"} />
                </>
              ) : (
                <CommentComponent
                  artworkId={id ? id : ""}
                  userId={authenticationInfo?.id}
                  avatar={authenticationInfo?.avatar}
                  fullName={authenticationInfo?.fullname}
                  comments={comments}
                />
              )}
            </div>
            <div className="creator-info-container col col-5">
              <MinnorContentRight data={data} isFollowed={isFollowed} />
            </div>
            <div className="blank-container col col-2" />
          </div>
        </div>
      )}
    </div>
  );
}
