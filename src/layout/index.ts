import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
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
import { MultiSelect } from 'primereact/multiselect';
import { useFormik } from 'formik';
import { Slider } from "primereact/slider";
import { Avatar } from 'primereact/avatar';

export { Tooltip, Tag, ProgressBar, Password, Calendar, Image, Divider, Toast, Card, Dialog, InputText, InputTextarea, InputNumber, Dropdown, Chips, FileUpload, Button, MultiSelect, useFormik, Slider, Avatar };

/**
 * A utility function for handling errors when calling APIs.
 * If the error response status is 401, it navigates to the login page.
 * Otherwise, it logs the error to the console.
 * 
 * @param error - The error object.
 * @param navigate - The navigation function (from 'react-router-dom').
 * @author ThongNT
 * @version 1.0.0
 */
export function CatchAPICallingError(error: any, navigate: any) {
    if (error.response?.status === 401) {
        navigate("/login");
    } else {
        console.log(error);
    }
}
