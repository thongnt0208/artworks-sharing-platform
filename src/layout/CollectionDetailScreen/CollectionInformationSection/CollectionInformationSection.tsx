import React from "react";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";

import "./CollectionInformationSection.scss";
const background = require("../../../assets/defaultImage/default-card-blur-image.png");

type CollectionProps = {
  id: string;
  creatorFullName: string;
  collectionName: string;
  privacy: string;
  numberOfArtworks: number;
  accountAvatar?: string;
  onUpdate : (collectionName: string, privacy: boolean) => void;
  onDelete : () => void;
};

const CollectionInformationSection: React.FC<CollectionProps> = (
  props: CollectionProps
) => {
  const [showEdit, setShowEdit] = React.useState(false);
  const [editedCollectionName, setEditedCollectionName] = React.useState(
    props.collectionName
  );
  let privacyProp;
  if (props.privacy === "Private") {
    privacyProp = true;
  } else {
    privacyProp = false;
  }
  const [editedPrivacy, setEditedPrivacy] = React.useState(privacyProp);

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleSaveClick = () => {
    props.onUpdate(editedCollectionName, editedPrivacy);
    setShowEdit(false);
  };

  const handleCancelClick = () => {
    setShowEdit(false);
  };

  const handleDeleteClick = () => {
    props.onDelete();
  };

  const headerElement = (
    <span>
      <h3 className="m-0">Chỉnh sửa thông tin bộ sưu tập</h3>
    </span>
  );

  const footerElement = (
    <div className="footer-container">
      <div className="edit-buttons">
        <Button className="save-btn" rounded onClick={handleSaveClick} label="Lưu" />
        <Button className="cancel-btn" rounded onClick={handleCancelClick} label="Hủy" />
      </div>
      <div className="delete-button">
        <Button className="delete-btn" rounded onClick={handleDeleteClick} label="Xóa bộ sưu tập" />
      </div>
    </div>
   
  );

  return (
    <div className="collection-info-container">
      <div className="collection-info">
        <Image
          src={props.accountAvatar ? props.accountAvatar : background}
          className="account-avatar"
          alt="Logo"
        />
        <p className="collection-title">{props.collectionName}</p>
        <p className="collection-creator">
          Một bộ sưu tập bởi <strong>{props.creatorFullName}</strong>{" "}
        </p>
        <p className="collection-privacy">
          Chia sẻ <strong>{props.privacy}</strong>{" "}
        </p>
        <p className="collection-artwork-num">
          {props.numberOfArtworks} tac pham
        </p>
        <Button
          className="edit-btn"
          onClick={handleEditClick}
          rounded
          label="Chỉnh sửa"
        />

        <Dialog
          visible={showEdit}
          onHide={handleCancelClick}
          className="edit-collection-popup"
          header={headerElement}
          headerClassName="edit-collection-popup-header"
          footer={footerElement}
        >
          <div className="edit-form-container flex flex-column align-items-start justify-content-center">
            <label htmlFor="name" className="name-input-lable">Tên bộ sưu tập:</label>
            <InputText
              id="collectionName"
              className="name-input w-full"
              value={editedCollectionName}
              onChange={(e) => setEditedCollectionName(e.target.value)}
            />

            <label htmlFor="privacy" className="privacy-input-lable">Chia sẻ công khai:</label>
            <InputSwitch
              id="privacy"
              checked={editedPrivacy}
              title=""
              onChange={(e) => setEditedPrivacy(e.target.value)}
            />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CollectionInformationSection;
