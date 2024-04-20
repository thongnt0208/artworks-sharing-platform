import { Button } from "primereact/button";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const logo = require("../assets/logo/logo.png");
export default function PolicyPage() {
  return (
    <>
      <Helmet>
        <title>Chính sách nền tảng</title>
        <meta
          name="description"
          content="Chính sách nền tảng của chúng tôi giúp bạn hiểu rõ hơn về cách chúng tôi thu thập, sử dụng dữ liệu và các cam kết mà bạn phải chấp nhận khi sử dụng hệ thống của chúng tôi."
        />
      </Helmet>
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
              <span className="text-blue-500 font-bold text-3xl">Chi tiết</span>
              <h1 className="text-900 font-bold text-5xl mb-2">Chính sách nền tảng</h1>
              <div className="text-600 mb-5">
                Chính sách nền tảng của chúng tôi giúp bạn hiểu rõ hơn về cách chúng tôi thu thập,
                sử dụng dữ liệu và các cam kết mà bạn phải chấp nhận khi sử dụng hệ thống của chúng
                tôi.
              </div>
              <div className="detail-policy-container">
                <h4 className="text-900 font-bold text-xl mb-2">1. Chính sách bảo mật</h4>
                <p className="text-800 text-base">
                  Chính sách bảo mật của chúng tôi giúp bạn hiểu rõ cách chúng tôi thu thập, sử dụng
                  và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">2. Chính sách sử dụng</h4>
                <p className="text-800 text-base">
                  Chính sách sử dụng của chúng tôi giúp bạn hiểu rõ cách chúng tôi thu thập, sử dụng
                  và chia sẻ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">3. Chính sách bảo mật</h4>
                <p className="text-800 text-base">
                  Chính sách bảo mật của chúng tôi giúp bạn hiểu rõ cách chúng tôi thu thập, sử dụng
                  và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi.
                </p>
              </div>
              <Link
                to="/"
                className="w-full flex align-items-center py-5 border-300 border-bottom-1"
              >
                <span
                  className="flex justify-content-center align-items-center bg-cyan-400 border-round"
                  style={{ height: "3.5rem", width: "3.5rem" }}
                >
                  <i className="text-50 pi pi-fw pi-table text-2xl"></i>
                </span>
                <span className="ml-4 flex flex-column">
                  <span className="text-900 lg:text-xl font-medium mb-1">Câu hỏi thường gặp</span>
                  <span className="text-600 lg:text-lg">
                    Có lẽ bạn sẽ cần biết những điều quen thuộc.
                  </span>
                </span>
              </Link>
              <Link
                to="/"
                className="w-full flex align-items-center py-5 border-300 border-bottom-1"
              >
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
    </>
  );
}
