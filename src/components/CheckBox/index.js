import React, { useEffect } from "react";
import { entities } from "../../data/utils";
import { useDispatch } from "react-redux";
import { publishInCheck } from "../../store/actions";
import { useParams } from "react-router";

const EntityCheckBox = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const checkBoxHandler = (e, name) => {
    dispatch(publishInCheck(e));
    if (params?.id) entities.d[name] = e.target.checked;
  };

  useEffect(() => {
    if (params?.id) {
      const editData = JSON.parse(localStorage.getItem("react-slider"));
      entities.d = editData?.d;
    }
  }, [params]);

  return (
    <div className="flex items-center">
      <div className="p-4 px-12 bg-white rounded-xl my-6 shadow-md flex">
        <div className="mr-4 font-bold">Publish In : </div>
        {entities
          .sort((x, y) => x.name.localeCompare(y.name))
          .map(({ id, name, title }, idx, arr) => (
            <label className="flex items-center space-x-2 ml-5" key={id}>
              <input
                type="checkbox"
                name={name}
                className=" h-4 w-4 rounded-md"
                onChange={(e) => checkBoxHandler(e, name)}
                {...(params?.id && { checked: Boolean(arr?.d?.[name]) })}
              />
              <span>{title}</span>
            </label>
          ))}
      </div>
    </div>
  );
};
export default EntityCheckBox;
