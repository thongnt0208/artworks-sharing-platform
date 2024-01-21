import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import "./ArtworkDetail.scss";
import { fetchArtworkDetail, fetchCommentsForArtwork } from "./Service";
import ButtonList from "./buttons/ButtonList";
import Content from "./content/Content";
import CommentComponent from "./comment/Comment";
import { CommentType } from "./content/ArtworkDetailType";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAuthInfo } from "../../util/AuthUtil";
// import UserInformationCard from "../../components/UserInformationCard";

export default function ArtworkDetail() {
  // const { id } = useParams();
  const id = useParams().id || "";
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [comments, setComments] = useState([] as CommentType[]);
  const [isCommentChanged, setIsCommentChanged] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState({} as any);
  const  authenticationInfo  = getAuthInfo();

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
  useEffect(() => {
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
  }, [id]);

  // Get Comments data
  useEffect(() => {
    fetchCommentsForArtwork(id)
      .then((res) => {
        setComments(res.data);
        setError("");
      })
      .catch((err) => {
        let message = err.message || "Something went wrong";
        setError({ ...message });
        console.log(err);
      });
  }, [id, isCommentChanged]);

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
                  setError={setError}
                  id={id ? id : ""}
                  currentUserId={currentUserId}
                />
              </div>
              <div className="side-buttons-container col col-1 pt-7">
                <ButtonList />
              </div>
            </div>

            <div className="interartion-container flex grid-nogutter">
              {/* <CommentComponent artworkId={id} userId={authenticationInfo.userId} avatar={authenticationInfo.avatar} fullName={authenticationInfo.fullname } comments={data.Comments} /> */}
              <div className="col col-5">
                {comments.length === 0 ? (
                  <p>Chưa có bình luận nào</p>
                ) : (
                  <CommentComponent
                    artworkId={id ? id : ""}
                    userId="thongnt"
                    avatar="https://placehold.in/600"
                    fullName="Nguyễn Chung Tông"
                    comments={comments}
                    setIsCommentChanged={setIsCommentChanged}
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
