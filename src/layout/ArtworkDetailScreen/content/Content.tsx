import { Image } from "primereact/image";

type Comment = {
  Id: string;
  UserId: string;
  Fullname: string;
  Avatar: string;
  Content: string;
};

type Creator = {
  Id: string;
  Fullname: string;
  Avatar: string;
  Bio: string;
  Job: string;
  Address: string;
};

type Props = {
  Id: string;
  CreatedBy: Creator;
  Title: string;
  Images: string[];
  Description: string;
  Privacy: string;
  CreatedOn: string;
  LastModifiedOn?: string;
  Tags: string[];
  Category: string;
  LikeNum: number;
  ViewNum: number;
  Comments?: Comment[];
};

export default function Content({ ...props }: Props) {
  return (
    <>
      <div className="artwork-images-container">
        {/* Displaying images */}
        {props.Images.map((image, index) => (
          <Image key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <div className="artwork-info-container">
        {/* Displaying title, description, and other information */}
        <h1>{props.Title}</h1>
        <p>{props.Description}</p>
        <p>Created by: {props.CreatedBy.Fullname}</p>
        {/* You can include more information from props as needed */}
      </div>
    </>
  );
}
