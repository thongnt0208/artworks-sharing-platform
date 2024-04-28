import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Chips } from "primereact/chips";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useFormik } from "formik";
import { Slider } from "primereact/slider";
import { Avatar } from "primereact/avatar";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { RadioButton } from "primereact/radiobutton";

export {
  Tooltip,
  Tag,
  ProgressBar,
  Password,
  Calendar,
  Image,
  Divider,
  Toast,
  Card,
  Dialog,
  InputText,
  InputTextarea,
  InputNumber,
  Dropdown,
  Chips,
  FileUpload,
  Button,
  MultiSelect,
  useFormik,
  Slider,
  Avatar,
  ProgressSpinner,
  RadioButton,
};

/**
 * A utility function for handling errors when calling APIs.
 * If the error response status is 401, it navigates to the login page.
 * If the error response status is 521, 500, or 502, it navigates to the internal server error page.
 * Otherwise, it logs the error to the console.
 *
 * @param error - The error object.
 * @param navigate (opt) - The navigation function (from 'react-router-dom').
 * @author ThongNT
 * @version 1.2.0
 */
export async function CatchAPICallingError(error: any, navigate?: any) {
  if (error.response?.status === 401) {
    navigate && navigate("/login");
  } else if ([521, 500, 502].includes(error.response?.status)) {
    navigate("/error-internal-server");
  } else {
    toast.error(
      <>
        <span className="text-cus-h3-bold">Đã xảy ra lỗi.</span>
        <br />
        <span>{error?.response?.data?.errorMessage}</span>
      </>
    );
    console.log(error);
  }
}
