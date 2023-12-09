import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./UserInformationCard.scss";
import { useState } from "react";

/* Sample props:

const userProps = {
    id: "123",
    name: "Thong Nguyen",
    isCreator: true,
    job: "Developer",
    address: "Lost Angelest",
    introduction: "I am Front-end Developer",
    profileView: 99,
    artworksView: 999,
    followerNum: 9,
    followingNum: 99,
    followHandler: () => {},
    hireHandler: () => {},
    editHandler: () => {},
    privacyEditHandler: () => {},
  };
*/

type Props = {
  id: string;
  name: string;
  isCreator: boolean; // true if it is current user, false if it is audience
  job: string;
  address: string;
  introduction: string;
  profileView: number;
  artworksView: number;
  followerNum: number;
  followingNum: number;
  followHandler?: () => void;
  hireHandler?: () => void;
  editHandler?: () => void;
  privacyEditHandler?: () => void;
};

export default function UserInformationCard({ ...props }: Props) {
  //   let header = <></>;
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  let footer = (
    <>
      {props.isCreator && (
        <>
          <Button label="Chỉnh sửa trang cá nhân" onClick={props.editHandler} />
          <Button
            label="Thay đổi chế độ riêng tư"
            onClick={props.privacyEditHandler}
          />
        </>
      )}
      {!props.isCreator && (
        <>
          <Button label="Theo dõi" onClick={props.followHandler} />
          <Button label="Thuê" onClick={props.hireHandler} />
        </>
      )}{" "}
    </>
  );
  return (
    <>
      <Card footer={footer} className="user-information-card">
        <div className="avatar-container">
          <img
            alt={`Ảnh đại diện của ${props.name}`}
            src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
            className="thumbnail border-round"
          />
        </div>
        <div className="information-container">
          <h1>{props.name}</h1>
          <p>{props.job}</p>
          <p>{props.address}</p>
          {showMore && <p>{props.introduction}</p>}
        </div>
        <Button
          label={showMore ? "Thu gọn" : "Xem thêm"}
          onClick={toggleShowMore}
        />
        {showMore && (
          <div className="views-container grid-nogutter">
          {/* Column for labels */}
          <div className="col-9">
              <div>
                  <p>Lượt xem trang cá nhân</p>
              </div>
              <div>
                  <p>Lượt xem tác phẩm</p>
              </div>
              <div>
                  <p>Người theo dõi</p>
              </div>
              <div>
                  <p>Đang theo dõi</p>
              </div>
          </div>
      
          {/* Column for numbers */}
          <div className="col-3">
              <div>
                  <p>{props.profileView}</p>
              </div>
              <div>
                  <p>{props.artworksView}</p>
              </div>
              <div>
                  <p>{props.followerNum}</p>
              </div>
              <div>
                  <p>{props.followingNum}</p>
              </div>
          </div>
      </div>
      
        )}
      </Card>
    </>
  );
}
