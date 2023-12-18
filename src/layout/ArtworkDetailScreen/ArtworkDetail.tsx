import { useNavigate, useParams } from "react-router-dom";
import "./ArtworkDetail.scss";
import SquareButton from "./SquareButton";
import { useEffect, useState } from "react";
import { fetchArtworkDetail } from "./Service";
import Content from "./content/Content";
import useAuth from "../../hooks/useAuth";
import CommentComponent from "./comment/Comment";
import { getButtonsList } from "./ButtonList";
// import UserInformationCard from "../../components/UserInformationCard";

type Props = {};

export default function ArtworkDetail({ ...props }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [error, setError] = useState({} as any);
  const { authenticationInfo } = useAuth();

  const buttonsList = getButtonsList(navigate);
  
  /* Remove the comment after add "id" field to authenticationInfo
      let currentUserId = authenticationInfo.id;
   */
  let currentUserId = "thongnt"; //temporary value

  useEffect(() => {
    fetchArtworkDetail(id, currentUserId)
      .then((res) => {
        setData(res.data);
        console.log(res.data);

        setError("");
      })
      .catch((err) => {
        let message = err.message || "Something went wrong";
        setError({ ...message });
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}

      {!data.Images && <p>Không tìm thấy bài đăng, thử lại sau nhé.</p>}
      {data.Images && (
        <div className="artwork-detail-container">
          <div className="detail-container flex grid-nogutter">
            <div className="content-container col col-10">
              <Content {...data} />
            </div>
            <div className="side-buttons-container col col-2">
              {buttonsList.map((button, index) => {
                return (
                  <SquareButton
                    key={index}
                    title={button.title}
                    thumbnailImg={button.thumbnailImg}
                    thumbnailAlt={button.thumbnailAlt}
                    onClick={() => {
                      button.onclick();
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="interartion-container">
            {data.isLike && (
              <SquareButton
                title="Bỏ Thích"
                thumbnailImg=""
                thumbnailAlt=""
                onClick={() => {}}
              />
            )}
            {data.isLike && (
              <SquareButton
                title="Thích"
                thumbnailImg=""
                thumbnailAlt=""
                onClick={() => {}}
              />
            )}

            <div className="comment-container">
              {/* <CommentComponent artworkId={id} userId={authenticationInfo.userId} avatar={authenticationInfo.avatar} fullName={authenticationInfo.fullname } comments={data.Comments} /> */}
              <CommentComponent
                artworkId={id ? id : ""}
                userId="thongnt"
                avatar="https://placehold.in/600"
                fullName="Nguyễn Chung Tông"
                comments={data.Comments}
              />
            </div>

            <div className="creator-info-container">
              {/* <UserInformationCard .. /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
