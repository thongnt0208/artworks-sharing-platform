import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

/*Usage example:
  const [showDialog, setShowDialog] = useState(false);
  let sampleProps = {
    visible: showDialog,
    message: 'Are you sure you want to submit the form?',
    description: 'This action cannot be undone.',
    onConfirm: () => {
      console.log('Form submission confirmed!');
    },
    onHide: () => {setShowDialog(false)},
  };
*/

type Props = {
  visible: boolean;
  message: string;
  description?: string;
  onConfirm: () => void;
  onHide: () => void;
};

export default function DialogCustom({ ...props }: Props) {
  let footer = (
    <div className="">
      <Button onClick={() => props.onConfirm()}>
        <i className="pi pi-check"></i>
        <span className="p-button-label p-ml-2">Confirm</span>
      </Button>
      <Button className="bg-gray-500" onClick={() => props.onHide()}>
        <i className="pi pi-times"></i>
        <span className="p-button-label p-ml-2">Cancel</span>
      </Button>
    </div>
  );
  return (
    <>
      <Dialog
        className="dialog-container border-round"
        showHeader={false}
        footer={footer}
        visible={props.visible}
        style={{ width: "50vw" }}
        onHide={() => props.onHide()}
      >
        <div className="img-container max-w-full">
          <img
            alt="Hình minh hoạ hộp thoại thông báo"
            src="https://placehold.in/600"
            className="max-w-full"
          />
        </div>
        <h1>{props.message}</h1>
        <p>{props.description}</p>
      </Dialog>
    </>
  );
}
