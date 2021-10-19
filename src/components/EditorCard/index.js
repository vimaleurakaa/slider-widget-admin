import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import CheckBox from "../CheckBox";
import { FiArrowLeftCircle } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { deleteData } from "../../store/actions";

import "./index.scss";

const EditorCard = ({
  value,
  setValue,
  checkBoxHandler,
  fileUpload,
  image,
  publish,
}) => {
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];
  const modules = {
    toolbar: [
      [{ header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const filterInputHTML = (value) => {
    const reg = /h[13456]>/gm;
    const modHTML = value.replaceAll(reg, "h2>");
    setValue(modHTML);
  };

  const items = useSelector((state) => state.items);
  const editMode = useSelector((state) => state.editMode);
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteHandler = () => {
    const id = sessionStorage.getItem("edit-id");
    sessionStorage.setItem("deleteKey", id);
    dispatch(deleteData(items));
    history.push("/");
  };

  return (
    <>
      <div className="flex bg-white p-6">
        <div className="editor-left-pane flex-initial">
          <div className="editor-image-container relative">
            <div className="editor-image">
              <img src={image.filePreview} alt={image.file.name} />
            </div>
            <input type="file" className="my-2" onChange={fileUpload} />
          </div>
        </div>

        <div className="editor-right-pane mx-6 flex-1">
          <div className="editor-heading">
            <div className="editor-styles">
              <ReactQuill
                formats={formats}
                modules={modules}
                theme="snow"
                value={value}
                onChange={(ele) => filterInputHTML(ele)}
              />
            </div>
          </div>
        </div>
      </div>
      <CheckBox checkBoxHandler={checkBoxHandler} />
      <div className="flex align-middle">
        <div className="editor-layout-publish editor-secondary-actions my-10">
          <button className="btn btn--danger" onClick={() => history.goBack()}>
            <FiArrowLeftCircle /> <span>Go Back</span>
          </button>
          {editMode && (
            <button className="btn btn--danger" onClick={deleteHandler}>
              <RiDeleteBin5Line /> <span>Delete</span>
            </button>
          )}
        </div>
        <div
          {...((value === "" || value === undefined) && {
            className: "crete-slider--disabled",
          })}
          {...(image.filePreview ===
            process.env.REACT_APP_PLACEHOLDER_IMAGE && {
            className: "crete-slider--disabled",
          })}
        >
          <div className="editor-layout-publish my-10">
            <button className="btn btn--primary" onClick={publish}>
              {editMode ? "Update and Publish" : "Save and publish"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorCard;
