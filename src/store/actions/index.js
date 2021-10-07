import * as __ from "./action_types";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  dbRef,
  update,
  getDownloadURL,
  database,
  dbPush,
  onValue,
} from "../firebaseConfig";
import { entities } from "../../data/utils";

export const getData = () => {
  return async (dispatch) => {
    const databaseRef = dbRef(database);
    onValue(databaseRef, (snapshot) => {
      let data = [];
      Object.entries(snapshot.val()).map(([key, value]) => (data[key] = value));
      dispatch({
        type: __.FETCH_DATA,
        payload: data,
      });
    });
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
    let sliderData = {};
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

    // const storage = getStorage();
    // const storageRef = ref(storage, "assets/" + image.name);
    // const uploadTask = uploadBytesResumable(storageRef, image);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     console.log(snapshot);
    //   },
    //   (err) => {
    //     alert(err);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       console.log(url, "url");
    //       updateDatabase(url);
    //     });
    //   }
    // );

    const data = new FormData();
    data.append("upload", image);

    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((url) =>
        updateDatabase(process.env.REACT_APP_IMAGE_ROOT_HOST + url.image)
      )
      .catch((error) => console.log(error));

    const updateDatabase = async (imageUrl) => {
      const dataKey = dbPush(dbRef(database)).key;
      sliderData[dataKey] = {
        c: content,
        i: imageUrl,
        d: { ...destinations },
        pd: new Date().toLocaleString(),
      };

      const databaseRef = dbRef(database);
      await update(databaseRef, sliderData).then(() => {
        console.log("dataPushed");
        dispatch({
          type: __.PUSH_DATA_TO_DB,
          payload: true,
        });
      });
    };
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
