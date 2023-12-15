import { useNavigate, useParams } from "react-router-dom";
import "./ArtworkDetail.scss";
import SquareButton from "./SquareButton";
import { useEffect, useState } from "react";
import { fetchArtworkDetail } from "./Service";
import Content from "./content/Content";
import useAuth from "../../hooks/useAuth";
// import UserInformationCard from "../../components/UserInformationCard";

type Props = {};

export default function ArtworkDetail({ ...props }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [error, setError] = useState({} as any);
  const { authenticationInfo } = useAuth();

  const buttonsList = [
    {
      title: "Theo dõi",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Thuê",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Tài nguyên",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Lưu",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Chia sẻ",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
      },
    },
    {
      title: "Báo cáo",
      thumbnailImg: "https://placehold.in/600",
      thumbnailAlt: "",
      onclick: () => {
        navigate("");
        console.log("baos caos");
      },
    },
  ];

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
      <h1>Error state:</h1>
      <p>{data.toString()}</p>
      <div className="artwork-detail-container">
        <div className="detail-container flex grid-nogutter">
          <div className="content-container col col-10">
            {data.Images && <Content {...data} />}
            {!data.Images && <p>Không tìm thấy bài đăng, thử lại sau nhé.</p>}
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
          <SquareButton title="Thích" thumbnailImg="" thumbnailAlt="" onClick={()=> {}}/>
          <div className="comment-container">
            <div className="comment-input-container"></div>
            <div className="comment-list-container"></div>
          </div>

          <div className="creator-info-container">
            {/* <UserInformationCard .. /> */}
          </div>
        </div>
      </div>
    </>
  );
}
