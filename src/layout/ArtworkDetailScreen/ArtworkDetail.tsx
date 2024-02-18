/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import "./ArtworkDetail.scss";
import { fetchArtworkDetail, fetchCommentsForArtwork } from "./Service";
import ButtonList from "./buttons/ButtonList";
import Content from "./content/Content";
import CommentComponent from "./comment/Comment";
import { CommentType } from "./content/ArtworkDetailType";
import { getAuthInfo } from "../../util/AuthUtil";
// import UserInformationCard from "../../components/UserInformationCard";

export default function ArtworkDetail() {
  const id = useParams().id || "";
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [comments, setComments] = useState([] as CommentType[]);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState({} as any);
  const authenticationInfo = getAuthInfo();

  let currentUserId = authenticationInfo?.id ? authenticationInfo?.id : "unknown";

  let dialogProperties = {
    visible: true,
    onHide: () => navigate(-1),
    closable: false,
    headerStyle: { border: "none", padding: "8px" },
    dismissableMask: true,
    draggable: false,
  };

   // Get Artwork Detail Data
  const fetchDetail = () => {
    fetchArtworkDetail(id)
    .then((res) => {
      setData(res.data);
      setIsLiked(res.data.isLiked);
      // console.log(res.data);
      setError("");
    })
    .catch((err) => {
      let message = err.message || "Something went wrong";
      setError({ ...message });
      console.log(err);
    });
  }

  // Get Comments data
  const fetchComments = () => {
    fetchCommentsForArtwork(id)
    .then((res) => {
      setComments(res);
      setError("");
    })
    .catch((err) => {
      let message = err.message || "Something went wrong";
      setError({ ...message });
      console.log(err);
    });
  }
  
  useEffect(() => {
    fetchDetail();
    fetchComments();
  }, []);

  return (
    <Dialog {...dialogProperties}>
      <>
        {error && <p>Đã xảy ra lỗi, vui lòng thử lại</p>}
        {!data.images && <p>Không tìm thấy bài đăng, thử lại sau nhé.</p>}
        {data.images && (
          <div className="artwork-detail-container">
            <div className="detail-container flex grid-nogutter">
              <div className="content-container col col-11">
                <Content
                  data={data}
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                  setError={setError}
                  id={id ? id : ""}
                  currentUserId={currentUserId}
                />
              </div>
              <div className="side-buttons-container col col-1 pt-7">
                <ButtonList data={data} />
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
                    artworkId={id ? id : ""}
                    userId={authenticationInfo?.id}
                    avatar={authenticationInfo?.avatar}
                    fullName={authenticationInfo?.fullname}
                    comments={comments}
                    reloadComments={fetchComments}
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
