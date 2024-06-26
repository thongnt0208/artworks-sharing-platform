import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// --------------------------------------------------------
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
// --------------------------------------------------------
import InputForm from "./InputForm/InputForm";
// --------------------------------------------------------

import "./PostArtworkScreen.scss";
import { translate2Vietnamese } from "../../util/TextHandle";
// --------------------------------------------------------
type Props = {};

export default function PostArtworkScreen({ ...props }: Props) {
  const navigate = useNavigate();
  const [data, setData] = useState({} as any);
  const [error, setError] = useState(0 as any); //0: first compile; null: success; !=null: error
  const [success, setSuccess] = useState(0 as any); //0: first compile; null: error; !=null: success
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const toast: any = useRef(null);

  const isShowEmptyTemplate =
    uploadedFiles.length === 0 && !data?.title && !data?.description && data?.tags?.length === 0;
  const previewClassname = "preview-container" + (!isShowEmptyTemplate ? "-filled" : "");

  useEffect(() => {
    if (error !== 0) {
      let _tmpMsg = "";
      // if = 401 || 403 -> login again
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        _tmpMsg = "Hết phiên đăng nhập. Vui lòng đăng nhập lại.";
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      if (error !== null) {
        translate2Vietnamese(error?.message + " " + error?.response?.statusText).then(
          (translatedMsg) => {
            toast.current.show({
              severity: "error",
              summary:
                error?.response?.status + " " + error?.code + " " + error?.response?.statusText,
              detail: _tmpMsg === "" ? translatedMsg : _tmpMsg,
            });
          }
        );
      } else {
        toast.current.show({
          severity: "success",
          summary: "Đăng bài thành công",
          detail: "Bài đăng đã được đăng tải lên hệ thống.",
        });
        setTimeout(() => {
          navigate(`/artwork/${success?.data?.id}`);
        }, 2000);
      }
    }
  }, [error, navigate, success]);

  useEffect(() => {
    console.log("Uploaded files: ", uploadedFiles);
  }, [uploadedFiles]);

  return (
    <>
      <Toast ref={toast} />
      <div className="artwork-detail-container">
        <div className="detail-container flex grid-nogutter">
          <div className="left-panel-container col col-9 p-3">
            <div className={previewClassname + " p-2"}>
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
              {isShowEmptyTemplate && (
                <div className="empty-template flex flex-column gap-1">
                  <span className="text-cus-h1-bold">Hãy bắt đầu xây dựng dự án của bạn</span>
                  <span className="text-cus-h3">Bản xem trước của bài đăng sẽ hiển thị ở đây</span>
                </div>
              )}
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
          </div>
          <div className="right-panel-container col col-3 p-3">
            <InputForm
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              setData={setData}
              setError={setError}
              setSuccess={setSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
}
