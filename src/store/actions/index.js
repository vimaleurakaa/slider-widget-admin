import * as __ from "./action_types";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { entities } from "../../data/utils";

//Image upload to Server
const uploadImageAsync = (image, callback) => {
  const data = new FormData();
  data.append("upload", image);

  fetch(process.env.REACT_APP_SERVER_HOST + "upload", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then(({ image }) => callback(process.env.REACT_APP_SERVER_HOST + image))
    .catch((error) => console.log(error));
};

//JSON Data upload to Server
const uploadDataAsync = (data, callback) => {
  const url = process.env.REACT_APP_SERVER_HOST + "write";
  axios
    .post(url, data)
    .then(({ data }) => callback(data))
    .catch((err) => {
      console.log(err, data);
    });
};

export const getData = () => {
  return async (dispatch) => {
    const url = process.env.REACT_APP_SERVER_HOST + "api/v1/data";
    axios.get(url).then(({ data }) => {
      dispatch({
        type: __.FETCH_DATA,
        payload: data,
      });
    });
  };
};

export const duplicateData = (prevData, newData) => {
  return async (dispatch) => {
    const updateDatabase = async (payloadData) => {
      const { data } = payloadData;
      await dispatch({
        type: __.DUPLICATE_DATA,
        payload: {
          items: JSON.parse(data),
        },
      });
    };
    const id = uuid();
    newData.id = id;
    localStorage.setItem("post--not-modified", id);
    const data = [newData, ...prevData];
    uploadDataAsync(data, updateDatabase);
  };
};

export const publishInCheck = (data) => {
  return async (dispatch) => {
    await dispatch({
      type: __.PUBLISH_IN_CHECK,
      payload: data,
    });
  };
};

export const publishData = (publishSites, content, image) => {
  return async (dispatch) => {
    let destinations = {};
    entities.map((it) => {
      return (destinations = {
        ...destinations,
        [it.name]: 0,
      });
    });

    Object.entries(publishSites).map(([key, value]) => {
      if (Boolean(value)) {
        destinations = {
          ...destinations,
          [key]: 1,
        };
      }
      return key;
    });

    const setData = async (imageUrl) => {
      const sliderData = {
        id: uuid(),
        c: content,
        i: imageUrl,
        d: { ...destinations },
        pd: new Date().toLocaleString(),
      };

      const url = process.env.REACT_APP_SERVER_HOST + "api/v1/data";
      axios.get(url).then(({ data }) => {
        const concatData = [...data, sliderData];
        uploadDataAsync(concatData, updateDatabase);
      });
    };

    uploadImageAsync(image, setData);

    const updateDatabase = async (payloadData) => {
      const { status, data } = payloadData;
      await dispatch({
        type: __.DATA_PUBLISHED,
        payload: {
          status,
          items: JSON.parse(data),
        },
      });
    };
  };
};

export const updateData = ({ ...props }) => {
  return async (dispatch) => {
    const { id, checkbox, image, value } = props;
    let itemIndex = "";

    const url = process.env.REACT_APP_SERVER_HOST + "api/v1/data";
    axios.get(url).then(({ data }) => {
      reWriteData(data);
    });

    const reWriteData = (data) => {
      let destinations = {};
      Object.entries(checkbox).map(([key, value]) => {
        if (Boolean(value)) {
          destinations = {
            ...destinations,
            [key]: 1,
          };
        } else {
          destinations = {
            ...destinations,
            [key]: 0,
          };
        }
        return key;
      });

      const updatedData = [];
      data?.filter((it, idx) => {
        if (it.id === id) {
          itemIndex = idx;
          const updatedContent = {
            c: value,
            d: destinations,
            i: it.i,
            id: id,
            pd: new Date().toLocaleString(),
          };
          return updatedData.push(updatedContent);
        } else {
          return updatedData.push(it);
        }
      });

      const sendDataToServer = (image) => {
        updatedData[itemIndex].i = image;
        uploadDataAsync(updatedData, updateDatabase);
      };

      if (image !== "") {
        uploadImageAsync(image, sendDataToServer);
      } else {
        sendDataToServer(updatedData[itemIndex].i);
      }
    };

    const updateDatabase = async (payloadData) => {
      const { status, data } = payloadData;
      await dispatch({
        type: __.UPDATE_DATABASE,
        payload: {
          status,
          menu: "all",
          items: JSON.parse(data),
        },
      });
    };
  };
};

export const deleteData = (data) => {
  return async (dispatch) => {
    const updateDatabase = async (payloadData) => {
      const { data } = payloadData;
      await dispatch({
        type: __.DELETE_DATA,
        payload: JSON.parse(data),
      });
    };
    uploadDataAsync(data, updateDatabase);
  };
};

export const publishState = (state) => {
  return async (dispatch) => {
    await dispatch({
      type: __.PUSH_DATA_TO_DB,
      payload: state,
    });
  };
};

export const filterData = (state) => {
  return async (dispatch) => {
    dispatch({
      type: __.FILTER_DATA,
      payload: state,
    });
  };
};

export const editorMode = (state) => {
  return async (dispatch) => {
    dispatch({
      type: __.EDIT_MODE,
      payload: {
        editMode: state,
      },
    });
  };
};

export const menuState = (data) => {
  return async (dispatch) => {
    dispatch({
      type: __.MENU_STATE,
      payload: data,
    });
  };
};
