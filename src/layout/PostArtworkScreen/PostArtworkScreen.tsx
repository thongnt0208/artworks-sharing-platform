import { Link, useNavigate } from "react-router-dom";
import "./PostArtworkScreen.scss";
import { useEffect, useState } from "react";
import InputForm from "./InputForm/InputForm";
import { getAuthInfo } from "../../util/AuthUtil";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

type Props = {};

export default function PostArtworkScreen({ ...props }: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [error, setError] = useState({} as any);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const authenticationInfo = getAuthInfo();

  useEffect(() => {}, []);
  console.log("uploadedFiles", uploadedFiles);
  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}
      <div className="artwork-detail-container">
        <div className="detail-container flex grid-nogutter">
          <div className="left-panel-container review-container col col-9">
            {/* Review title */}
            {data?.title && (
              <div className="title-container">
                <h1 className="text-cus-h1-bold">{data?.title}</h1>
              </div>
            )}
            {/* Review Description */}
            {data?.description && <p className="text-cus-body">{data?.description}</p>}
            {/* Review Tags */}
            {data?.tags?.length > 0 && (
              <div className="tags-container">
                {data.tags.map((tag: string, index: number) => (
                  <Button key={index}>
                    <Link to={""} className="tag-inline">
                      #{tag}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
            {/* Review Images */}
            {uploadedFiles.length === 0 && <p>Hình ảnh bạn chọn sẽ hiển thị ở đây</p>}
            {uploadedFiles.length > 0 && (
              <div>
                {uploadedFiles.map((file: any, index: number) => (
                  <Image
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${file.name}`}
                    width="100%"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="right-panel-container col col-3 p-3">
            <InputForm
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              data={data}
              setData={setData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
