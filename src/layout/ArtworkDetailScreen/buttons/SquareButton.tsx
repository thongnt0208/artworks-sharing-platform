import { Button } from "primereact/button";
import "./SquareButton.scss";

type Props = {
  id?: string;
  title: string;
  thumbnailImg?: string;
  thumbnailAlt?: string;
  onClick: () => void;
};

export default function SquareButton({ ...props }: Props) {
  return (
    <>
      <div id={props.id} className="square-button-container" onClick={props.onClick}>
        <Button rounded className="square-button-thumbnail-container">
          <img
            className="square-button-thumbnail"
            src={props.thumbnailImg || "https://placehold.in/600"}
            alt={props.thumbnailAlt || "Hình minh hoạ cho nút bấm"}
          />
        </Button>
        <div className="square-button-title text-cus-small">{props.title}</div>
      </div>
    </>
  );
}
