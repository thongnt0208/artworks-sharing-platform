export const emptyTemplate = () => {
  return (
    <div className="empty-template-container flex align-items-center flex-column">
      <i className="pi pi-image mt-3 p-5"></i>
      <p className="m-0">Kéo thả file vào đây để tải lên.</p>
    </div>
  );
};

export const chooseOptions = {
    icon: "pi pi-fw pi-images",
    className: "custom-choose-btn p-button-rounded w-8",
    label: "Thêm file",
  };
