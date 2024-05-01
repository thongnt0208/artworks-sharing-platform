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
              <p className="text-800 text-base">
                Chào mừng bạn đến với Artworkia! Vui lòng đọc kỹ và hiểu rõ các điều khoản và điều
                kiện sau khi sử dụng dịch vụ của chúng tôi. Bằng cách truy cập hoặc sử dụng dịch vụ
                của chúng tôi, bạn đồng ý tuân theo các điều khoản và điều kiện sau đây:
              </p>
              <div className="detail-policy-container">
                <h4 className="text-900 font-bold text-xl mb-2">1. Chính sách bảo mật</h4>
                <p className="text-800 text-base">
                  Chính sách bảo mật của chúng tôi giúp bạn hiểu rõ cách chúng tôi thu thập, sử dụng
                  và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">1. Tài Khoản và Đăng Ký</h4>
                <p className="text-800 text-base">
                  1.1 Đăng ký: Để sử dụng một số tính năng nhất định của Artworkia, bạn cần tạo tài
                  khoản. Khi tạo tài khoản, bạn phải cung cấp thông tin chính xác và đầy đủ. Bạn
                  chịu trách nhiệm cho tất cả các hoạt động xảy ra trên tài khoản của mình.
                </p>
                <p className="text-800 text-base">
                  1.2 Bảo mật: Bạn phải giữ bí mật mật khẩu của mình và không được tiết lộ cho bất
                  kỳ ai khác. Bạn chịu trách nhiệm cho tất cả các hoạt động xảy ra trên tài khoản
                  của mình.
                </p>
                <p className="text-800 text-base">
                  1.3 Hủy tài khoản: Bạn có thể hủy tài khoản của mình bất cứ lúc nào. Artworkia có
                  thể hủy tài khoản của bạn nếu bạn vi phạm các điều khoản và điều kiện này.
                </p>
                {/* ------- */}
                <h4 className="text-900 font-bold text-xl mb-2">2: Quyền sở hữu trí tuệ</h4>
                <p className="text-800 text-base">
                  2.1 Nội dung của bạn: Bạn sở hữu tất cả quyền đối với nội dung mà bạn đăng tải lên
                  Artworkia. Tuy nhiên, bạn cấp cho Artworkia một giấy phép phi độc quyền, toàn cầu,
                  miễn phí sử dụng, tái tạo, sửa đổi, phân phối và hiển thị nội dung của bạn trên
                  Artworkia và các dịch vụ khác của Artworkia.
                </p>
                <p className="text-800 text-base">
                  2.2 Nội dung của Artworkia: Artworkia sở hữu tất cả quyền đối với nội dung của
                  Artworkia, bao gồm logo, hình ảnh, văn bản và thiết kế. Bạn không được phép sử
                  dụng nội dung của Artworkia mà không có sự đồng ý bằng văn bản trước của
                  Artworkia.
                </p>
                <p className="text-800 text-base">
                  2.3. Artwork có đính kèm assets trả phí phải được duyệt bởi moderator trước khi
                  hiển thị công khai trên trang chủ.
                </p>
                <p className="text-800 text-base">
                  2.4. Artwork có privacy là private chỉ hiển thị với creator đã đăng nó.
                </p>
                <p className="text-800 text-base">
                  2.5. Khi artwork bị xóa, các assets trả phí đính kèm sẽ không hiển thị công khai
                  nữa.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">3. Giao Dịch và Ví Người Dùng</h4>
                <p className="text-800 text-base">
                  3.1. Giá cả: Artworkia có thể tính phí cho một số dịch vụ nhất định. Giá cả cho
                  các dịch vụ này được hiển thị trên Artworkia.
                </p>
                <p className="text-800 text-base">
                  3.2. Thanh toán: Bạn có thể thanh toán cho các dịch vụ của Artworkia bằng thẻ tín
                  dụng, thẻ ghi nợ hoặc ZaloPay.
                </p>
                <p className="text-800 text-base">
                  3.3. Để mở khóa 1 asset, người dùng phải chưa từng mở khóa asset này trước đó.
                </p>
                <p className="text-800 text-base">
                  3.4. Người dùng phải có ít nhất 1 public artwork đã được duyệt để tạo service.
                </p>
                <p className="text-800 text-base">
                  3.5. Người dùng chỉ được update và delete service của chính mình.
                </p>
                <p className="text-800 text-base">
                  3.6. Khi delete service, các requests và proposals liên quan sẽ không bị mất đi.
                </p>
                <p className="text-800 text-base">
                  3.7. Request phải được tạo dựa trên 1 service đã có của creator khác.
                </p>
                <p className="text-800 text-base">
                  3.8. Chỉ có creator đã tạo service mới được quyền update status của request liên
                  quan đến service đó.
                </p>
                <p className="text-800 text-base">
                  3.9. Chỉ có creator đã tạo service mới được quyền tạo proposal cho service đó.
                </p>
                <p className="text-800 text-base">
                  3.10. Trong thỏa thuận phải quy định rõ thời hạn giao nộp sản phẩm cuối cùng và
                  các ràng buộc về thanh toán.
                </p>
                <p className="text-800 text-base">
                  3.11. Người dùng chỉ được update và delete proposal của chính mình.
                </p>
                <p className="text-800 text-base">
                  3.12. Creator chỉ được update hoặc delete proposal khi proposal đó chưa được chấp
                  nhận bởi audience.
                </p>
                <p className="text-800 text-base">
                  3.13. Chỉ người đã đặt yêu cầu về proposal mới được chấp nhận hoặc từ chối
                  proposal đó.
                </p>
                <p className="text-800 text-base">
                  3.14. Người dùng thực hiện đặt cọc cho proposal chỉ khi họ đã accept proposal đó.
                </p>
                <p className="text-800 text-base">
                  3.15. Người dùng chỉ có thể hoàn tất thanh toán cho 1 proposal khi nó đã được cập
                  nhật final assets và có trạng thái là "Completed".
                </p>
                <p className="text-800 text-base">
                  3.16. Số xu đã thanh toán cho assets hoặc proposal sẽ không được hoàn lại trừ khi
                  có vấn đề xảy ra và người dùng gửi khiếu nại lên hệ thống.
                </p>
                <p className="text-800 text-base">
                  3.17. Người dùng phải nhập số điện thoại hợp lệ đã liên kết với Zalopay để
                  activate wallet.
                </p>
                <p className="text-800 text-base">
                  3.18. Người dùng phải liên kết tài khoản với ví điện tử hợp lệ để thực hiện các
                  thao tác rút nạp tiền trên hệ thống.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">4. Xu và giao dịch liên quan</h4>
                <p className="text-800 text-base">
                  4.1. Hệ thống Artworkia sử dụng in-app currency là "Coins" với tỉ lệ quy đổi là 1
                  - 1.
                </p>
                <p className="text-800 text-base">
                  4.2. Mệnh giá nạp tiền tối thiểu cho 1 lần nạp là 40.000 VND.
                </p>
                <p className="text-800 text-base">
                  4.3. Mệnh giá rút tiền tối thiểu cho 1 lần rút là 50.000 VND.
                </p>
                <p className="text-800 text-base">
                  4.4. Mệnh giá rút, nạp tiền tối đa là 10.000.000 VND.
                </p>
                <p className="text-800 text-base">
                  4.5. Nền tảng Artworkia thu phí 5% trên mỗi giao dịch xu trong hệ thống.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">
                  5. Quản Lý Bình Luận và Collection
                </h4>
                <p className="text-800 text-base">
                  5.1. Người dùng chỉ được xóa comment của chính mình.
                </p>
                <p className="text-800 text-base">
                  5.2. Khi comment bị xóa, các comments phản hồi của nó sẽ bị ẩn đi nhưng không bị
                  xóa.
                </p>
                <p className="text-800 text-base">
                  5.3. Người dùng chỉ được xóa collection của chính mính.
                </p>
                <p className="text-800 text-base">5.4. Người dùng không thể follow chính mình.</p>
                <p className="text-800 text-base">5.5. Người dùng không thể block chính mình.</p>
                <h4 className="text-900 font-bold text-xl mb-2">6. Quy tắc ứng xử</h4>
                <p className="text-800 text-base">
                  6.1 Hành vi hợp pháp: Bạn phải tuân theo tất cả các luật pháp và quy định hiện
                  hành khi sử dụng Artworkia.
                </p>
                <p className="text-800 text-base">
                  6.2 Tôn trọng: Bạn phải tôn trọng tất cả người dùng khác của Artworkia. Bạn không
                  được đăng tải hoặc chia sẻ nội dung có tính chất xúc phạm, đe dọa, lăng mạ hoặc
                  quấy rối.
                </p>
                <p className="text-800 text-base">
                  6.3 Nội dung không phù hợp: Bạn không được đăng tải hoặc chia sẻ nội dung có tính
                  chất khiêu dâm, bạo lực hoặc bất hợp pháp.
                </p>
                <p className="text-800 text-base">
                  6.4 Spam: Bạn không được gửi spam hoặc tin nhắn rác cho người dùng khác của
                  Artworkia.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">7. Quyền riêng tư</h4>
                <p className="text-800 text-base">
                  7.1 Thu thập thông tin: Artworkia thu thập thông tin từ bạn khi bạn đăng ký tài
                  khoản, sử dụng dịch vụ của Artworkia hoặc liên hệ với Artworkia.
                </p>
                <p className="text-800 text-base">
                  7.2 Sử dụng thông tin: Artworkia sử dụng thông tin của bạn để cung cấp dịch vụ cho
                  bạn, cải thiện Artworkia và liên hệ với bạn về các dịch vụ và sản phẩm khác của
                  Artworkia.
                </p>
                <p className="text-800 text-base">
                  7.3 Chia sẻ thông tin: Artworkia có thể chia sẻ thông tin của bạn với các bên thứ
                  ba cung cấp dịch vụ cho Artworkia. Artworkia cũng có thể chia sẻ thông tin của bạn
                  nếu được yêu cầu bởi pháp luật.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">8. Thay đổi</h4>
                <p className="text-800 text-base">
                  Artworkia có thể thay đổi các điều khoản và điều kiện này bất cứ lúc nào.
                  Artworkia sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng tải các điều
                  khoản và điều kiện sửa đổi trên Artworkia.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">9. Toàn bộ thỏa thuận</h4>
                <p className="text-800 text-base">
                  Các điều khoản và điều kiện này cấu thành toàn bộ thỏa thuận giữa bạn và Artworkia
                  về việc sử dụng Artworkia.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">10. Luật pháp chi phối</h4>
                <p className="text-800 text-base">
                  Các điều khoản và điều kiện này được chi phối và giải thích theo luật pháp Việt
                  Nam.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">11. Giải quyết tranh chấp</h4>
                <p className="text-800 text-base">
                  Đối ới bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các điều khoản và
                  điều kiện này, quyết định cuối cùng thuộc về Artworkia trọng tài theo luật pháp
                  Việt Nam.
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
