import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const logo = require("../assets/logo/logo.png");

export default function UnknownErrorPage() {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Get the current URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);

    // Retrieve the values of 'status' and 'message' parameters
    let _status = urlSearchParams.get("status") || "";
    let _message = urlSearchParams.get("message") || "";
    setStatus(_status);
    setMessage(_message);
    console.log(status, message);
  }, [message, status]);

  return (
    <div className="err-page-container flex align-items-center justify-content-center min-h-screen overflow-hidden">
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={logo} alt="Artwokia logo" className="mb-5 w-6rem flex-shrink-0" />
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
            style={{ borderRadius: "53px" }}
          >
            <span className="text-blue-500 font-bold text-3xl">Lỗi</span>
            <h1 className="text-900 font-bold text-5xl mb-2">Đã xảy ra lỗi không mong muốn</h1>
            <div className="text-600 mb-5">
              Yêu cầu không khả dụng, vui lòng kiểm tra thông tin và thử lại
            </div>
            <span className="text-600">{status}</span>
            <span className="text-600">{message}</span>
            <Link to="/" className="w-full flex align-items-center py-5 border-300 border-bottom-1">
              <span
                className="flex justify-content-center align-items-center bg-cyan-400 border-round"
                style={{ height: "3.5rem", width: "3.5rem" }}
              >
                <i className="text-50 pi pi-fw pi-table text-2xl"></i>
              </span>
              <span className="ml-4 flex flex-column">
                <span className="text-900 lg:text-xl font-medium mb-1">Câu hỏi thường gặp</span>
                <span className="text-600 lg:text-lg">
                  Có lẽ bạn đã mắc phải một số lỗi quen thuộc.
                </span>
              </span>
            </Link>
            <Link to="/" className="w-full flex align-items-center py-5 border-300 border-bottom-1">
              <span
                className="flex justify-content-center align-items-center bg-orange-400 border-round"
                style={{ height: "3.5rem", width: "3.5rem" }}
              >
                <i className="pi pi-fw pi-question-circle text-50 text-2xl"></i>
              </span>
              <span className="ml-4 flex flex-column">
                <span className="text-900 lg:text-xl font-medium mb-1">Liên hệ trợ giúp</span>
                <span className="text-600 lg:text-lg">
                  Artworkia luôn có bộ phận trợ giúp sẵn sàng hỗ trợ bạn.
                </span>
              </span>
            </Link>
            <Link
              to="/"
              className="w-full flex align-items-center justify-content-center mb-5 py-5 border-300 border-bottom-1"
            >
              <Button>Trang chủ</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
