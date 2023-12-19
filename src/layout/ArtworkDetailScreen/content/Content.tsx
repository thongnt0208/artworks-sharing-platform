import { Image } from "primereact/image";
import { ArtworkDetailType } from "./ArtworkDetailType";
import { Link } from "react-router-dom";

export default function Content(
  { ...props }: ArtworkDetailType,
  onTagClick?: (tag: string) => void
) {
  return (
    <>
      <div className="title-container">
        <h1>{props.Title}</h1>
      </div>
      <div className="artwork-images-container">
        {/* Displaying images */}
        {props.Images.map((image, index) => (
          <Image key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <div className="artwork-info-container">
        <p>{props.Description}</p>
        <div className="flex gap-3">
          {props.Tags.map((tag, index) => (
            <Link key={index} to={""}>
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
