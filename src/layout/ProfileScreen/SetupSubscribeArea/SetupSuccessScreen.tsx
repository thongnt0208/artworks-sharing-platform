import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function SetupSuccessScreen({...props}: Props) {
  const navigate = useNavigate();
  const chooseAvailables = () => {};

  return (
    <>
      <p className="text-cus-h1-bold">
        Chúc mừng, bạn đã tạo thành công Vùng dành cho người đăng kí!
      </p>
      <p className="text-cus-normal">
        Ngay bây giờ, bạn có thể thêm nội dung mà chỉ người đã đăng kí của bạn
        mới có thể xem. Chọn từ Asset hoặc Artwork có sẵn của bạn hoặc tạo mới.
      </p>
      <div className="buttons-container">
        <Button onClick={chooseAvailables}>Chọn tác phẩm có sẵn</Button>
        <Button onClick={() => navigate("/postAw")}>Tạo tác phẩm mới</Button>
      </div>
    </>
  );
}
