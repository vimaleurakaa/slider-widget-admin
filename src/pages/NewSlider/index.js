import React, { useEffect, useState } from "react";
import EditorCard from "../../components/EditorCard";
import { useSelector, useDispatch } from "react-redux";
import { publishData, updateData } from "../../store/actions";
import { Redirect, useParams } from "react-router-dom";

const CreateSlider = () => {
  const checkbox = useSelector((state) => state.checkBoxEvent);
  const published = useSelector((state) => state.published);
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  const [image, setImage] = useState({
    file: "",
    filePreview: "/assets/300.gif",
  });

  const params = useParams();
  useEffect(() => {
    if (params?.id) {
      const editData = JSON.parse(localStorage.getItem("react-slider"));
      setValue(editData?.c);
      setImage({
        file: "",
        filePreview: editData?.i,
      });
    }
  }, [params]);

  const fileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      await reader.readAsDataURL(file);
    }

    reader.addEventListener("load", () => {
      setImage({
        file: e.target.files[0],
        filePreview: reader.result,
      });
    });
  };

  const publishHandler = () => {
    if (params?.id) {
      localStorage.removeItem("post--not-modified");
      const props = { checkbox, value, image: image.file, id: params?.id };
      dispatch(updateData(props));
    } else {
      dispatch(publishData(checkbox, value, image.file));
    }
  };

  if (published) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <EditorCard
        value={value}
        setValue={setValue}
        fileUpload={fileUpload}
        image={image}
        publish={publishHandler}
      />
    </div>
  );
};

export default CreateSlider;
