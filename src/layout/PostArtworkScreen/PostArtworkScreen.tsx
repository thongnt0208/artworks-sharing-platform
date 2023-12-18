import { useNavigate, useParams } from "react-router-dom";
import "./PostArtworkScreen.scss";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Content from "./Content";
{
  /* Import Content.ts in /ArtworkDetailScreen/content/ */
}

type Props = {};

export default function PostArtworkScreen({ ...props }: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [error, setError] = useState({} as any);
  const { authenticationInfo } = useAuth();

  useEffect(() => {}, []);

  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}

      {data.Images && (
        <div className="artwork-detail-container">
          <div className="detail-container flex grid-nogutter">
            <div className="left-panel-container col col-10">
              {/* Import Content.ts in /ArtworkDetailScreen/content/ */}
            </div>
            <div className="right-panel-container col col-2">
              {/* Form start here */}
              {/* Form end here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
