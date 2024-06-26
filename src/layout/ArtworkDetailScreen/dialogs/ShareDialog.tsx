import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { copyURLToClipboard } from "../../../util/ShareUtil";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

type Props = {
  visible: boolean;
  setVisibility: (value: boolean) => void;
  awId: string;
};

export default function ShareDialog({ ...props }: Props) {
  props.visible = props.visible || false;
  const currentURL = `https://artworkia-4f397.web.app/artwork/${props.awId}`;

  const [isCopySuccess, setIsCopySuccess] = useState(false);

  let dialogProperties = {
    visible: props.visible,
    onHide: () => {
      props.setVisibility(false);
    },
    header: "Chia sẻ bài viết",
    headerStyle: { border: "none", padding: "8px" },
    dismissableMask: true,
  };

  // Function to share on Facebook
  function shareOnFacebook() {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}`;
    window.open(facebookShareURL, "_blank", "width=600,height=400");
  }

  let onCopyBtnClick = () => {
    if (copyURLToClipboard(currentURL) !== null) {
      setIsCopySuccess(true);
      setTimeout(() => setIsCopySuccess(false), 3000);
    }
  };

  return (
    <>
      <Dialog {...dialogProperties}>
        <div className="flex flex-column gap-3 w-25rem pb-4">
          <InputText value={currentURL} aria-describedby="help-text" className="w-full" />
          {isCopySuccess && <small id="help-text">Sao chép thành công</small>}
          <div className="flex flex-row gap-3 justify-content-center">
            <Button rounded onClick={onCopyBtnClick}>
              Sao chép đường dẫn
            </Button>
            <Button
              rounded
              onClick={shareOnFacebook}
              icon="pi pi-facebook"
              tooltip="Chia sẻ lên Facebook"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
