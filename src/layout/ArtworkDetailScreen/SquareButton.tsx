import { Button } from "primereact/button";
import "./SquareButton.scss";

type Props = {
  title: string;
  thumbnailImg?: string;
  thumbnailAlt?: string;
  onClick: () => void;
};

export default function SquareButton({ ...props }: Props) {
  return (
    <>
      <div className="square-button-container" onClick={props.onClick}>
        <div className="square-button-thumbnail-container">
          <img
            className="square-button-thumbnail"
            src={props.thumbnailImg || "https://placehold.in/600"}
            alt={props.thumbnailAlt || "Hình minh hoạ cho nút bấm"}
          />
        </div>
        <div className="square-button-title">{props.title}</div>
      </div>
    </>
  );
}
