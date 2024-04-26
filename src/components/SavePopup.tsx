import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Button } from "primereact/button";

import {
  AddArtworkToCollection,
  CreateCollectionData,
} from "../layout/CollectionDetailScreen/CollectionDetailService";
import { GetCollectionsData } from "../layout/ProfileScreen/CollectionsView/CollectionsService";
import { CollectionProps } from "../layout/CollectionDetailScreen/CollectionDetailScreen";
import { getAuthInfo } from "../util/AuthUtil";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "./SavePopup.scss";

const validationSchema = Yup.object().shape({
  newCollectionName: Yup.string().required("Tên bộ sưu tập không được trống"),
});

interface SavePopupProps {
  closeDialog: () => void;
  artworkId: string;
}

const SavePopup: React.FC<SavePopupProps> = ({ closeDialog, artworkId }) => {
  const [createCollection, setCreateCollection] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<CollectionProps>();
  const [collections, setCollections] = useState<CollectionProps[]>([]);
  const [privacy, setPrivacy] = useState<number>(0);
  let accountId = getAuthInfo()?.id;

  const formik = useFormik({
    initialValues: {
      newCollectionName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleCreateCollection(values.newCollectionName, artworkId, privacy);
      closeDialog();
    },
  });

  const handleAddArtworkToCollection = async (collectionId: string, artworkId: string) => {
    try {
      const response = await AddArtworkToCollection({
        collectionId,
        artworkId,
      });
      if (response) {
        toast.success("Đã lưu tác phẩm vào bộ sưu tập");
      } else {
        toast.warning("Tác phẩm này đã tồn tại trong bộ sưu tập của bạn");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm tác phẩm vào bộ sưu tập");
    }
  };

  const handleCreateCollection = async (
    newCollectionName: string,
    artworkId: string,
    privacy: number
  ) => {
    try {
      const response = await CreateCollectionData({
        collectionName: newCollectionName,
        privacy,
        artworkId,
      });
      if (response) {
        toast.success("Đã tạo bộ sưu tập mới thành công");
        setTimeout(() => {
          toast.success("Đã lưu tác phẩm vào bộ sưu tập");
        }, 400);
      } else {
        toast.error("Đã xảy ra lỗi khi tạo bộ sưu tập mới");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tạo bộ sưu tập mới");
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await GetCollectionsData(accountId);
        if (Array.isArray(response)) {
          setCollections(response);
          setSelectedCollection(response[0]);
          setCreateCollection(response.length === 0);
        } else {
          toast.error("Đã xảy ra lỗi khi lấy dữ liệu bộ sưu tập");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu bộ sưu tập");
      }
    };
    fetchServices();
  }, [accountId]);

  const options = collections.map((collection) => ({
    label: collection.collectionName,
    value: collection,
  }));

  const privacyOptions = [
    { label: "Công khai", value: 0 },
    { label: "Riêng tư", value: 1 },
  ];

  return (
    <div className="save-to-collection-popup-container">
      <h2 className="font-bold">Thêm vào bộ sưu tập</h2>
      <div className="select-collection w-full flex flex-column justify-content-start align-items-start">
        {collections.length !== 0 && (
          <>
            <label className="font-bold" style={{ marginBottom: "10px" }}>
              Bộ sưu tập
            </label>
            <Dropdown
              className="collection-dropdown"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.value)}
              options={options}
            />
            <div className="flex flex-row align-items-center mt-2 mb-4">
              <InputSwitch
                checked={createCollection}
                onChange={(e: InputSwitchChangeEvent) => setCreateCollection(e.value)}
              />
              <label className="ml-2">Tạo bộ sưu tập mới</label>
            </div>
          </>
        )}

        {createCollection && (
          <>
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="create-collection mb-4 w-full flex flex-column justify-content-start align-items-start">
                <label style={{ marginBottom: "10px" }}>Tên bộ sưu tập mới</label>
                <InputText
                  className="w-full"
                  type="text"
                  name="newCollectionName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newCollectionName}
                />
                {formik.touched.newCollectionName && formik.errors.newCollectionName && (
                  <div className="error-message text-red-500">
                    {formik.errors.newCollectionName}
                  </div>
                )}
              </div>
              <div className="create-collection w-full flex flex-column justify-content-start align-items-start">
                <label style={{ marginBottom: "10px" }}>Quyền riêng tư</label>
                <Dropdown
                  className="w-full"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.value)}
                  options={privacyOptions}
                />
              </div>
              <div className="btn mt-4 w-full flex flex-row justify-content-evenly">
                <Button type="submit" label="Tạo bộ sưu tập" className="save-btn p-button" />
                <Button label="Hủy" className="cancel-btn p-button" onClick={closeDialog} />
              </div>
            </form>
          </>
        )}
        {!createCollection && (
          <div className="btn mt-4 w-full flex flex-row justify-content-evenly">
            <Button
              label="Lưu"
              className="save-btn p-button"
              onClick={() => {
                handleAddArtworkToCollection(selectedCollection?.id ?? "", artworkId);
                closeDialog();
              }}
            />

            <Button label="Hủy" className="cancel-btn p-button" onClick={closeDialog} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SavePopup;
