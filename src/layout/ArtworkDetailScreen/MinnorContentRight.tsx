import ProfilePreview from "../../components/ProfilePreview";
import { Button } from "primereact/button";
import { SoftwareUsedType } from "../PostArtworkScreen/Service";
import { useNavigate } from "react-router-dom";
import { ArtworkDetailType } from "./ArtworkDetailType";
import { UserInformationProps } from "../../components/UserInformationCard";
import Tag from "../../components/Tag";

type Props = {
  data: ArtworkDetailType;
  isFollowed: boolean | undefined;
};

export default function MinnorContentRight({ data, isFollowed }: Props) {
  const navigate = useNavigate();

  const creatorInfo = {
    id: data?.account?.id || "",
    avatar: data?.account?.avatar || "",
    fullname: data?.account?.fullname || "",
    username: data?.account?.username || "",
    email: data?.account?.email || "",
    isFollowed: isFollowed || false,
  } as UserInformationProps;
  return (
    <>
      <div
        className="creator-info tmp-container"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/account/${data.account.id}`)}
      >
        <ProfilePreview creator={creatorInfo} />
        <div className="btns-container flex flex-column gap-2">
          <Button rounded onClick={() => navigate(`/account/${data.account.id}`)}>
            Trang cá nhân
          </Button>
          <Button rounded onClick={() => navigate(`/account/${data.account.id}`)}>
            Thuê
          </Button>
        </div>
      </div>

      {/* Categories */}
      {data.categoryArtworkDetails?.length > 0 && (
        <div className="categories-aw-detail tmp-container flex flex-column gap-2">
          <span>Thể loại</span>
          <div className="flex flex-wrap gap-2 justify-content-center">
            {data.categoryArtworkDetails?.map((category: any) => (
              <Tag
                key={category.id}
                id={category.id}
                tagName={category.categoryName}
                isCategory={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Software used */}
      {data.softwareUseds && data.softwareUseds?.length > 0 && (
        <div className="software-used-container tmp-container flex flex-column gap-2">
          <span>Phương tiện</span>
          <div className="flex flex-column gap-2 pr-4 pl-4">
            {data.softwareUseds?.map((software: SoftwareUsedType) => (
              <p
                className="pb-2"
                style={{
                  color: "black",
                  textAlign: "left",
                  borderBottom: "solid 1px #CCCBC8",
                }}
              >
                {software.softwareName}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
