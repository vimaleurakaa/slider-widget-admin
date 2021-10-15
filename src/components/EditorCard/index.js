import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import CheckBox from "../CheckBox";

import "./index.scss";

const SplitEditorCard = ({
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

  const editMode = useSelector((state) => state.editMode);

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
      <div
        {...((value === "" || value === undefined) && {
          className: "crete-slider--disabled",
        })}
      >
        <div className="editor-layout-publish my-10 text-right">
          <button className="btn btn--primary" onClick={publish}>
            {editMode ? "Update and Publish" : "Save and publish"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SplitEditorCard;
