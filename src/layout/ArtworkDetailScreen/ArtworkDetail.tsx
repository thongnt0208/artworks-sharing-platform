import { useNavigate, useParams } from "react-router-dom";
import "./ArtworkDetail.scss";
import SquareButton from "./SquareButton";
import { useEffect, useState } from "react";
import { fetchArtworkDetail } from "./Service";
import Content from "./content/Content";
// import UserInformationCard from "../../components/UserInformationCard";

type Props = {};

export default function ArtworkDetail({ ...props }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchArtworkDetail(id)
      .then((res) => {
        setData(res.data);
        console.log("aaaaaaaaa");
        
        console.log(res.data);

        setError("");
      })
      .catch((err) => {
        setError(err);
        console.log("uuuuuuuuuu");
        
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="artwork-detail-container">
        <div className="title-container"></div>
        <div className="detail-container flex grid-nogutter">
          <div className="content-container col col-10">
            {/* <Content> */}
            <Content {...data} />
          </div>
          <div className="side-buttons-container col col-2">
            {buttonsList.map((button) => {
              return (
                <SquareButton
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
