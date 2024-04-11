import React, { useEffect, useState } from "react";
import { Rating } from "primereact/rating";

import { ServiceProps } from "./ServiceCard";
import { GetReviewOfServiceData } from "../layout/ProfileScreen/ServicesView/ServicesService";
import "./ServiceReviewPopup.scss";
import { formatTime } from "../util/TimeHandle";
import { toast } from "react-toastify";

export type ServiceReviewProps = {
  id: string;
  proposalId: string;
  vote: number;
  detail: string;
  createdOn: string;
  account: {
    id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
  };
};

const ServiceReviewPopup: React.FC<{
  service: ServiceProps;
  averageRating: number;
}> = ({ service, averageRating }) => {
  const [serviceReview, setServiceReview] = useState<ServiceReviewProps[]>([]);

  useEffect(() => {
    const fetchServiceReview = async () => {
      try {
        const serviceReview = await GetReviewOfServiceData(service.id);
        setServiceReview(serviceReview);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu đánh giá dịch vụ");
      }
    };
    fetchServiceReview();
  }, [service]);
  console.log("Service Review: ", serviceReview);
  return (
    <div className="service-review-popup">
      <div className="flex flex-column justify-content-start align-items-center">
        <h1 className="title text-center m-1">Tất cả đánh giá</h1>
        <div className="rating-section text-center">
          <Rating className="rating" value={averageRating} readOnly cancel={false} />
          <h3>({serviceReview.length} đánh giá)</h3>
        </div>
        {serviceReview.length === 0 ? (
          <div
            className="w-full h-full flex justify-content-center align-items-center"
            style={{ borderTop: "1px solid #00668C" }}
          >
            <h1 className="text-center">Chưa có đánh giá nào</h1>
          </div>
        ) : (
          <div
            className="review-list w-full h-full"
            style={{ borderTop: "1px solid #00668C", paddingTop: "1rem" }}
          >
            {serviceReview.map((review) => (
              <div key={review.id} className="review-item">
                <div className="account-info-section">
                  <img
                    className="avatar"
                    src={review.account.avatar}
                    alt="avatar"
                  />
                  <div className="flex flex-column justify-content-start align-items-start">
                    <h3 className="m-0">{review.account.fullname}</h3>
                    <p className="m-0">{review.detail}</p>
                  </div>
                </div>
                <div className="rating-service">
                  <Rating
                    className="rating"
                    value={review.vote}
                    readOnly
                    cancel={false}
                  />
                    <p className="m-0 mt-1 text-right">{formatTime(review.createdOn, "dd/MM/yyyy")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceReviewPopup;
