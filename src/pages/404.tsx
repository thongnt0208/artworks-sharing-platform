import { Button } from "primereact/button";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const logo = require("../assets/logo/logo.png");
export default function NotFoundPage() {
  return (
    <>
    <Helmet>
      <title>404 Không tìm thấy</title>
      <meta
        name="description"
        content="Trang không tìm thấy, vui lòng kiểm tra lại đường dẫn hoặc liên hệ với bộ phận hỗ trợ của chúng tôi."
      />
    </Helmet>
    <div className="err-page-container flex align-items-center justify-content-center min-h-screen overflow-hidden">
      <div className="flex flex-column align-items-center justify-content-center">
        <img
          src={logo}
          alt="Artwokia logo"
          className="mb-5 w-6rem flex-shrink-0"
        />
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
            <span className="text-blue-500 font-bold text-3xl">404</span>
            <h1 className="text-900 font-bold text-5xl mb-2">Không tìm thấy</h1>
            <div className="text-600 mb-5">Địa chỉ được yêu cầu không khả dụng</div>
            <Link to="/" className="w-full flex align-items-center py-5 border-300 border-bottom-1">
              <span
                className="flex justify-content-center align-items-center bg-cyan-400 border-round"
                style={{ height: "3.5rem", width: "3.5rem" }}
              >
                <i className="text-50 pi pi-fw pi-table text-2xl"></i>
              </span>
              <span className="ml-4 flex flex-column">
                <span className="text-900 lg:text-xl font-medium mb-1">
                  Câu hỏi thường gặp
                </span>
                <span className="text-600 lg:text-lg">Có lẽ bạn đã mắc phải một số lỗi quen thuộc.</span>
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
    </div></>
  );
}
